function createConfigSheet () {
  showToast(
    `${messageStateEmoji().CONFIGURATION} Hoja de Configuración`,
    'Trabajando en la hoja.'
  );

  const configObject = getConfigSheet();

  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configObject.SHEET_CONFIG.value);
  let messageBody = 'Ya existe la hoja con los valores por defecto por lo que no se realizaron cambios.';
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

    messageBody = `Se creó la 'Hoja de Configuración' con los valores por defecto.`;
    const messageBodyAlert = messageBody + `
    \n⚠️ Recuerde rellenar todos los campos de la hoja. ⚠️
    \n• Los campos importantes son:
    - ID Carpeta A (ID_FOLDER_A: Donde se guardarán los documentos generados de la jornada de la mañana)
    - ID Carpeta B (ID_FOLDER_B: Donde se guardarán los documentos generados de la jornada de la tarde)
    - ID de la imagen (ID_IMAGE: Imagen del logo del jardín para el documento)
    \n• Los campos que necesita revisar que estén correctos son:
    - Hoja de Respuestas (SHEET_RESPONSES: Donde se guardarán los datos de los párvulos para generar los documentos)
    - ¿Es Pre-Kinder o Kinder? (IS_KINDER: Esto indica el nivel educativo, se debe rellenar con FALSE si es Pre-Kinder o TRUE si es Kinder)
    \n• Si necesita ayuda:
    - Revise la documentación presente en la 'Hoja de Configuración' creada
    - Contacte al desarrollador`;

    showMessage(`${messageStateEmoji().DONE} Hoja de Configuración`, messageBodyAlert);

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
      messageBody = 'Se actualizó la hoja con los valores por defecto.';
    }
  }

  sheetConfig.setColumnWidth(1, 150);
  sheetConfig.setColumnWidth(2, 300);
  sheetConfig.setColumnWidth(3, 750);

  showToast(`${messageStateEmoji().DONE} Hoja de Configuración`, messageBody);

  //~ Se crea la "Hoja de Respaldo" en caso de no existir ~//
  const dataConfigSheet = getDataConfigSheet();
  createBackupSheet(dataConfigSheet);
}

function createBackupSheet(dataConfigSheet) {
  let sheetBackup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);

  if (sheetBackup === null) {
    sheetBackup = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheetBackup.setName(dataConfigSheet.SHEET_BACKUP);

    showToast(`${messageStateEmoji().DONE} Hoja de Respaldo`, `Se creó la "Hoja de Respaldo" con los datos de la "Hoja de Respuestas".`);
  } else {
    showToast(`${messageStateEmoji().DONE} Hoja de Respaldo`, `La hoja ya existe, no se realizaron cambios.`);
  }
}
