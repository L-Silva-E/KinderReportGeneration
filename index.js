function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙️ Administración')
    .addItem('🧼 Limpiar Valores', 'cleanValues')
    .addItem('📄 Generar Documentos', 'generateAllDocuments')
    .addToUi();
}


function generateAllDocuments () {
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.ID_FOLDER === '' || dataConfigSheet.ID_IMAGE === '' || dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
    showMessage('❌ Hoja de Configuración', 'Faltan valores en la "Hoja de Configuración"\nSe tienen que rellenar todos los campos\nGeneración de documentos detenido',)
    return;
  }

  const sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataConfigSheet.SHEET_BACKUP);
  if (sheetData === null) {
    showMessage('❌ Hoja de Respaldo', 'Falta la "Hoja de Respaldo"\nGeneración de documentos detenido');
    return;
  }

  showToast(
    '⚠️ Comenzando Ejecución',
    'Generar los documentos puede tardar varios minutos'
  );

  const arrayLevel = [
    { key: 'PREKINDER (nivel de transición I)', value: 'Pre-Kinder'},
    { key: 'KINDER (nivel de transición II)',   value: 'Kinder'}
  ];
  const arrayType = [
    { key: 'JORNADA DE MAÑANA', value: 'Jornada Mañana'},
    { key: 'JORNADA DE TARDE',  value: 'Jornada Tarde'}
  ];

  for (let currentRow = 2; currentRow <= sheetData.getLastRow(); currentRow++) {
    console.log('Getting row: ' + currentRow);
    const data = getDataRow(sheetData, currentRow);

    const currentFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
    const currentLevel = (arrayLevel.find((level) => level.key === data.enrollment.level)).value;
    const currentType = (arrayType.find((type) => type.key === data.enrollment.type)).value;

    console.log('Generating document: ' + data.section_1.rut);
    showToast(
      '🏗️ Generando Documento',
      currentLevel + ' / ' + currentType + ' - ' + currentFullName
    );
    generateDocument(dataConfigSheet, data, currentLevel, currentType);
    showToast(
      '✅ Documento Generado',
      currentLevel + ' / ' + currentType + ' - ' + currentFullName
    );

    sheetData.getRange(currentRow, 1).setValue('📄');
  }

  console.log('✅ Done');
  showMessage(
    '✅ Ejecución Finalizada',
    'Los documentos se generaron con datos de ' + (sheetData.getLastRow() - 1) + ' párvulos en total.'
  );
}


function generateDocument(dataConfigSheet, data, level, type) {
  //~ Generación del Texto ~//
  const childFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
  const textComplicationsBirth = formatComplicationsBirth(data.section_2.complicationsBirth, data.section_2.whatComplications);


  // //~ Destino y creación de Archivo base ~//
  const destination = DriveApp.getFolderById(dataConfigSheet.ID_FOLDER);

  const fileName = (new Date()).getFullYear() + ' - ' + level + ' / ' + type + ' - ' + childFullName;
  const doc = DocumentApp.create(fileName);
  const idDoc = doc.getId();
  const file = DriveApp.getFileById(idDoc);
  file.moveTo(destination);

  const fileBody = doc.getBody();


  //~ Configuración del Documento ~//
  fileBody.setPageHeight(getPoints(styleValues().PageFormat.Height));
  fileBody.setPageWidth(getPoints(styleValues().PageFormat.Width));

  fileBody.setMarginTop(getPoints(styleValues().PageFormat.Margin.Top));
  fileBody.setMarginBottom(getPoints(styleValues().PageFormat.Margin.Bottom));
  fileBody.setMarginLeft(getPoints(styleValues().PageFormat.Margin.Left));
  fileBody.setMarginRight(getPoints(styleValues().PageFormat.Margin.Right));


  let dataDocument = [
    {
      configuration: {
        type: 'Header'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'Ficha de Antecedentes 2024', style: 'Header' },
          value: null
        }
      ]
    },
    {
      configuration: {
        type: 'Header'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'N° de Registro ______', style: 'SubHeader' },
          value: null
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'I. Antecedentes Personales del Párvulo/a', style: 'Title' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Curso:', style: 'ParagraphKey' },
          value: { text: 'Kinder-A', style: 'ParagraphFullImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Nombre:', style: 'ParagraphKey' },
          value: { text: childFullName, style: 'ParagraphValueChildName' }
        },
        {
          breakLine: false,
          key:   { text: 'RUT:', style: 'ParagraphKey' },
          value: { text: data.section_1.rut, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Fecha de nacimiento:', style: 'ParagraphKey' },
          value: { text: data.section_1.birthday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Edad al 31/03:', style: 'ParagraphKey' },
          value: { text: data.section_1.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Domicilio:', style: 'ParagraphKey' },
          value: { text: data.section_1.address, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Con quién vive el niño/a?', style: 'ParagraphKey' },
          value: { text: data.section_1.childLiveWith, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Quién estará al cuidado cuando no esté en el jardín?', style: 'ParagraphKey' },
          value: { text: data.section_1.whoTakesCaresOfChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Duerme en:', style: 'ParagraphKey' },
          value: { text: data.section_1.childRoom, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_1.childShareRoomWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Posee:', style: 'ParagraphKey' },
          value: { text: data.section_1.childBed, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_1.childShareBedWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Procedencia escolar:', style: 'ParagraphKey' },
          value: { text: data.section_1.schoolOrigin, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: ' ', style: 'ParagraphKey' },
          value: { text: data.section_1.schoolName, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'II. Antecedentes de Salud del Niño/a', style: 'Title' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nacimiento del niño/a:', style: 'ParagraphKey' },
          value: { text: data.section_2.typeBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Peso al nacer:', style: 'ParagraphKey' },
          value: { text: data.section_2.weightBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Complicaciones en el parto:', style: 'ParagraphKey' },
          value: { text: textComplicationsBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a es alérgico?', style: 'ParagraphKey' },
          value: { text: data.section_2.childHasAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Qué alergias presenta?', style: 'ParagraphKey' },
          value: { text: data.section_2.whatAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Es atendido por algún especialista?', style: 'ParagraphKey' },
          value: { text: data.section_2.childSpecialist, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Sistema de salud al que pertenece el párvulo/a:', style: 'ParagraphKey' },
          value: { text: data.section_2.childHealthSystem, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a está inscrito en el CESFAM?', style: 'ParagraphKey' },
          value: { text: data.section_2.childInCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿A cuál pertenece?', style: 'ParagraphKey' },
          value: { text: data.section_2.childCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Mantiene el control del Niño Sano del párvulo/a al día?', style: 'ParagraphKey' },
          value: { text: data.section_2.childWellControl, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Está en alguno de estos tratamientos de salud?', style: 'ParagraphKey' },
          value: { text: data.section_2.childIsTreatment, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'III. Antecedentes Familiares', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '1. Datos de la Madre', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizada a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.authorizedVisit, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: '2. Datos del Padre', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizado a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.authorizedVisit, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: '3. Datos del Apoderado', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.fullName, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Email:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.email, style: 'ParagraphValueEmail' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Documento de tutela:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.guardianshipDocument, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'IV. Antecedentes Sociales', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '¿El grupo familiar del párvulo/a está inscrito en el "Registro Social de Hogares"?', style: 'ParagraphKey' },
          value: { text: data.section_4.socialHouseholdRegistry, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'El grupo familiar vive en:', style: 'ParagraphKey' },
          value: { text: data.section_4.familyLivesIn, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 1:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact1, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 2:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact2, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 3:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact3, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'Matriculado por Tía: ________________________ Firma Apoderado: ________________________', style: 'SubTitle' },
          value: null
        }
      ]
    },
    {
      configuration: {
        type: 'EndDate'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'Fecha: ', style: 'EndDate' },
          value: { text: formatDate(), style: 'EndDate' }
        },
      ]
    }
  ];

  dataDocument.forEach((section) => {
    let paragraphObjetcDataChild =
      fileBody.appendParagraph('')
      .setSpacingAfter(getPoints(styleValues().SpaceParagraph[section.configuration.type]))
      .setLineSpacing(styleValues().SpaceLine);

    paragraphObjetcDataChild.setAttributes(getStyle(section.configuration.type));

    section.values.forEach((item) => {
      if (item.key !== null) {
        paragraphObjetcDataChild
          .appendText(item.key.text + ' ')
          .setAttributes(getStyle(item.key.style));
      }

      if (item.value !== null) {
        let textValue = item.value.text ? item.value.text : 'S/Datos';

        paragraphObjetcDataChild
          .appendText(textValue)
          .setAttributes(getStyle(item.value.style));
      }

      item.breakLine
        ? paragraphObjetcDataChild.appendText('\n')
        : paragraphObjetcDataChild.appendText(' ').setAttributes(getStyle('Paragraph'));

    });
  });

  let paragraphs = fileBody.getParagraphs();
  paragraphs[0].removeFromParent();

  const blob = DriveApp.getFileById(dataConfigSheet.ID_IMAGE).getBlob();
  const image = paragraphs[1].addPositionedImage(blob);
  image.setHeight(116).setWidth(96).setLeftOffset(480).setLayout(DocumentApp.PositionedLayout.ABOVE_TEXT);

  doc.saveAndClose();
}


function cleanValues () {
  //~ Creación Hoja de Configuración ~//
  createConfigSheet();


  //~ Obtención de Datos importantes ~//
  const dataConfigSheet = getDataConfigSheet();
  if (dataConfigSheet.SHEET_BACKUP === '' || dataConfigSheet.SHEET_CONFIG === '' || dataConfigSheet.SHEET_RESPONSES === '') {
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

  sheetBackup.getRange(1, 1).setValue('Limpieza');
  let countCleaned = 0;

  for (let currentRow = 2; currentRow <= sheetBackup.getLastRow(); currentRow++) {
    const rut = sheetBackup.getRange(currentRow, 6).getValue();
    console.log(currentRow + ' - ' + rut);


    let columns = [];

    //~ Limpieza y formateo de columans ~//
    //* Capitalización de Nombres *//
    columns = [2, 3, 4, 30, 45, 60];
    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      currentValue = currentValue.toLowerCase().replace(/(?:^|\s)\S/g, function(word) {
        return word.toUpperCase();
      });

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Fechas *//
    columns = [5];
    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      let arrayDate = currentValue.split('/');
      if (arrayDate[0].length === 1) { arrayDate[0] = '0' + arrayDate[0]; }
      if (arrayDate[1].length === 1) { arrayDate[1] = '0' + arrayDate[1]; }
      currentValue = arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2];

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });


    //* Renta *//
    columns = [37, 52, 68];

    columns.forEach((column) => {
      let currentValue = sheetBackup.getRange(currentRow, column).getValue();
      if (!currentValue) { return; }

      currentValue = currentValue.trim();
      if (currentValue.length === 3) { currentValue += '.000'; }

      sheetBackup.getRange(currentRow, column).setValue(currentValue);
    });

    sheetBackup.getRange(currentRow, 1).setValue('✅');
    countCleaned++;
  }

  console.log('✅ Done');
  showMessage('🧼 Limpieza finalizada', 'Se limpiaron los datos de ' + countCleaned + ' párvulos en total.');
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
