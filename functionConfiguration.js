function createConfigSheet () {
  const configObject = getConfigKeys();
  const configAuxObject = getConfigKeysAux();

  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configObject.SHEET_CONFIG);
  let messageHeader = '⚠️ Hoja de Configuración';
  let messageBody = 'Ya existe la "Hoja de Configuración"\nNo se aplicarán cambios';

  let row = 1;

  if (sheetConfig === null) {
    sheetConfig = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetConfig.setName(configObject.SHEET_CONFIG);

    for (const key in configObject) {
      sheetConfig.getRange(row, 1).setValue(key);
      sheetConfig.getRange(row, 2).setValue(configObject[key]);
      row++;
    }

    sheetConfig.setColumnWidths(1, 2, 200);

    messageHeader = '⚠️ Hoja de Configuración';
    messageBody = 'Se creó la "Hoja de Configuración"\nFue creada con los valores por defecto';

  } else {
    for (const key in configObject) {
      if (sheetConfig.getRange(row, 1).getValue() !== key) {
        sheetConfig.getRange(row, 1).setValue(key);
        sheetConfig.getRange(row, 2).setValue(configObject[key]);

        if (!configObject[key]) {
          sheetConfig.getRange(row, 3).setValue(configAuxObject[key]);
        }
      }
      row++;
    }
  }

  sheetConfig.setColumnWidth(1, 150);
  sheetConfig.setColumnWidth(2, 300);
  sheetConfig.setColumnWidth(3, 500);

  showToast(messageHeader, messageBody);
}
