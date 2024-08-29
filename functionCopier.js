function copyRows() {
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la Hoja de Configuración\nProceso de limpieza detenido')
    return;
  }

  //~ Se crea la hoja de respaldo en caso de no existir ~//
  createBackupSheet(dataConfigSheet);


  //~ Se copian los valores de la hoja de respuestas a la hoja de respaldo ~//
  const sheetResponses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_RESPONSES);
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  let sheetSource = sheetResponses.getRange(1, 1, sheetResponses.getLastRow(), sheetResponses.getLastColumn());

  let rowRange = sheetBackup.getLastRow() || sheetResponses.getLastRow();
  let columnRange = sheetBackup.getLastColumn() || sheetResponses.getLastColumn();
  let sheetDestination = sheetBackup.getRange(1, 2, rowRange, columnRange);
  sheetDestination.clearContent();

  sheetDestination = sheetBackup.getRange(1, 2, sheetResponses.getLastRow(), sheetResponses.getLastColumn());

  sheetSource.copyTo(sheetDestination);

  sheetDestination = sheetBackup.getRange(1, 2, sheetBackup.getMaxRows(), sheetBackup.getMaxColumns());
  sheetDestination.setNumberFormat('@');

  const updatedSheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  updatedSheetBackup.getRange(1, 1).setValue('Estado');
  updatedSheetBackup.getRange(2, 1, updatedSheetBackup.getLastRow() - 1, 1)
    .setValue('📋')
    .setHorizontalAlignment('center');
  updatedSheetBackup.setRowHeightsForced(2, updatedSheetBackup.getLastRow(), 21);

  showToast('📋 Copiado Finalizado', 'Se copiaron los datos de la Hoja de Respuestas a la Hoja de Respaldo');
}

function copyPendingRows() {
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la Hoja de Configuración\nProceso de limpieza detenido')
    return;
  }


  const sheetResponses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_RESPONSES);
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);

  let dataCopied = [];
  for (let currentRow = sheetBackup.getLastRow(); currentRow <= sheetResponses.getLastRow(); currentRow++) {
    const rowSource = sheetResponses.getRange(currentRow, 1, 1, sheetResponses.getLastColumn());
    let rowDestination = sheetBackup.getRange(currentRow, 2, 1, sheetResponses.getLastColumn());

    rowSource.copyTo(rowDestination);
    rowDestination.setNumberFormat('@');

    dataCopied.push(currentRow);
  }

  const updatedSheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  for (let currentRow = dataCopied[0]; currentRow <= updatedSheetBackup.getLastRow(); currentRow++) {
    updatedSheetBackup.getRange(2, 1, updatedSheetBackup.getLastRow() - 1, 1)
      .setValue('📋')
      .setHorizontalAlignment('center');
  }
  updatedSheetBackup.setRowHeightsForced(currentRow, updatedSheetBackup.getLastRow(), 21);

  let messageBody = 'No se copió ningún dato';
  if (dataCopied.length > 0) {
    messageBody = dataCopied.length === 1
      ? `Se copió el dato de 1 párvulo.\n Se limpió la fila ${dataCopied}.`
      : `Se copiaron los datos de ${dataCopied.length} párvulos en total.\n` +
        `Las filas fueron:\n${dataCopied.map((row) => ` • ${row}`).join('\n')}`;
  }

  showToast('📋 Copiado finalizado', messageBody);
}

function copySpecificRow() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    '📋 Copiar Fila Específica',
    'Ingrese el número de fila del párvulo que desea copiar',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    showMessage('❌ Copiado de Datos', 'Se ha cancelado el copiado de datos');
    return;
  }

  const currentRow = parseInt(result.getResponseText());
  if (isNaN(currentRow)) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es un número\nSe ha detenido el copiado de datos');
    return;
  }

  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la Hoja de Configuración\nProceso de limpieza detenido')
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_RESPONSES);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respuestas', 'Falta la Hoja de Respuestas\nSe ha detenido el copiado de datos');
    return;
  }

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage('❌ Número de Fila', `El valor ingresado no es válido\nDebe estar entre 2 y ${sheetData.getLastRow()}\nSe ha detenido el copiado de datos`);
    return;
  }

  showToast(
    '📋 Copiado de Datos',
    `Se está copiando la fila ${currentRow} de la Hoja de Respuestas a la Hoja de Respaldo`
  );

  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  const rowSource = sheetData.getRange(currentRow, 1, 1, sheetData.getLastColumn());
  const rowDestination = sheetBackup.getRange(currentRow, 2, 1, sheetData.getLastColumn());

  rowSource.copyTo(rowDestination);
  rowDestination.setNumberFormat('@');

  sheetBackup.getRange(2, 1, currentRow - 1, 1)
    .setValue('📋')
    .setHorizontalAlignment('center');
  updatedSheetBackup.setRowHeightsForced(currentRow, updatedSheetBackup.getLastRow(), 21);

  showToast(
    '✅ Copiado Finalizado',
    `Se copió la fila ${currentRow} de la Hoja de Respuestas a la Hoja de Respaldo`
  );
}

function createBackupSheet(dataConfigSheet) {
  let sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);

  if (sheetBackup === null) {
    let messageHeader = '⚠️ Creando respaldo';
    let messageBody = 'Creando el respaldo con los datos de la "Hoja de Respuestas"';
    sheetBackup = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetBackup.setName(dataConfigSheet.SHEET_BACKUP);

    showToast(messageHeader, messageBody);
  }
}
