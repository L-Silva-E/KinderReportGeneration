function getDataRow(sheetData, row) {
  return {
    'enrollment': {
      'level': sheetData.getRange(row, 77).getValue(),
      'type': sheetData.getRange(row, 78).getValue(),
      'applyBenefitExtendedHours': sheetData.getRange(row, 11).getValue(),
    },
    'section_1': {
      'fatherLastName': sheetData.getRange(row, 2).getValue(),
      'motherLastName': sheetData.getRange(row, 3).getValue(),
      'names': sheetData.getRange(row, 4).getValue(),
      'birthday': sheetData.getRange(row, 5).getValue(),
      'rut': sheetData.getRange(row, 6).getValue(),
      'age': sheetData.getRange(row, 7).getValue(),
      'address': sheetData.getRange(row, 8).getValue(),
      'childLiveWith': sheetData.getRange(row, 9).getValue(),
      'whoTakesCaresOfChild': sheetData.getRange(row, 10).getValue(),
      'childRoom': sheetData.getRange(row, 12).getValue(),
      'childShareRoomWith': sheetData.getRange(row, 13).getValue(),
      'childBed': sheetData.getRange(row, 14).getValue(),
      'childShareBedWith': sheetData.getRange(row, 15).getValue(),
      'schoolOrigin': sheetData.getRange(row, 16).getValue(),
      'schoolName': sheetData.getRange(row, 17).getValue(),
    },
    'section_2': {
      'typeBirth': sheetData.getRange(row, 18).getValue(),
      'weightBirth': sheetData.getRange(row, 19).getValue(),
      'complicationsBirth': sheetData.getRange(row, 20).getValue(),
      'whatComplications': sheetData.getRange(row, 21).getValue(),
      'childHasAllergies': sheetData.getRange(row, 22).getValue(),
      'whatAllergies': sheetData.getRange(row, 23).getValue(),
      'childSpecialist': sheetData.getRange(row, 24).getValue(),
      'childHealthSystem': sheetData.getRange(row, 25).getValue(),
      'childInCesfam': sheetData.getRange(row, 26).getValue(),
      'childCesfam': sheetData.getRange(row, 27).getValue(),
      'childWellControl': sheetData.getRange(row, 28).getValue(),
      'childIsTreatment': sheetData.getRange(row, 29).getValue(),
    },
    'section_3': {
      'mother': {
        'fullName': sheetData.getRange(row, 30).getValue(),
        'rut': sheetData.getRange(row, 31).getValue(),
        'phone': sheetData.getRange(row, 32).getValue(),
        'age': sheetData.getRange(row, 33).getValue(),
        'study': sheetData.getRange(row, 34).getValue(),
        'occupation': sheetData.getRange(row, 35).getValue(),
        'workPlace': sheetData.getRange(row, 36).getValue(),
        'rent': sheetData.getRange(row, 37).getValue(),
        'typeWorkday': sheetData.getRange(row, 38).getValue(),
        'workingHours': sheetData.getRange(row, 39).getValue(),
        'liveWithChild': sheetData.getRange(row, 40).getValue(),
        'hasVisit': sheetData.getRange(row, 41).getValue(),
        'monetaryContribution': sheetData.getRange(row, 42).getValue(),
        'authorizedWithdraw': sheetData.getRange(row, 43).getValue(),
        'authorizedVisit': sheetData.getRange(row, 44).getValue(),
      },
      'father': {
        'fullName': sheetData.getRange(row, 45).getValue(),
        'rut': sheetData.getRange(row, 46).getValue(),
        'phone': sheetData.getRange(row, 47).getValue(),
        'age': sheetData.getRange(row, 48).getValue(),
        'study': sheetData.getRange(row, 49).getValue(),
        'occupation': sheetData.getRange(row, 50).getValue(),
        'workPlace': sheetData.getRange(row, 51).getValue(),
        'rent': sheetData.getRange(row, 52).getValue(),
        'typeWorkday': sheetData.getRange(row, 53).getValue(),
        'workingHours': sheetData.getRange(row, 54).getValue(),
        'liveWithChild': sheetData.getRange(row, 55).getValue(),
        'hasVisit': sheetData.getRange(row, 56).getValue(),
        'monetaryContribution': sheetData.getRange(row, 57).getValue(),
        'authorizedWithdraw': sheetData.getRange(row, 58).getValue(),
        'authorizedVisit': sheetData.getRange(row, 59).getValue(),
      },
      'guardian': {
        'fullName': sheetData.getRange(row, 60).getValue(),
        'rut': sheetData.getRange(row, 61).getValue(),
        'kinship': sheetData.getRange(row, 62).getValue(),
        'phone': sheetData.getRange(row, 63).getValue(),
        'email': sheetData.getRange(row, 64).getValue(),
        'age': sheetData.getRange(row, 65).getValue(),
        'occupation': sheetData.getRange(row, 66).getValue(),
        'workPlace': sheetData.getRange(row, 67).getValue(),
        'rent': sheetData.getRange(row, 68).getValue(),
        'typeWorkday': sheetData.getRange(row, 69).getValue(),
        'workingHours': sheetData.getRange(row, 70).getValue(),
        'guardianshipDocument': sheetData.getRange(row, 71).getValue(),
      }
    },
    'section_4': {
      'socialHouseholdRegistry': sheetData.getRange(row, 72).getValue(),
      'familyLivesIn': sheetData.getRange(row, 73).getValue(),
      'emergencyContact1': sheetData.getRange(row, 74).getValue(),
      'emergencyContact2': sheetData.getRange(row, 75).getValue(),
      'emergencyContact3': sheetData.getRange(row, 76).getValue(),
    }
  }
}

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
  if (style === 'ParagraphValueImportant') { return styleParagraphValueImportant() }
  if (style === 'ParagraphFull') { return styleParagraphFull() }
  if (style === 'ParagraphFullImportant') { return styleParagraphFullImportant() }
  if (style === 'EndDate') { return styleEndDate() }
}

function getConfigKeys() {
  return {
    ID_FOLDER: '',
    SHEET_BACKUP: 'Respaldo',
    SHEET_CONFIG: 'Configuración',
    SHEET_RESPONSES: 'Form Responses 1'
  }
}

function showMessage(header, body) {
  SpreadsheetApp.getUi().alert(
    header,
    body,
    SpreadsheetApp.getUi().ButtonSet.OK
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
