function generateDocument(dataConfigSheet, data, level, type) {
  //~ Generación del Texto ~//
  const titleHeader = 'Ficha de Antecedentes 20____';
  const currentGrade = level + ' - ' + type;
  const childFullName = data.section_1.fatherLastName.toUpperCase() + ' ' + data.section_1.motherLastName.toUpperCase() + ' ' + data.section_1.names.toUpperCase();
  const textComplicationsBirth = formatComplicationsBirth(data.section_3.complicationsBirth, data.section_3.whatComplications);
  const textAllergies = formatAllergies(data.section_3.childHasAllergies, data.section_3.whatAllergies);


  //~ Destino y creación de Archivo base ~//
  const destination = DriveApp.getFolderById(getIdFolder(dataConfigSheet, type));

  const fileName = (new Date()).getFullYear() + ' / ' + level + ' - ' + type + ' / ' + childFullName;
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


  const dataDocument = documentLayout(data, titleHeader, currentGrade, childFullName, textComplicationsBirth, textAllergies);

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

      if (item.hasTable) {
        let cells = [
          ['Nombre', 'Edad', 'Parentesco', 'Actividad'],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ];

        let tableObject = fileBody.appendTable(cells);
        tableObject.setColumnWidth(1, 50);
        tableObject.setColumnWidth(2, 100);
      }

      item.breakLine
        ? paragraphObjetcDataChild.appendText('\n')
        : paragraphObjetcDataChild.appendText(' ').setAttributes(getStyle('Paragraph'));

      if (item.breakPage) paragraphObjetcDataChild.appendPageBreak();

    });
  });

  let paragraphs = fileBody.getParagraphs();
  paragraphs[0].removeFromParent();

  const blob = DriveApp.getFileById(dataConfigSheet.ID_IMAGE).getBlob();
  const image = paragraphs[1].addPositionedImage(blob);
  image.setHeight(styleValues().ImageFormat.Height)
    .setWidth(styleValues().ImageFormat.Height)
    .setLeftOffset(styleValues().ImageFormat.LeftOffset)
    .setLayout(DocumentApp.PositionedLayout.ABOVE_TEXT);

  doc.saveAndClose();
}
