function getDataSpreadsheet(sheetData, row) {
  return {
    'enrollment': {
      'date': sheetData.getRange(row, 2).getValue(),
      'type': sheetData.getRange(row, 3).getValue(),
      'applyBenefitExtendedHours': sheetData.getRange(row, 4).getValue(),
    },
    'section_1': {
      'fatherLastName': sheetData.getRange(row, 5).getValue(),
      'motherLastName': sheetData.getRange(row, 6).getValue(),
      'names': sheetData.getRange(row, 7).getValue(),
      'birthday': sheetData.getRange(row, 8).getValue(),
      'birthPlace': sheetData.getRange(row, 9).getValue(),
      'nationality': sheetData.getRange(row, 10).getValue(),
      'rut': sheetData.getRange(row, 11).getValue(),
      'age': sheetData.getRange(row, 12).getValue(),
      'address': sheetData.getRange(row, 13).getValue()
    },
    'section_2': {
      'childLiveWith': sheetData.getRange(row, 14).getValue(),
      'whoTakesCaresOfChild': sheetData.getRange(row, 15).getValue(),
      'childRoom': sheetData.getRange(row, 16).getValue(),
      'childShareRoomWith': sheetData.getRange(row, 17).getValue(),
      'childBed': sheetData.getRange(row, 18).getValue(),
      'childShareBedWith': sheetData.getRange(row, 19).getValue(),
      'schoolOrigin': sheetData.getRange(row, 20).getValue(),
      'schoolName': sheetData.getRange(row, 21).getValue(),
    },
    'section_3': {
      'typeBirth': sheetData.getRange(row, 22).getValue(),
      'weightBirth': sheetData.getRange(row, 23).getValue(),
      'complicationsBirth': sheetData.getRange(row, 24).getValue(),
      'whatComplications': sheetData.getRange(row, 25).getValue(),
      'childHasAllergies': sheetData.getRange(row, 26).getValue(),
      'whatAllergies': sheetData.getRange(row, 27).getValue(),
      'childSpecialist': sheetData.getRange(row, 28).getValue(),
      'childWhatSpecialist' : sheetData.getRange(row, 29).getValue(),
      'childHealthSystem': sheetData.getRange(row, 30).getValue(),
      'childInCesfam': sheetData.getRange(row, 31).getValue(),
      'childCesfam': sheetData.getRange(row, 32).getValue(),
      'childWellControl': sheetData.getRange(row, 33).getValue(),
      'childIsTreatment': sheetData.getRange(row, 34).getValue(),
    },
    'section_4': {
      'mother': {
        'fullName': sheetData.getRange(row, 35).getValue(),
        'rut': sheetData.getRange(row, 36).getValue(),
        'phone': sheetData.getRange(row, 37).getValue(),
        'age': sheetData.getRange(row, 38).getValue(),
        'study': sheetData.getRange(row, 39).getValue(),
        'occupation': sheetData.getRange(row, 40).getValue(),
        'workPlace': sheetData.getRange(row, 41).getValue(),
        'rent': sheetData.getRange(row, 42).getValue(),
        'typeWorkday': sheetData.getRange(row, 43).getValue(),
        'workingHours': sheetData.getRange(row, 44).getValue(),
        'liveWithChild': sheetData.getRange(row, 45).getValue(),
        'hasVisit': sheetData.getRange(row, 46).getValue(),
        'monetaryContribution': sheetData.getRange(row, 47).getValue(),
        'authorizedWithdraw': sheetData.getRange(row, 48).getValue(),
        'authorizedVisit': sheetData.getRange(row, 49).getValue(),
      },
      'father': {
        'fullName': sheetData.getRange(row, 50).getValue(),
        'rut': sheetData.getRange(row, 51).getValue(),
        'phone': sheetData.getRange(row, 52).getValue(),
        'age': sheetData.getRange(row, 53).getValue(),
        'study': sheetData.getRange(row, 54).getValue(),
        'occupation': sheetData.getRange(row, 55).getValue(),
        'workPlace': sheetData.getRange(row, 56).getValue(),
        'rent': sheetData.getRange(row, 57).getValue(),
        'typeWorkday': sheetData.getRange(row, 58).getValue(),
        'workingHours': sheetData.getRange(row, 59).getValue(),
        'liveWithChild': sheetData.getRange(row, 60).getValue(),
        'hasVisit': sheetData.getRange(row, 61).getValue(),
        'monetaryContribution': sheetData.getRange(row, 62).getValue(),
        'authorizedWithdraw': sheetData.getRange(row, 63).getValue(),
        'authorizedVisit': sheetData.getRange(row, 64).getValue(),
      },
      'guardian': {
        'fullName': sheetData.getRange(row, 65).getValue(),
        'rut': sheetData.getRange(row, 66).getValue(),
        'kinship': sheetData.getRange(row, 67).getValue(),
        'phone': sheetData.getRange(row, 68).getValue(),
        'email': sheetData.getRange(row, 69).getValue(),
        'age': sheetData.getRange(row, 70).getValue(),
        'occupation': sheetData.getRange(row, 71).getValue(),
        'workPlace': sheetData.getRange(row, 72).getValue(),
        'rent': sheetData.getRange(row, 73).getValue(),
        'typeWorkday': sheetData.getRange(row, 74).getValue(),
        'workingHours': sheetData.getRange(row, 75).getValue(),
      }
    },
    'section_5': {
      'socialHouseholdRegistry': sheetData.getRange(row, 76).getValue(),
      'familyLivesIn': sheetData.getRange(row, 77).getValue(),
      'familyHasPpf': sheetData.getRange(row, 78).getValue(),
    },
    'section_6': {
      'emergencyContact': [
        {
          'fullName': sheetData.getRange(row, 79).getValue(),
          'kinship': sheetData.getRange(row, 80).getValue(),
          'phone': sheetData.getRange(row, 81).getValue(),
        },
        {
          'fullName': sheetData.getRange(row, 82).getValue(),
          'kinship': sheetData.getRange(row, 83).getValue(),
          'phone': sheetData.getRange(row, 84).getValue(),
        },
        {
          'fullName': sheetData.getRange(row, 85).getValue(),
          'kinship': sheetData.getRange(row, 86).getValue(),
          'phone': sheetData.getRange(row, 87).getValue(),
        },
      ]
    },
    'section_7': {
      'authorizedWithdraw': [
        {
          'rut': sheetData.getRange(row, 88).getValue(),
          'fullName': sheetData.getRange(row, 89).getValue(),
          'kinship': sheetData.getRange(row, 90).getValue(),
          'phone': sheetData.getRange(row, 91).getValue(),
        },
        {
          'rut': sheetData.getRange(row, 92).getValue(),
          'fullName': sheetData.getRange(row, 93).getValue(),
          'kinship': sheetData.getRange(row, 94).getValue(),
          'phone': sheetData.getRange(row, 95).getValue(),
        },
        {
          'rut': sheetData.getRange(row, 96).getValue(),
          'fullName': sheetData.getRange(row, 97).getValue(),
          'kinship': sheetData.getRange(row, 98).getValue(),
          'phone': sheetData.getRange(row, 99).getValue(),
        },
      ],
      'relevantData': sheetData.getRange(row, 100).getValue(),
    },
  }
}

function getIndexCleanKinder() {
  return {
    'capitalize': [4, 5, 6, 34, 49, 64, 78, 81, 84, 88, 92, 96],
    'date': [7],
    'rent': [41, 56, 72],
  }
}
