function cleanAllRows () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;


  //~ Limpieza de filas ~//
  const sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetBackup === null) {
    showMessage(`${messageStateEmoji.ERROR} Hoja de Respaldo`, 'Falta la "Hoja de Respaldo"\nProceso de limpieza detenido.');
    return;
  }

  showToast(
    `${cellStateEmoji.CLEANED} Limpiando Filas`,
    'Limpiar todas las filas puede tardar varios minutos.'
  );

  sheetBackup.getRange(1, 1).setValue(cellStateEmoji.HEADER);
  let countCleaned = 0;

  for (let currentRow = 2; currentRow <= sheetBackup.getLastRow(); currentRow++) {
    const rut = sheetBackup.getRange(currentRow, 11).getValue();
    console.log(currentRow + ' - ' + rut);

    //~ Limpieza y formateo de columans ~//
    cleanDataRow(sheetBackup, currentRow);

    sheetBackup.getRange(currentRow, 1).setValue(cellStateEmoji.CLEANED);
    countCleaned++;
  }

  showMessage(
    `${messageStateEmoji.DONE} Limpieza finalizada`,
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
    showMessage(`${messageStateEmoji.ERROR} Hoja de Respaldo`, 'Falta la "Hoja de Respaldo"\nSe ha detenido la generación de documentos.');
    return;
  }

  showToast(
    `${cellStateEmoji.CLEANED} Limpiando Valores`,
    'Limpiar las filas restantes puede tardar varios minutos.'
  );

  let dataCleaned = [];
  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    if (
      sheetData.getRange(currentRow, 1).getValue() === cellStateEmoji.CLEANED ||
      sheetData.getRange(currentRow, 1).getValue() === cellStateEmoji.GENERATED
    )
    continue;

    const rut = sheetData.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);

    //~ Limpieza y formateo de columans ~//
    cleanDataRow(sheetData, currentRow);

    sheetData.getRange(currentRow, 1).setValue(cellStateEmoji.CLEANED);
    dataCleaned.push(currentRow);
  }


  let messageBody = dataCleaned.length === 0
    ? 'No se encontraron datos para limpiar.'
    : `Se limpiaron los datos de ${dataCleaned.length} párvulos en total.
      Se limpiaron los datos de las filas:`;
  dataCleaned.forEach((row) => {
    messageBody += '\n • ' + row;
  });

  showMessage(`${messageStateEmoji.DONE} Limpieza finalizada`, messageBody);
}


function cleanSpecificRow () {
  //~ Obtención de Datos de la Hoja de Configuración ~//
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return;
  if (!validateConfigSheet(dataConfigSheet)) return;

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage(`${messageStateEmoji.ERROR} Hoja de Respaldo`, 'Falta la "Hoja de Respaldo"\nSe ha detenido la limpieza de la fila.');
    return;
  }

  //~ Prompt para obtener el número de fila ~//
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    `${cellStateEmoji.CLEANED} Limpieza de 1 fila`,
    'Ingrese el número de fila del párvulo que desea limpiar.',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    showMessage(
      `${messageStateEmoji.ERROR} Limpieza de Fila`,
      'Se ha cancelado la limpieza de la fila.'
    );
    return;
  }

  const currentRow = parseInt(result.getResponseText());
  if (isNaN(currentRow)) {
    showMessage(
      `${messageStateEmoji.ERROR} Número de Fila`,
      'El valor ingresado no es un número\nSe ha detenido la limpieza de la fila.'
    );
    return;
  }

  if (currentRow < 2 || currentRow > sheetData.getLastRow()) {
    showMessage(
      `${messageStateEmoji.ERROR} Número de Fila`,
      `El valor ingresado no es válido\nDebe estar entre 2 y ${sheetData.getLastRow()}\nSe ha detenido la limpieza de la fila.`
    );
    return;
  }

  showToast(
    `${cellStateEmoji.CLEANED} Comenzando Ejecución`,
    `Se está limpiando la fila número ${currentRow}.`
  );

  //~ Limpieza y formateo de columans ~//
  cleanDataRow(sheetData, currentRow);

  sheetData.getRange(currentRow, 1).setValue(cellStateEmoji.CLEANED);

  showMessage(
    `${messageStateEmoji.DONE} Limpieza finalizada`,
    `Se limpió la fila número ${currentRow}.`
  );
}
