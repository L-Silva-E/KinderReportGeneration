function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙️ Administración')
    .addItem('🧼 Limpiar Valores', 'LimpiarValores')
    .addItem('🧽 Limpiar Filas Restantes', 'LimpiarFilasRestantes')
    .addItem('🧹 Limpiar Fila', 'LimpiarFila')
    .addItem('✍️ Agregar y Limpiar Filas Nuevas', 'AgregarYLimpiarFilasNuevas')
    .addItem('📑 Generar Documentos', 'GenerarDocumentos')
    .addItem('📃 Generar Documentos Restantes', 'GenerarRestantes')
    .addItem('📄 Generar 1 Documento', 'GenerarUnDocumento')
    .addToUi();
}

//~ Clean Values ~//
function LimpiarValores() { cleanValues() }
function LimpiarFilasRestantes() { cleanPendingRows() }
function LimpiarFila() { cleanRow() }
function AgregarYLimpiarFilasNuevas() { addAndCleanNewRows() }


//~ Generate Documents ~//
function GenerarDocumentos() { generateAllDocuments() }
function GenerarRestantes() { generatePendingDocuments() }
function GenerarUnDocumento() { generateOneDocument() }
