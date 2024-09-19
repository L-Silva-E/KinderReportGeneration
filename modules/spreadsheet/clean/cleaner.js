function cleanDataRow (sheetData, currentRow) {
  const indexToClean = getRowIndexClean();
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  //~ Eliminando espacios al inicio y final ~//
  indexToClean.trim.forEach((column) => {
    let currentValue = sheetData.getRange(currentRow, column).getValue();
    if (!currentValue) return;

    currentValue = currentValue.trim();
    sheetData.getRange(currentRow, column).setValue(currentValue);
  });


  //~ Capitalización de Nombres ~//
  indexToClean.capitalize.forEach((column) => {
    let currentValue = sheetData.getRange(currentRow, column).getValue();
    if (!currentValue) return;

    currentValue = currentValue.toLowerCase().replace(/(?:^|\s)\S/g, function(word) {
      return word.toUpperCase();
    });

    sheetData.getRange(currentRow, column).setValue(currentValue);
  });


  //~ Fechas ~//
  indexToClean.date.forEach((column) => {
    let currentValue = sheetData.getRange(currentRow, column).getValue();
    if (!currentValue) return;

    let arrayDate = currentValue.split('/');
    if (isNaN(parseInt(arrayDate[1]))) return;
    if (arrayDate[1].length === 1) { arrayDate[1] = '0' + arrayDate[1]; }
    currentValue = arrayDate[1] + '/' + months[parseInt(arrayDate[0]) - 1] + '/' + arrayDate[2];

    sheetData.getRange(currentRow, column).setValue(currentValue);
  });


  //~ Renta ~//
  indexToClean.rent.forEach((column) => {
    let currentValue = sheetData.getRange(currentRow, column).getValue();
    if (!currentValue) return;

    if (currentValue.length === 3) { currentValue += '.000'; }

    sheetData.getRange(currentRow, column).setValue(currentValue);
  });

  return true;
}