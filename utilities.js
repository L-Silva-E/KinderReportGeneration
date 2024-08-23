function cleanText(type, text) {
  let cleanedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return type === constants().CASE_TEXT.LOWER ? cleanedText.toLowerCase() : cleanedText.toUpperCase();
}

function formatDate(date) {
  date = date ? date : new Date();
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/YYYY')
}

function formatComplicationsBirth(complicationsBirth, whatComplications) {
  return complicationsBirth === 'Sí' ? whatComplications : complicationsBirth;
}

function getConfigKeys() {
  return {
    ID_FOLDER: '',
    ID_IMAGE: '',
    SHEET_BACKUP: 'Respaldo',
    SHEET_CONFIG: 'Configuración',
    SHEET_RESPONSES: 'Form Responses 1',
    IS_KINDER: 'true'
  }
}

function getConfigDescription() {
  return {
    ID_FOLDER: 'Rellenar con la \'Id\' de la carpeta en donde se generarán los documentos',
    ID_IMAGE: 'Rellenar con la \'Id\' de la imagen del logo de Crisolito',
    SHEET_BACKUP: '',
    SHEET_CONFIG: '',
    SHEET_RESPONSES: '',
    IS_KINDER: ''
  }
}

function getDataRow(sheetData, currentRow, isKinder) {
  return getDataSpreadsheet(sheetData, currentRow);
}

function getIndexClean(isKinder) {
  return (isKinder)
    ? getIndexCleanKinder()
    : getIndexCleanPreKinder();
}

function getLevels() {
  return [
    { key: 'PREKINDER (nivel de transición I)', value: 'Pre-Kinder' },
    { key: 'KINDER (nivel de transición II)',   value: 'Kinder' }
  ];
}

function getTypes() {
  return [
    { key: 'Jornada de Mañana', value: 'A' },
    { key: 'Jornada de Tarde',  value: 'B' }
  ];
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
