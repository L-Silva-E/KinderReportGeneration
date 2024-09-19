function cleanAllRows () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;


  //~ Limpieza de filas ~//
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetBackup === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nProceso de limpieza detenido.');
    return;
  }

  showToast(
    '🧼 Limpiando Filas',
    'Limpiar todas las filas puede tardar varios minutos.'
  );

  sheetBackup.getRange(1, 1).setValue('Estado');
  let countCleaned = 0;

  for (let currentRow = 2; currentRow <= sheetBackup.getLastRow(); currentRow++) {
    const rut = sheetBackup.getRange(currentRow, 11).getValue();
    console.log(currentRow + ' - ' + rut);

    //~ Limpieza y formateo de columans ~//
    cleanDataRow(sheetBackup, currentRow);

    sheetBackup.getRange(currentRow, 1).setValue('🧼');
    countCleaned++;
  }

  showMessage(
    '✅ Limpieza finalizada',
    `Se limpiaron los datos de ${countCleaned} párvulos en total.`
  );
}


function cleanPendingRows () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos.');
    return;
  }

  showToast(
    '🧼 Limpiando Valores',
    'Limpiar las filas restantes puede tardar varios minutos.'
  );

  let dataCleaned = [];
  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    if (
      sheetData.getRange(currentRow, 1).getValue() === '🧼' ||
      sheetData.getRange(currentRow, 1).getValue() === '📋'
    )
    continue;

    const rut = sheetData.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);

    //~ Limpieza y formateo de columans ~//
    cleanDataRow(sheetData, currentRow);

    sheetData.getRange(currentRow, 1).setValue('🧼');
    dataCleaned.push(currentRow);
  }


  let messageBody = dataCleaned.length === 0
    ? 'No se encontraron datos para limpiar.'
    : `Se limpiaron los datos de ${dataCleaned.length} párvulos en total.
      Se limpiaron los datos de las filas:`;
  dataCleaned.forEach((row) => {
    messageBody += '\n • ' + row;
  });

  showMessage('✅ Limpieza finalizada', messageBody);
}


function cleanSpecificRow () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nSe ha detenido la limpieza de la fila.');
    return;
  }

  //~ Prompt para obtener el número de fila ~//
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    '🧼 Limpieza de 1 fila',
    'Ingrese el número de fila del párvulo que desea limpiar.',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    showMessage(
      '❌ Limpieza de Fila',
      'Se ha cancelado la limpieza de la fila.'
    );
    return;
  }

  const currentRow = parseInt(result.getResponseText());
  if (isNaN(currentRow)) {
    showMessage(
      '❌ Número de Fila',
      'El valor ingresado no es un número\nSe ha detenido la limpieza de la fila.'
    );
    return;
  }

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage(
      '❌ Número de Fila',
      `El valor ingresado no es válido\nDebe estar entre 2 y ${sheetData.getLastRow()}\nSe ha detenido la limpieza de la fila.`
    );
    return;
  }

  showToast(
    '🧼 Comenzando Ejecución',
    `Se está limpiando la fila número ${currentRow}.`
  );

  //~ Limpieza y formateo de columans ~//
  cleanDataRow(sheetData, currentRow);

  sheetData.getRange(currentRow, 1).setValue('🧼');

  showMessage(
    '✅ Limpieza finalizada',
    `Se limpió la fila número ${currentRow}.`
  );
}
