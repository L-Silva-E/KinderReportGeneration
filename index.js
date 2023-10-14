function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙️ Administración')
    .addItem('🧼 Limpiar Valores', 'cleanValues')
    .addItem('📄 Generar Documentos', 'generateAllDocuments')
    .addItem('📋 Generar 1 Documento', 'generateOneDocument')
    .addToUi();
}


function generateAllDocuments () {
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.ID_FOLDER === '' || dataConfigSheet.ID_IMAGE === '' || dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la "Hoja de Configuración"\nSe tienen que rellenar todos los campos\nSe ha detenido la generación de documentos',)
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '⚠️ Comenzando Ejecución',
    'Generar los documentos puede tardar varios minutos'
  );

  const arrayLevel = [
    { key: 'PREKINDER (nivel de transición I)', value: 'Pre-Kinder' },
    { key: 'KINDER (nivel de transición II)',   value: 'Kinder' }
  ];
  const arrayType = [
    { key: 'JORNADA DE MAÑANA', value: 'A' },
    { key: 'JORNADA DE TARDE',  value: 'B' }
  ];

  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    console.log('Getting row: ' + currentRow);
    const data = getDataRow(sheetData, currentRow);

    const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
    const currentLevel = (arrayLevel.find((level) => level.key === data.enrollment.level)).value;
    const currentType = (arrayType.find((type) => type.key === data.enrollment.type)).value;

    console.log('Generating document: ' + data.section_1.rut);
    showToast(
      '🏗️ Generando Documento',
      currentLevel + ' - ' + currentType + ' / ' + currentFullName
    );
    generateDocument(dataConfigSheet, data, currentLevel, currentType);
    showToast(
      '✅ Documento Generado',
      currentLevel + ' - ' + currentType + ' / ' + currentFullName
    );

    sheetData.getRange(currentRow, 1).setValue('📄');
  }

  console.log('✅ Done');
  showMessage(
    '✅ Ejecución Finalizada',
    'Los documentos se generaron con datos de ' + (sheetData.getLastRow() - 1) + ' párvulos en total.'
  );
}


function generateOneDocument () {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    '📋 Generar 1 Documento',
    'Ingrese el número de fila del párvulo que desea generar',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    showMessage('❌ Generación de Documento', 'Se ha cancelado la generación de documentos');
    return;
  }

  const currentRow = parseInt(result.getResponseText());
  if (isNaN(currentRow)) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es un número\nSe ha detenido la generación de documentos');
    return;
  }

  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.ID_FOLDER === '' || dataConfigSheet.ID_IMAGE === '' || dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la "Hoja de Configuración"\nSe tienen que rellenar todos los campos\nSe ha detenido la generación de documentos',)
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es válido\nDebe estar entre 2 y ' + sheetData.getLastRow() + '\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '⚠️ Comenzando Ejecución',
    'Generar el documento puede tardar varios minutos'
  );

  const arrayLevel = [
    { key: 'PREKINDER (nivel de transición I)', value: 'Pre-Kinder' },
    { key: 'KINDER (nivel de transición II)',   value: 'Kinder' }
  ];
  const arrayType = [
    { key: 'JORNADA DE MAÑANA', value: 'A' },
    { key: 'JORNADA DE TARDE',  value: 'B' }
  ];

  console.log('Getting row: ' + currentRow);
  const data = getDataRow(sheetData, currentRow);

  const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
  const currentLevel = (arrayLevel.find((level) => level.key === data.enrollment.level)).value;
  const currentType = (arrayType.find((type) => type.key === data.enrollment.type)).value;

  console.log('Generating document: ' + data.section_1.rut);
  showToast(
    '🏗️ Generando Documento',
    currentLevel + ' - ' + currentType + ' / ' + currentFullName
  );
  generateDocument(dataConfigSheet, data, currentLevel, currentType);
  showToast(
    '✅ Documento Generado',
    currentLevel + ' - ' + currentType + ' / ' + currentFullName
  );

  sheetData.getRange(currentRow, 1).setValue('📄');

  console.log('✅ Done');
  showMessage(
    '✅ Ejecución Finalizada',
    'Se generó el documento con datos de:\n- Nombre: ' + currentFullName + '\n- Rut: ' + data.section_1.rut + '\n- Nivel: ' + currentLevel + '\n- Jornada: ' + currentType + '\n\nSe ha marcado la fila ' + currentRow + ' como generada.'
  );
}


function generateDocument(dataConfigSheet, data, level, type) {
  //~ Generación del Texto ~//
  const titleHeader = 'Ficha de Antecedentes ' + ((new Date()).getFullYear() + 1);
  const currentGrade = level + ' - ' + type;
  const childFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
  const textComplicationsBirth = formatComplicationsBirth(data.section_2.complicationsBirth, data.section_2.whatComplications);


  //~ Destino y creación de Archivo base ~//
  const destination = DriveApp.getFolderById(dataConfigSheet.ID_FOLDER);

  const fileName = (new Date()).getFullYear() + ' / ' + level + ' - ' + type + ' / ' + childFullName;
  const doc = DocumentApp.create(fileName);
  const idDoc = doc.getId();
  const file = DriveApp.getFileById(idDoc);
  file.moveTo(destination);

  const fileBody = doc.getBody();


  //~ Configuración del Documento ~//
  fileBody.setPageHeight(getPoints(styleValues().PageFormat.Height));
  fileBody.setPageWidth(getPoints(styleValues().PageFormat.Width));

  fileBody.setMarginTop(getPoints(styleValues().PageFormat.Margin.Top));
  fileBody.setMarginBottom(getPoints(styleValues().PageFormat.Margin.Bottom));
  fileBody.setMarginLeft(getPoints(styleValues().PageFormat.Margin.Left));
  fileBody.setMarginRight(getPoints(styleValues().PageFormat.Margin.Right));


  const dataDocument = documentLayout(data, titleHeader, currentGrade, childFullName, textComplicationsBirth);

  dataDocument.forEach((section) => {
    let paragraphObjetcDataChild =
      fileBody.appendParagraph('')
      .setSpacingAfter(getPoints(styleValues().SpaceParagraph[section.configuration.type]))
      .setLineSpacing(styleValues().SpaceLine);

    paragraphObjetcDataChild.setAttributes(getStyle(section.configuration.type));

    section.values.forEach((item) => {
      if (item.key !== null) {
        paragraphObjetcDataChild
          .appendText(item.key.text + ' ')
          .setAttributes(getStyle(item.key.style));
      }

      if (item.value !== null) {
        let textValue = item.value.text ? item.value.text : 'S/Datos';

        paragraphObjetcDataChild
          .appendText(textValue)
          .setAttributes(getStyle(item.value.style));
      }

      item.breakLine
        ? paragraphObjetcDataChild.appendText('\n')
        : paragraphObjetcDataChild.appendText(' ').setAttributes(getStyle('Paragraph'));

    });
  });

  let paragraphs = fileBody.getParagraphs();
  paragraphs[0].removeFromParent();

  const blob = DriveApp.getFileById(dataConfigSheet.ID_IMAGE).getBlob();
  const image = paragraphs[1].addPositionedImage(blob);
  image.setHeight(116).setWidth(96).setLeftOffset(480).setLayout(DocumentApp.PositionedLayout.ABOVE_TEXT);

  doc.saveAndClose();
}


function cleanValues () {
  //~ Creación Hoja de Configuración ~//
  createConfigSheet();


  //~ Obtención de Datos importantes ~//
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la Hoja de Configuración\nProceso de limpieza detenido',)
    return;
  }


  //~ Creación o actualización del Respaldo ~//
  createOrUpdateBackup(dataConfigSheet);


  //~ Limpieza de valores ~//
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetBackup === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nProceso de limpieza detenido');
    return;
  }

  sheetBackup.getRange(1, 1).setValue('Limpieza');
  let countCleaned = 0;

  for (let currentRow = 2; currentRow <= sheetBackup.getLastRow(); currentRow++) {
    const rut = sheetBackup.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);


    let columns = [];

    //~ Limpieza y formateo de columans ~//
    //* Capitalización de Nombres *//
    columns = [2, 3, 4, 30, 45, 60];
    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      currentValue = currentValue.toLowerCase().replace(/(?:^|\s)\S/g, function(word) {
        return word.toUpperCase();
      });

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Fechas *//
    columns = [5];
    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      let arrayDate = currentValue.split('/');
      if (arrayDate[0].length === 1) { arrayDate[0] = '0' + arrayDate[0]; }
      if (arrayDate[1].length === 1) { arrayDate[1] = '0' + arrayDate[1]; }
      currentValue = arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2];

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Renta *//
    columns = [37, 52, 68];

    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      if (currentValue.length === 3) { currentValue += '.000'; }

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });

    sheetBackup.getRange(currentRow, 1).setValue('🧼');
    countCleaned++;
  }

  console.log('✅ Done');
  showMessage('🧼 Limpieza finalizada', 'Se limpiaron los datos de ' + countCleaned + ' párvulos en total.');
}


function createOrUpdateBackup (dataConfigSheet) {
  const sheetResponses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_RESPONSES);
  let sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  let messageHeader = '🔃 Actualizando el respaldo';
  let messageBody = 'Copiando los datos de la "Hoja de Respuestas" a la "Hoja de Respaldo"';

  //~ En caso de no existir, se crea la pestaña de respaldo ~//
  if (sheetBackup === null) {
    messageHeader = '⚠️ Creando respaldo';
    messageBody = 'Creando el respaldo con los datos de la "Hoja de Respuestas"';
    sheetBackup = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetBackup.setName(dataConfigSheet.SHEET_BACKUP);
  }

  let sheetSource = sheetResponses.getRange(1, 1, sheetResponses.getLastRow(), sheetResponses.getLastColumn());

  let rowRange = sheetBackup.getLastRow() || sheetResponses.getLastRow();
  let columnRange = sheetBackup.getLastColumn() || sheetResponses.getLastColumn();
  let sheetDestination = sheetBackup.getRange(1, 1, rowRange, columnRange);
  sheetDestination.clearContent();

  sheetDestination = sheetBackup.getRange(1, 1, sheetResponses.getLastRow(), sheetResponses.getLastColumn());

  sheetSource.copyTo(sheetDestination);

  sheetDestination = sheetBackup.getRange(1, 1, sheetBackup.getMaxRows(), sheetBackup.getMaxColumns());
  sheetDestination.setNumberFormat('@');

  showToast(messageHeader, messageBody);
}


function createConfigSheet () {
  const configObject = getConfigKeys();

  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configObject.SHEET_CONFIG);
  let messageHeader = '⚠️ Hoja de Configuración';
  let messageBody = 'Ya existe la "Hoja de Configuración"\nNo se aplicarán cambios';

  if (sheetConfig === null) {
    sheetConfig = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetConfig.setName(configObject.SHEET_CONFIG);

    let row = 1;
    for (const key in configObject) {
      sheetConfig.getRange(row, 1).setValue(key);
      sheetConfig.getRange(row, 2).setValue(configObject[key]);
      row++;
    }

    sheetConfig.setColumnWidths(1, 2, 200);

    messageHeader = '⚠️ Hoja de Configuración';
    messageBody = 'Se creó la "Hoja de Configuración"\nFue creada con los valores por defecto';
  }

  showToast(messageHeader, messageBody);
}


function getDataConfigSheet () {
  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getConfigKeys().SHEET_CONFIG);
  let dataConfigSheet = {};

  for (let currentRow = 1; currentRow <= sheetConfig.getLastRow(); currentRow++) {
    dataConfigSheet[sheetConfig.getRange(currentRow, 1).getValue()] = sheetConfig.getRange(currentRow, 2).getValue();
  }

  return dataConfigSheet;
}
