function styleValues () {
  return {
    Font: {
      Family: 'Century Gothic',
      Size: 10,
      SizeTitles: 11
    },
    PageFormat: {
      PointsInInchs: 72,
      Height: 13,
      Width: 8.5,
      Margin: {
        Top: 0.4,
        Bottom: 0.4,
        Left: 0.4,
        Right: 0.4
      }
    },
    SpaceParagraph: {
      Header: 0.125,
      Paragraph: 0.125,
      EndDate: 0.125
    },
    SpaceLine: 1
  }
}

function styleHeader() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeTitles;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleSubHeader() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleTitle() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeTitles;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleSubTitle() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeTitles;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraph() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.JUSTIFY;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraphKey() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.JUSTIFY;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraphValue() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.JUSTIFY;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleParagraphFull() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.JUSTIFY;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleEndDate() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}
