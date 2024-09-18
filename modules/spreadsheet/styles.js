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

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraphKey() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraphValue() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleParagraphValueImportant() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeTitles;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleParagraphValueChildName() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeChildName;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleParagraphValueEmail() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = false;

  return style;
}

function styleParagraphFull() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.Size;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.UNDERLINE] = true;

  return style;
}

function styleParagraphFullImportant() {
  let style = {};

  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  style[DocumentApp.Attribute.FONT_FAMILY] = styleValues().Font.Family;
  style[DocumentApp.Attribute.FONT_SIZE] = styleValues().Font.SizeTitles;
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
