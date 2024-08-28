function cleanValues () {
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

  showToast(
    '🧼 Limpiando Valores',
    'Limpiar todas las filas puede tardar varios minutos'
  );

  sheetBackup.getRange(1, 1).setValue('Estado');
  let countCleaned = 0;
  const indexClean = getIndexClean();

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

  const indexClean = getIndexClean();
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
  showMessage('🧼 Limpieza finalizada', messageBody);
}


function cleanRow () {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    '📋 Limpieza de 1 fila',
    'Ingrese el número de fila del párvulo que desea limpiar',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    showMessage('❌ Limpieza de Fila', 'Se ha cancelado la limpieza de la fila');
    return;
  }

  const currentRow = parseInt(result.getResponseText());
  if (isNaN(currentRow)) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es un número\nSe ha detenido la limpieza de la fila');
    return;
  }

  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.ID_FOLDER === '' || dataConfigSheet.ID_IMAGE === '' || dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la "Hoja de Configuración"\nSe tienen que rellenar todos los campos\nSe ha detenido la limpieza de la fila',)
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la limpieza de la fila');
    return;
  }

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage('❌ Número de Fila', 'El valor ingresado no es válido\nDebe estar entre 2 y ' + sheetData.getLastRow() + '\nSe ha detenido la limpieza de la fila');
    return;
  }

  showToast(
    '⚠️ Comenzando Ejecución',
    'Se está limpiando la fila número ' + currentRow
  );

  const indexClean = getIndexClean();

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


  //* Renta *//
  indexClean.rent.forEach((column) => {
    let currentValue = sheetData.getRange(currentRow, column).getValue();
    if (!currentValue) return;

    currentValue = currentValue.trim();
    if (currentValue.length === 3) { currentValue += '.000'; }

    sheetData.getRange(currentRow, column).setValue(currentValue);
  });

  sheetData.getRange(currentRow, 1).setValue('🧼');

  console.log('✅ Done');
  showMessage('🧼 Limpieza finalizada', 'Se limpió la fila número ' + currentRow);
}


function addAndCleanNewRows () {
  //~ Obtención de Datos importantes ~//
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '' || dataConfigSheet.IS_KINDER === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la Hoja de Configuración\nProceso de limpieza detenido')
    return;
  }


  const sheetResponses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_RESPONSES);
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);

  const indexClean = getIndexClean();
  let dataCleaned = [];

  for (let currentRow = sheetBackup.getLastRow() + 1; currentRow <= sheetResponses.getLastRow(); currentRow++) {
    const rowSource = sheetResponses.getRange(currentRow, 1, 1, sheetResponses.getLastColumn());
    let rowDestination = sheetBackup.getRange(currentRow, 1, 1, sheetResponses.getLastColumn());
    rowSource.copyTo(rowDestination);
    rowDestination.setNumberFormat('@');

    dataCleaned.push(currentRow);
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


    //* Renta *//
    indexClean.rent.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) return;

      currentValue = currentValue.trim();
      if (currentValue.length === 3) { currentValue += '.000'; }

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });

    sheetBackup.getRange(currentRow, 1).setValue('🧼');
  }

  let messageBody = 'No se encontraron datos para limpiar.'
  if (dataCleaned.length > 0) {
    messageBody = dataCleaned.length === 1
    ? 'Se agregó y limpió el dato de 1 párvulo.\n Se limpió la fila ' + dataCleaned[0] + '.'
    : `Se agregaron y limpiaron ${dataCleaned.length} párvulos en total.\n` +
      `Se limpiaron los datos de las filas:\n${dataCleaned.map((row) => ` • ${row}`).join('\n')}`;
  }

  console.log('✅ Done');
  showMessage('🧼 Limpieza finalizada', messageBody);
}

function getDataConfigSheet () {
  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getConfigSheet().SHEET_CONFIG.value);
  let dataConfigSheet = {};

  for (let currentRow = 1; currentRow <= sheetConfig.getLastRow(); currentRow++) {
    dataConfigSheet[sheetConfig.getRange(currentRow, 1).getValue()] = sheetConfig.getRange(currentRow, 2).getValue();
  }

  return dataConfigSheet;
}
