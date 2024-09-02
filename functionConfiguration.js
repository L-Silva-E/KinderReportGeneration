function createConfigSheet () {
  const configObject = getConfigSheet();

  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configObject.SHEET_CONFIG.value);
  const messageHeader = '⚠️ Hoja de Configuración';
  let messageBody = 'Ya existe la "Hoja de Configuración" con los valores por defecto\nNo se realizaron cambios';
  let flagChanged = false;

  let row = 1;

  if (sheetConfig === null) {
    sheetConfig = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetConfig.setName(configObject.SHEET_CONFIG.value);

    for (const key in configObject) {
      sheetConfig.getRange(row, 1).setValue(key);
      sheetConfig.getRange(row, 2).setValue(configObject[key].value);
      sheetConfig.getRange(row, 3).setValue(configObject[key].description);
      row++;
    }

    messageBody = 'Se creó la "Hoja de Configuración"\nFue creada con los valores por defecto';

  } else {
    for (const key in configObject) {
      if (sheetConfig.getRange(row, 1).getValue() !== key) {
        sheetConfig.getRange(row, 1).setValue(key);
        flagChanged = true;
      }

      if (configObject[key].value !== '' && sheetConfig.getRange(row, 2).getValue() !== configObject[key].value) {
        sheetConfig.getRange(row, 2).setValue(configObject[key].value);
        flagChanged = true;
      }

      if (configObject[key].description !== '' && sheetConfig.getRange(row, 3).getValue() !== configObject[key].description) {
        sheetConfig.getRange(row, 3).setValue(configObject[key].description);
        flagChanged = true;
      }

      row++;
    }

    if (flagChanged) {
      messageBody = 'Se actualizaron los valores de la "Hoja de Configuración" con los valores por defecto';
    }
  }

  sheetConfig.setColumnWidth(1, 150);
  sheetConfig.setColumnWidth(2, 300);
  sheetConfig.setColumnWidth(3, 750);

  showToast(messageHeader, messageBody);
}
