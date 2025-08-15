function getDataConfigSheet () {
  let sheetConfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getConfigSheet().SHEET_CONFIG.value);
  let dataConfigSheet = {};

  if (sheetConfig === null) {
    showMessage(
      `${messageStateEmoji().ERROR} Hoja de Configuración`,
      `No se encontró la "Hoja de Configuración"
      Se ha detenido la ejecución

      Para crear la hoja seleccione la opción "⚙️ Configuración Inicial"
      en el menú de "⚙️ Administración".`
    );
    return false;
  }

  for (let currentRow = 1; currentRow <= sheetConfig.getLastRow(); currentRow++) {
    dataConfigSheet[sheetConfig.getRange(currentRow, 1).getValue()] = sheetConfig.getRange(currentRow, 2).getValue();
  }

  return dataConfigSheet;
}


function validateConfigSheet(dataConfigSheet) {
  if (
    dataConfigSheet.ID_FOLDER_A === '' ||
    dataConfigSheet.ID_FOLDER_B === '' ||
    dataConfigSheet.ID_IMAGE === '' ||
    dataConfigSheet.SHEET_BACKUP === '' ||
    dataConfigSheet.SHEET_CONFIG === '' ||
    dataConfigSheet.SHEET_RESPONSES === '' ||
    dataConfigSheet.IS_KINDER === ''
  ) {
    showMessage(
      `${messageStateEmoji().ERROR} Hoja de Configuración`,
      `Faltan valores en la "Hoja de Configuración"
      Se tienen que rellenar todos los campos
      Se ha detenido la ejecución`
    )
    return false;
  }

  return true;
}

function cleanText(type, text) {
  let cleanedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return type === constants().CASE_TEXT.LOWER ? cleanedText.toLowerCase() : cleanedText.toUpperCase();
}

function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return '';
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

function formatComplicationsBirth(complicationsBirth, whatComplications) {
  return complicationsBirth === 'Sí' ? whatComplications : complicationsBirth;
}

function getConfigSheet() {
  return {
    ID_FOLDER_A: {
      value: '',
      description: 'Rellenar con la \'Id\' de la carpeta en donde se generarán los documentos de la \'Jornada de la Mañana\''
    },
    ID_FOLDER_B: {
      value: '',
      description: 'Rellenar con la \'Id\' de la carpeta en donde se generarán los documentos de la \'Jornada de la Tarde\''
    },
    ID_IMAGE: {
      value: '',
      description: 'Rellenar con la \'Id\' de la imagen del logo de Crisolito'
    },
    SHEET_BACKUP: {
      value: 'Respaldo',
      description: ''
    },
    SHEET_CONFIG: {
      value: 'Configuración',
      description: ''
    },
    SHEET_RESPONSES: {
      value: 'Form Responses 1',
      description: ''
    },
    IS_KINDER: {
      value: true,
      description: ''
    }
  };
}

function getLevel(isKinder) {
  return (isKinder) ? 'Kinder' : 'Pre-Kinder';
}

function getType(type) {
  return (type === 'Jornada de Mañana') ? 'A' : 'B';
}

function getIdFolder(dataConfigSheet, type) {
  return (type === 'A') ? dataConfigSheet.ID_FOLDER_A : dataConfigSheet.ID_FOLDER_B;
}

function getPoints(inchs) {
  return inchs * styleValues().PageFormat.PointsInInchs;
}

function getStyle(style) {
  if (style === 'Header') { return styleHeader() }
  if (style === 'SubHeader') { return styleSubHeader() }
  if (style === 'Title') { return styleTitle() }
  if (style === 'SubTitle') { return styleSubTitle() }
  if (style === 'Paragraph') { return styleParagraph() }
  if (style === 'ParagraphKey') { return styleParagraphKey() }
  if (style === 'ParagraphValue') { return styleParagraphValue() }
  if (style === 'ParagraphValueChildName') { return styleParagraphValueChildName() }
  if (style === 'ParagraphValueEmail') { return styleParagraphValueEmail() }
  if (style === 'ParagraphValueImportant') { return styleParagraphValueImportant() }
  if (style === 'ParagraphFull') { return styleParagraphFull() }
  if (style === 'ParagraphFullImportant') { return styleParagraphFullImportant() }
  if (style === 'EndDate') { return styleEndDate() }
}

function showMessage(header, body) {
  showToast(header, body, 5);

  SpreadsheetApp.getUi().alert(
    header, body, SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function showToast(header, body, time = 60) {
  const formattedBody = formatToastBody(body);
  SpreadsheetApp.getActiveSpreadsheet().toast(
    formattedBody, header, time
  );
}

function formatToastBody(message) {
  let formattedMessage = message.replace(/:\n • /g, ': ');

  const rows = formattedMessage.split('\n • ');
  if (rows.length === 1) { return formattedMessage }

  const lastRow = rows.pop();
  formattedMessage = `${rows.join(', ')} y ${lastRow}`;

  return formattedMessage;
}

function editFile () {
  const ID_FILE = '';
  const doc = DocumentApp.openById(ID_FILE);
  const fileBody = doc.getBody();

  let paras = fileBody.getParagraphs();
  for (let i = 0; i < paras.length-1; i++) {
    paras[i].removeFromParent();
  }
  fileBody.appendParagraph('Temporal');
  paras = fileBody.getParagraphs();
  paras[0].removeFromParent();
}
