//! Recordatorio para cuando vuelva a trabajar en este script:
//! Se está clonando un template de formulario y se reemplazan tokens específicos.
//! Estas copias quedan dentro de una carpeta por año (ingresada por prompt)
//! El problema es que al reemplazar los tokens, se pierde el estilo del formulario original.
//! Además, se está creando una copia de más

/**
 * Función principal para configurar formularios anuales
 * Permite crear formularios para Kinder y Pre-Kinder con año dinámico
 */
function setupNewYearForms() {
  const ui = SpreadsheetApp.getUi();

  showToast('🎓 Iniciando Configuración', 'Configurando formulario anual...');

  // Validar año
  const yearResult = promptValidYear();
  if (!yearResult.success) return;

  const targetYear = yearResult.year;

  // Seleccionar nivel educativo
  const gradeResult = promptSelectGrade();
  if (!gradeResult.success) return;

  const gradeInfo = gradeResult.gradeInfo;

  // Crear formulario desde template
  const success = createFormFromTemplate(targetYear, gradeInfo);

  if (success) {
    // Crear/actualizar sheet correspondiente
    createYearlySheet(targetYear, gradeInfo.shortName);
  }
}

/**
 * Solicita y valida el año para el formulario
 * @returns {Object} Resultado con success y year
 */
function promptValidYear() {
  const ui = SpreadsheetApp.getUi();
  const currentYear = new Date().getFullYear();

  const result = ui.prompt(
    '🎓 Configuración Anual - Año',
    `Ingrese el año para el cual crear el formulario (${currentYear} o posterior):`,
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    return { success: false };
  }

  const year = parseInt(result.getResponseText());

  // Validaciones
  if (isNaN(year)) {
    ui.alert('❌ Error', 'El año debe ser un número válido', ui.ButtonSet.OK);
    return { success: false };
  }

  if (year < currentYear) {
    ui.alert('❌ Error', `El año debe ser ${currentYear} o posterior`, ui.ButtonSet.OK);
    return { success: false };
  }

  if (year > currentYear + 10) {
    ui.alert('❌ Error', 'El año no puede ser más de 10 años en el futuro', ui.ButtonSet.OK);
    return { success: false };
  }

  return { success: true, year: year };
}

/**
 * Solicita selección del nivel educativo
 * @returns {Object} Resultado con success y gradeInfo
 */
function promptSelectGrade() {
  const ui = SpreadsheetApp.getUi();

  const result = ui.alert(
    '🎯 Configuración Anual - Nivel Educativo',
    '¿Para qué nivel educativo desea crear el formulario?\n\n• SÍ = Kinder (NT2)\n• NO = Pre-Kinder (NT1)',
    ui.ButtonSet.YES_NO_CANCEL
  );

  let gradeInfo;
  switch (result) {
    case ui.Button.YES:
      gradeInfo = {
        shortName: 'Kinder',
        fullName: 'Nivel de Transición II (Kinder)',
        code: 'NT2'
      };
      break;
    case ui.Button.NO:
      gradeInfo = {
        shortName: 'Pre-Kinder', 
        fullName: 'Nivel de Transición I (Pre-Kinder)',
        code: 'NT1'
      };
      break;
    default:
      return { success: false };
  }

  return { success: true, gradeInfo: gradeInfo };
}

/**
 * Crea un formulario desde el template configurado
 * @param {number} year - Año del formulario
 * @param {Object} gradeInfo - Información del nivel educativo
 * @returns {boolean} Éxito de la operación
 */
function createFormFromTemplate(year, gradeInfo) {
  const dataConfigSheet = getDataConfigSheet();
  if (!dataConfigSheet) return false;

  // ID del formulario template
  const ID_TEMPLATE_FORM = dataConfigSheet.ID_TEMPLATE_FORM;
  if (!ID_TEMPLATE_FORM) {
    SpreadsheetApp.getUi().alert('❌ Error', 'Falta el ID del formulario template en la configuración.\n\nPor favor agregue el campo ID_TEMPLATE_FORM en la hoja de configuración.', SpreadsheetApp.getUi().ButtonSet.OK);
    return false;
  }

  try {
    showToast('📋 Creando Formulario', `Duplicando template para ${gradeInfo.shortName} ${year}...`);

    // Duplicar formulario template SIN especificar nombre (evita "Copy of")
    const templateFile = DriveApp.getFileById(ID_TEMPLATE_FORM);
    const newFormFile = templateFile.makeCopy();

    // Definir el nombre final correcto
    const finalFormTitle = `Ficha de Matrícula Crisolito ${year} - ${gradeInfo.fullName}`;

    // Establecer el nombre correcto del archivo
    newFormFile.setName(finalFormTitle);

    // Obtener o crear carpeta del año
    const yearFolder = getOrCreateYearFolder(year, dataConfigSheet);
    if (yearFolder) {
      // Mover formulario a la carpeta del año
      newFormFile.moveTo(yearFolder);
      showToast('📁 Organizando', `Moviendo formulario a carpeta ${year}...`);
    } else {
      // Fallback: mover a carpeta general de formularios si existe
      const targetFolderId = dataConfigSheet.ID_FOLDER_FORM;
      if (targetFolderId) {
        const targetFolder = DriveApp.getFolderById(targetFolderId);
        newFormFile.moveTo(targetFolder);
      }
    }

    // Procesar plantilla
    const newForm = FormApp.openById(newFormFile.getId());

    // También actualizar el título interno del formulario (por si acaso)
    newForm.setTitle(finalFormTitle);

    processFormTemplate(newForm, year, gradeInfo);

    showSuccessMessage(year, gradeInfo, newForm.getEditUrl(), newForm.getPublishedUrl());
    return true;

  } catch (error) {
    console.error('Error creando formulario:', error);
    SpreadsheetApp.getUi().alert('❌ Error', `No se pudo crear el formulario: ${error.message}`, SpreadsheetApp.getUi().ButtonSet.OK);
    return false;
  }
}

/**
 * Obtiene o crea una carpeta para el año especificado
 * @param {number} year - Año para la carpeta
 * @param {Object} dataConfigSheet - Configuración de datos
 * @returns {GoogleAppsScript.Drive.Folder|null} Carpeta del año o null si hay error
 */
function getOrCreateYearFolder(year, dataConfigSheet) {
  try {
    // Obtener carpeta base de formularios
    const baseFolderId = dataConfigSheet.ID_FOLDER_FORM;
    if (!baseFolderId) {
      console.warn('No se encontró ID_FOLDER_FORM en configuración');
      return null;
    }

    const baseFolder = DriveApp.getFolderById(baseFolderId);
    const yearFolderName = year.toString();

    // Buscar si ya existe la carpeta del año
    const existingFolders = baseFolder.getFoldersByName(yearFolderName);

    if (existingFolders.hasNext()) {
      // La carpeta ya existe
      const yearFolder = existingFolders.next();
      console.log(`✅ Usando carpeta existente: ${yearFolderName}`);
      return yearFolder;
    } else {
      // Crear nueva carpeta para el año
      const yearFolder = baseFolder.createFolder(yearFolderName);
      console.log(`📁 Nueva carpeta creada: ${yearFolderName}`);
      showToast('📁 Carpeta Creada', `Carpeta ${year} creada correctamente`);
      return yearFolder;
    }

  } catch (error) {
    console.error('Error gestionando carpeta del año:', error);
    SpreadsheetApp.getUi().alert('⚠️ Advertencia', `No se pudo crear/acceder a la carpeta del año: ${error.message}\n\nEl formulario se creará en la carpeta principal.`, SpreadsheetApp.getUi().ButtonSet.OK);
    return null;
  }
}

/**
 * Procesa el template del formulario reemplazando tokens
 * @param {GoogleAppsScript.Forms.Form} form - Formulario a procesar
 * @param {number} year - Año a reemplazar
 * @param {Object} gradeInfo - Información del grado
 */
function processFormTemplate(form, year, gradeInfo) {
  // Solo 2 tokens simples
  const tokens = {
    '{{year}}': year.toString(),
    '{{grade}}': gradeInfo.fullName
  };

  showToast('🔄 Procesando Template', 'Reemplazando contenido del formulario...');

  // Procesar título del formulario
  const currentTitle = form.getTitle();
  const newTitle = replaceTokens(currentTitle, tokens);
  form.setTitle(newTitle);

  // Procesar descripción
  const currentDescription = form.getDescription();
  const newDescription = replaceTokens(currentDescription, tokens);
  form.setDescription(newDescription);

  // Procesar todos los elementos del formulario
  const items = form.getItems();
  items.forEach((item, index) => {
    try {
      processFormItem(item, tokens);
    } catch (error) {
      console.error(`Error procesando item ${index}:`, error);
    }
  });

  console.log(`✅ Formulario procesado: ${tokens['{{year}}']} - ${tokens['{{grade}}']}`);
}

/**
 * Procesa un elemento individual del formulario
 * @param {GoogleAppsScript.Forms.Item} item - Elemento del formulario
 * @param {Object} tokens - Tokens de reemplazo
 */
function processFormItem(item, tokens) {
  // Procesar título del item
  const currentTitle = item.getTitle();
  if (currentTitle) {
    const newTitle = replaceTokens(currentTitle, tokens);
    item.setTitle(newTitle);
  }

  // Procesar texto de ayuda
  const currentHelpText = item.getHelpText();
  if (currentHelpText) {
    const newHelpText = replaceTokens(currentHelpText, tokens);
    item.setHelpText(newHelpText);
  }

  // Procesar según tipo de elemento
  const itemType = item.getType();

  if (itemType === FormApp.ItemType.MULTIPLE_CHOICE) {
    processMultipleChoiceItem(item, tokens);
  } else if (itemType === FormApp.ItemType.CHECKBOX) {
    processCheckboxItem(item, tokens);
  } else if (itemType === FormApp.ItemType.LIST) {
    processListItem(item, tokens);
  }
}

/**
 * Procesa elementos de selección múltiple
 * @param {GoogleAppsScript.Forms.Item} item - Elemento del formulario
 * @param {Object} tokens - Tokens de reemplazo
 */
function processMultipleChoiceItem(item, tokens) {
  const multipleChoiceItem = item.asMultipleChoiceItem();
  const choices = multipleChoiceItem.getChoices();
  const newChoices = choices.map(choice => {
    const currentValue = choice.getValue();
    const newValue = replaceTokens(currentValue, tokens);
    return multipleChoiceItem.createChoice(newValue);
  });
  multipleChoiceItem.setChoices(newChoices);
}

/**
 * Procesa elementos de checkbox
 * @param {GoogleAppsScript.Forms.Item} item - Elemento del formulario
 * @param {Object} tokens - Tokens de reemplazo
 */
function processCheckboxItem(item, tokens) {
  const checkboxItem = item.asCheckboxItem();
  const choices = checkboxItem.getChoices();
  const newChoices = choices.map(choice => {
    const currentValue = choice.getValue();
    const newValue = replaceTokens(currentValue, tokens);
    return checkboxItem.createChoice(newValue);
  });
  checkboxItem.setChoices(newChoices);
}

/**
 * Procesa elementos de lista desplegable
 * @param {GoogleAppsScript.Forms.Item} item - Elemento del formulario
 * @param {Object} tokens - Tokens de reemplazo
 */
function processListItem(item, tokens) {
  const listItem = item.asListItem();
  const choices = listItem.getChoices();
  const newChoices = choices.map(choice => {
    const currentValue = choice.getValue();
    const newValue = replaceTokens(currentValue, tokens);
    return listItem.createChoice(newValue);
  });
  listItem.setChoices(newChoices);
}

/**
 * Reemplaza tokens en un texto
 * @param {string} text - Texto a procesar
 * @param {Object} tokens - Tokens de reemplazo
 * @returns {string} Texto con tokens reemplazados
 */
function replaceTokens(text, tokens) {
  if (!text) return text;

  let result = text;

  // Reemplazar {{year}}
  result = result.replace(/\{\{year\}\}/g, tokens['{{year}}']);

  // Reemplazar {{grade}}
  result = result.replace(/\{\{grade\}\}/g, tokens['{{grade}}']);

  return result;
}

/**
 * Crea un sheet para el año correspondiente
 * @param {number} year - Año del formulario
 * @param {string} gradeName - Nombre del grado
 */
function createYearlySheet(year, gradeName) {
  const currentSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = `${year} - Registro ${gradeName}`;

  // Verificar si ya existe
  if (currentSheet.getSheetByName(sheetName)) {
    SpreadsheetApp.getUi().alert('ℹ️ Información', `La hoja "${sheetName}" ya existe.`, SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  try {
    showToast('📊 Creando Sheet', `Configurando hoja para ${gradeName} ${year}...`);

    // Crear copia del sheet actual
    const newSheet = currentSheet.copy(sheetName);

    // Limpiar datos del año anterior
    clearPreviousYearData(newSheet);

    // Actualizar configuración
    updateConfigForNewYear(newSheet, year, gradeName);

    showToast('✅ Sheet Creado', `Hoja "${sheetName}" configurada correctamente.`);

  } catch (error) {
    console.error('Error creando sheet:', error);
    SpreadsheetApp.getUi().alert('⚠️ Advertencia', `No se pudo crear el sheet: ${error.message}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Limpia datos del año anterior en el sheet
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} sheet - Sheet a limpiar
 */
function clearPreviousYearData(sheet) {
  try {
    // Obtener hojas que puedan contener datos
    const responsesSheet = sheet.getSheetByName('Respuestas de formulario 1');
    const backupSheet = sheet.getSheetByName('Hoja de Respaldo');

    // Limpiar hoja de respuestas
    if (responsesSheet && responsesSheet.getLastRow() > 1) {
      responsesSheet.getRange(2, 1, responsesSheet.getLastRow() - 1, responsesSheet.getLastColumn()).clearContent();
      console.log('✅ Datos de respuestas limpiados');
    }

    // Limpiar hoja de respaldo
    if (backupSheet && backupSheet.getLastRow() > 1) {
      backupSheet.getRange(2, 1, backupSheet.getLastRow() - 1, backupSheet.getLastColumn()).clearContent();
      console.log('✅ Datos de respaldo limpiados');
    }

  } catch (error) {
    console.error('Error limpiando datos:', error);
  }
}

/**
 * Actualiza configuración para el nuevo año
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} sheet - Sheet a actualizar
 * @param {number} year - Nuevo año
 * @param {string} gradeName - Nombre del grado
 */
function updateConfigForNewYear(sheet, year, gradeName) {
  try {
    // Aquí puedes agregar lógica específica para actualizar configuraciones
    // Por ejemplo, actualizar fechas, nombres, etc.

    console.log(`✅ Configuración actualizada para ${gradeName} ${year}`);

  } catch (error) {
    console.error('Error actualizando configuración:', error);
  }
}

/**
 * Muestra mensaje de éxito con información del formulario creado
 * @param {number} year - Año del formulario
 * @param {Object} gradeInfo - Información del grado
 * @param {string} formEditUrl - URL de edición del formulario
 * @param {string} formPublicUrl - URL pública del formulario
 */
function showSuccessMessage(year, gradeInfo, formEditUrl, formPublicUrl) {
  const ui = SpreadsheetApp.getUi();

  const message = `✅ ¡Formulario creado exitosamente!

📋 Detalles:
• Año: ${year}
• Nivel: ${gradeInfo.fullName}
• Código: ${gradeInfo.code}

🔗 Enlaces importantes:
• Editor: ${formEditUrl}
• Público: ${formPublicUrl}

📋 Próximos pasos:
1. Revise el formulario generado
2. Configure las respuestas hacia el Sheet
3. Actualice los IDs en la configuración
4. Pruebe el formulario antes de publicar

¿Todo se ve correcto?`;

  ui.alert('🎉 Formulario Creado', message, ui.ButtonSet.OK);

  showToast('🎉 Proceso Completado', `Formulario ${gradeInfo.shortName} ${year} listo para usar.`);
}

/**
 * Función de acceso rápido para crear formulario de Kinder
 * @param {number} year - Año opcional (si no se proporciona, se solicita)
 */
function createKinderForm(year = null) {
  const targetYear = year || new Date().getFullYear();
  const gradeInfo = {
    shortName: 'Kinder',
    fullName: 'Nivel de Transición II (Kinder)',
    code: 'NT2'
  };

  createFormFromTemplate(targetYear, gradeInfo);
}

/**
 * Función de acceso rápido para crear formulario de Pre-Kinder
 * @param {number} year - Año opcional (si no se proporciona, se solicita)
 */
function createPreKinderForm(year = null) {
  const targetYear = year || new Date().getFullYear();
  const gradeInfo = {
    shortName: 'Pre-Kinder',
    fullName: 'Nivel de Transición I (Pre-Kinder)',
    code: 'NT1'
  };

  createFormFromTemplate(targetYear, gradeInfo);
}
