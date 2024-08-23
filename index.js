function onOpen() {
  let ui = SpreadsheetApp.getUi();

  ui.createMenu('⚙️ Administración')
    .addItem('⚙️ Configuración Inicial', 'ConfiguracionInicial')
    .addSeparator()
    .addSubMenu(ui.createMenu('📋 Copiado de Datos')
      .addItem('📜 Todos', 'WorkInProgress')
      .addItem('📃 Restantes', 'WorkInProgress')
      .addItem('📄 Específica', 'WorkInProgress')
    )
    .addSubMenu(ui.createMenu('🧹 Limpieza')
      .addItem('🧼 Completa', 'LimpiarValores')
      .addItem('🫧 Filas Restantes', 'LimpiarFilasRestantes')
      .addItem('🧽 Fila Específica', 'LimpiarFila')
      .addItem('🆕 Agregar y Limpiar Filas Nuevas', 'AgregarYLimpiarFilasNuevas')
    )
    .addSubMenu(ui.createMenu('📚 Generar Documentos')
      .addItem('📜 Todos', 'GenerarDocumentos')
      .addItem('📃 Restantes', 'GenerarRestantes')
      .addItem('📄 Específico', 'GenerarUnDocumento')
    )
    .addToUi();
}

//~ Configuration ~//
function ConfiguracionInicial() { createConfigSheet() }

//~ Clean Values ~//
function LimpiarValores() { cleanValues() }
function LimpiarFilasRestantes() { cleanPendingRows() }
function LimpiarFila() { cleanRow() }
function AgregarYLimpiarFilasNuevas() { addAndCleanNewRows() }


//~ Generate Documents ~//
function GenerarDocumentos() { generateAllDocuments() }
function GenerarRestantes() { generatePendingDocuments() }
function GenerarUnDocumento() { generateOneDocument() }

//~ Work In Progress ~//
function WorkInProgress() {
  showMessage('🚧 En Construcción 🚧', 'Esta función aún no está disponible');
}