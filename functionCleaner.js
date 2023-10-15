function cleanValues () {
  //~ Creación Hoja de Configuración ~//
  createConfigSheet();


  //~ Obtención de Datos importantes ~//
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
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

  sheetBackup.getRange(1, 1).setValue('Estado');
  let countCleaned = 0;
  const indexClean = getIndexClean(dataConfigSheet.IS_KINDER);

  for (let currentRow = 2; currentRow <= sheetBackup.getLastRow(); currentRow++) {
    const rut = sheetBackup.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);


    //~ Limpieza y formateo de columans ~//
    //* Capitalización de Nombres *//
    indexClean.capitalize.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      currentValue = currentValue.toLowerCase().replace(/(?:^|\s)\S/g, function(word) {
        return word.toUpperCase();
      });

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Fechas *//
    indexClean.date.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      let arrayDate = currentValue.split('/');
      if (arrayDate[0].length === 1) { arrayDate[0] = '0' + arrayDate[0]; }
      if (arrayDate[1].length === 1) { arrayDate[1] = '0' + arrayDate[1]; }
      currentValue = arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2];

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Renta *//
    indexClean.rent.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) return;

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


function cleanPendingRows () {
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.ID_FOLDER === '' || dataConfigSheet.ID_IMAGE === '' || dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la "Hoja de Configuración"\nSe tienen que rellenar todos los campos\nSe ha detenido la generación de documentos',)
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos');
    return;
  }

  showToast(
    '🧼 Limpiando Valores',
    'Limpiar las filas restantes puede tardar varios minutos'
  );

  const indexClean = getIndexClean(dataConfigSheet.IS_KINDER);
  let dataCleaned = [];

  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    if (sheetData.getRange(currentRow, 1).getValue() === '🧼' || sheetData.getRange(currentRow, 1).getValue() === '📄') continue;

    dataCleaned.push(currentRow);
    const rut = sheetData.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);


    //~ Limpieza y formateo de columans ~//
    //* Capitalización de Nombres *//
    indexClean.capitalize.forEach((column) => {
      let currentValue = sheetData.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      currentValue = currentValue.toLowerCase().replace(/(?:^|\s)\S/g, function(word) {
        return word.toUpperCase();
      });

      sheetData.getRange(currentRow, column).setValue(currentValue);
    });


    //* Fechas *//
    indexClean.date.forEach((column) => {
      let currentValue = sheetData.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      let arrayDate = currentValue.split('/');
      if (arrayDate[0].length === 1) { arrayDate[0] = '0' + arrayDate[0]; }
      if (arrayDate[1].length === 1) { arrayDate[1] = '0' + arrayDate[1]; }
      currentValue = arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2];

      sheetData.getRange(currentRow, column).setValue(currentValue);
    });


    //* Renta *//
    indexClean.rent.forEach((column) => {
      let currentValue = sheetData.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      if (currentValue.length === 3) { currentValue += '.000'; }

      sheetData.getRange(currentRow, column).setValue(currentValue);
    });

    sheetData.getRange(currentRow, 1).setValue('🧼');
  }

  let messageBody = 'Se limpiaron los datos de ' + (dataCleaned.length) + ' párvulos en total.\nSe limpiaron los datos de las filas:';
  if (dataCleaned.length === 0) messageBody = 'No se encontraron datos para limpiar.';
  dataCleaned.forEach((row) => {
    messageBody += '\n • ' + row;
  });

  console.log('✅ Done');
  showMessage('✅ Ejecución Finalizada', messageBody);
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
