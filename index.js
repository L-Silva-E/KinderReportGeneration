function onOpen() {
  let ui = SpreadsheetApp.getUi();

  ui.createMenu('⚙️ Administración')
    .addItem('⚙️ Configuración Inicial', 'ConfiguracionInicial')
    .addSeparator()
    .addSubMenu(ui.createMenu('✏️ Copiado de Filas')
      .addItem('✴️ Completa', 'CopiarFilas')
      .addItem('⤵️ Filas Restantes', 'CopiarFilasRestantes')
      .addItem('1️⃣ Fila Específica', 'CopiarFilaEspecifica')
    )
    .addSubMenu(ui.createMenu('🧼 Limpieza de Filas')
      .addItem('🫧 Completa', 'LimpiarFilas')
      .addItem('🧹 Filas Restantes', 'LimpiarFilasRestantes')
      .addItem('🧽 Fila Específica', 'LimpiarFilaEspecifica')
    )
    .addSubMenu(ui.createMenu('🗃️ Generar Documentos')
      .addItem('🗂️ Todos', 'GenerarDocumentos')
      .addItem('📚 Restantes', 'GenerarDocumentosRestantes')
      .addItem('📕 Específico', 'GenerarDocumentoEspecifico')
    )
    .addToUi();
}

//~ Configuration ~//
function ConfiguracionInicial() { createConfigSheet() }


//~ Copy Data ~//
function CopiarFilas() { copyAllRows() }
function CopiarFilasRestantes() { copyPendingRows() }
function CopiarFilaEspecifica() { copySpecificRow() }


//~ Clean Values ~//
function LimpiarFilas() { cleanAllRows() }
function LimpiarFilasRestantes() { cleanPendingRows() }
function LimpiarFilaEspecifica() { cleanSpecificRow() }
function AgregarYLimpiarFilasNuevas() { addAndCleanNewRows() }


//~ Generate Documents ~//
function GenerarDocumentos() { generateAllDocuments() }
function GenerarDocumentosRestantes() { generatePendingDocuments() }
function GenerarDocumentoEspecifico() { generateSpecificDocument() }


//~ Work In Progress ~//
function WorkInProgress() {
  showMessage('🚧 En Construcción 🚧', 'Esta función aún no está disponible');
}
