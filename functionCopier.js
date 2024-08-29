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
  let sheetDestination = sheetBackup.getRange(1, 1, rowRange, columnRange);
  sheetDestination.clearContent();

  sheetDestination = sheetBackup.getRange(1, 1, sheetResponses.getLastRow(), sheetResponses.getLastColumn());

  sheetSource.copyTo(sheetDestination);

  sheetDestination = sheetBackup.getRange(1, 1, sheetBackup.getMaxRows(), sheetBackup.getMaxColumns());
  sheetDestination.setNumberFormat('@');
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
