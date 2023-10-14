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
