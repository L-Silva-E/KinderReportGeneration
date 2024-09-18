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

function cellStateValue () {
  return {
    HEADER: 'Estado',
    COPIED: '✏️',
    CLEANED: '🧼',
    GENERATED: '📋',
  }
}