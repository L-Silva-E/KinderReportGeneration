function generateAllDocuments () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '📚 Comenzando Ejecución',
    'Generar los documentos puede tardar varios minutos'
  );

  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    console.log('Getting row: ' + currentRow);
    const data = getDataSpreadsheet(sheetData, currentRow);

    const currentLevel = getLevel(dataConfigSheet.IS_KINDER);
    const currentType = getType(data.enrollment.type);

    const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();

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

  showMessage(
    '✅ Ejecución Finalizada',
    'Los documentos se generaron con datos de ' + (sheetData.getLastRow() - 1) + ' párvulos en total.'
  );
}


function generatePendingDocuments () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '📚 Comenzando Ejecución',
    'Generar los documentos puede tardar varios minutos'
  );

  let dataGenerated = [];

  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    if (sheetData.getRange(currentRow, 1).getValue() === '📄') continue;

    dataGenerated.push(currentRow);
    console.log('Getting row: ' + currentRow);
    const data = getDataSpreadsheet(sheetData, currentRow, dataConfigSheet.IS_KINDER);

    const currentLevel = getLevel(dataConfigSheet.IS_KINDER);
    const currentType = getType(data.enrollment.type);

    const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();

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

  let messageBody = 'Los documentos se generaron con datos de ' + (dataGenerated.length) + ' párvulos en total.\nSe utilizaron datos de las filas:';
  if (dataGenerated.length === 0) messageBody = 'No se generó ningún documento';
  dataGenerated.forEach((row) => {
    messageBody += '\n • ' + row;
  });


  showMessage('✅ Ejecución Finalizada', messageBody);
}


function generateSpecificDocument () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  //~ Prompt para obtener el número de fila ~//
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

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es válido\nDebe estar entre 2 y ' + sheetData.getLastRow() + '\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '📚 Comenzando Ejecución',
    'Generar el documento puede tardar varios minutos'
  );

  console.log('Getting row: ' + currentRow);
  const data = getDataSpreadsheet(sheetData, currentRow, dataConfigSheet.IS_KINDER);

  const currentLevel = getLevel(dataConfigSheet.IS_KINDER);
  const currentType = getType(data.enrollment.type);

  const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();

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

  showMessage(
    '✅ Ejecución Finalizada',
    'Se generó el documento con datos de:\n- Nombre: ' + currentFullName + '\n- Rut: ' + data.section_1.rut + '\n- Nivel: ' + currentLevel + '\n- Jornada: ' + currentType + '\n\nSe ha marcado la fila ' + currentRow + ' como generada.'
  );
}
