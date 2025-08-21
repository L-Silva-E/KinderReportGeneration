function createForm() {
  //~ Creación del Formulario ~//
  const dataConfigSheet = getDataConfigSheet();
  const form = FormApp.create('2026 - Ficha de Matrícula NT2 Kinder');
  const formFile = DriveApp.getFileById(form.getId());
  const formFolder = DriveApp.getFolderById(dataConfigSheet.ID_FOLDER_FORM);
  formFile.moveTo(formFolder);


  //~ Sección Inicio ~//
  const descriptionForm = getDescriptionForm();
  form.setDescription(descriptionForm);


  //~ Construcción del Formulario ~//
  const itemTypes = getItemTypes();
  const templateForm = getTemplateForm();
  templateForm.forEach((templateItem) => {
    if (templateItem.type === itemTypes.TEXT) {
      form.addTextItem().setRequired(templateItem.required).setTitle(templateItem.title).setHelpText(templateItem.helpText);

    } else if (templateItem.type === itemTypes.MULTIPLE_CHOICE) {
      form.addMultipleChoiceItem().setRequired(templateItem.required).setTitle(templateItem.title).setHelpText(templateItem.helpText).setChoiceValues(templateItem.choices);

    } else if (templateItem.type === itemTypes.PAGE_BREAK) {
      form.addPageBreakItem().setTitle(templateItem.title).setHelpText(templateItem.helpText);

    } else if (templateItem.type === itemTypes.SECTION_HEADER) {
      form.addSectionHeaderItem().setTitle(templateItem.title).setHelpText(templateItem.helpText);

    } else if (templateItem.type === itemTypes.PARAGRAPH_TEXT) {
      form.addParagraphTextItem().setTitle(templateItem.title).setHelpText(templateItem.helpText);

    } else if (templateItem.type === itemTypes.DATE) {
      form.addDateItem().setRequired(templateItem.required).setTitle(templateItem.title).setHelpText(templateItem.helpText);
    }
  });

  // const regexAge = `^(\d+)\s+años\s+(\d+)\s+meses$`;
  // const validationAge = FormApp.createTextValidation().setHelpText("La edad del niño no tiene el formato requerido.").requireTextMatchesPattern(regexAge).build();
  // form.addTextItem().setRequired(true).setTitle('Edad del niño/a al 31 de Marzo de 2025').setHelpText('Ejemplo: 4 años 3 meses').setValidation(validationAge);

  return true;
}
