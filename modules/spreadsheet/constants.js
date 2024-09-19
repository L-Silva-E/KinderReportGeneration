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
    'trim': [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 31, 34, 35, 36, 37, 39, 40, 41, 43, 49, 50, 51, 52, 54, 55, 56, 58, 64, 65, 66, 67, 68, 69, 70, 71, 72, 74, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    'capitalize': [4, 5, 6, 34, 49, 64, 78, 81, 84, 88, 92, 96],
    'date': [8],
    'rent': [41, 56, 72],
  }
}
