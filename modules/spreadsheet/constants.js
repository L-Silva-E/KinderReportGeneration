function styleValues () {
  return {
    Font: {
      Family: 'Century Gothic',
      Size: 10,
      SizeChildName: 14,
      SizeTitles: 11
    },
    ImageFormat: {
      Height: 116,
      Width: 240,
      LeftOffset: 480
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
    SpaceLine: 1.1
  }
}

function cellStateEmoji () {
  return {
    HEADER: 'Estado',
    COPIED: '✏️',
    CLEANED: '🧼',
    GENERATED: '📋',
  }
}

function messageStateEmoji () {
  return {
    DONE: '✅',
    ERROR: '❌',
    WARNING: '⚠️',
    WORKING: '🏗️',
    CONFIGURATION: '⚙️',
  }
}

function getRowIndexClean() {
  return {
    'trim': [5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 32, 36, 37, 38, 39, 40, 42, 43, 44, 46, 52, 53, 54, 55, 56, 57, 58, 59, 61, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102],
    'capitalize': [5, 6, 7, 37, 52, 67, 81, 84, 87, 91, 95, 99],
    'date': [],
    'rent': [44, 59, 75],
  }
}
