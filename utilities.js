function cleanText(type, text) {
  let cleanedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return type === constants().CASE_TEXT.LOWER ? cleanedText.toLowerCase() :  cleanedText.toUpperCase();
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

function getDataRow(sheetData, currentRow, isKinder) {
  return (isKinder)
    ? getDataRowKinder(sheetData, currentRow)
    : getDataRowPreKinder(sheetData, currentRow);
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
    { key: 'JORNADA DE MAÑANA', value: 'A' },
    { key: 'JORNADA DE TARDE',  value: 'B' }
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
  SpreadsheetApp.getUi().alert(
    header,
    body,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function showToast(header, body) {
  SpreadsheetApp.getActiveSpreadsheet().toast(
    body, header, 60
  );
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
