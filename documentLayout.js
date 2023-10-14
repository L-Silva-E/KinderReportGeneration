function documentLayout(data, titleHeader, currentGrade, childFullName, textComplicationsBirth) {
  return [
    {
      configuration: {
        type: 'Header'
      },
      values: [
        {
          breakLine: false,
          key:   { text: titleHeader, style: 'Header' },
          value: null
        }
      ]
    },
    {
      configuration: {
        type: 'Header'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'N° de Registro ______', style: 'SubHeader' },
          value: null
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'I. Antecedentes Personales del Párvulo/a', style: 'Title' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Curso:', style: 'ParagraphKey' },
          value: { text: currentGrade, style: 'ParagraphFullImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Nombre:', style: 'ParagraphKey' },
          value: { text: childFullName, style: 'ParagraphValueChildName' }
        },
        {
          breakLine: false,
          key:   { text: 'RUT:', style: 'ParagraphKey' },
          value: { text: data.section_1.rut, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Fecha de nacimiento:', style: 'ParagraphKey' },
          value: { text: data.section_1.birthday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Edad al 31/03:', style: 'ParagraphKey' },
          value: { text: data.section_1.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Lugar de nacimiento:', style: 'ParagraphKey' },
          value: { text: data.section_1.birthPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Domicilio:', style: 'ParagraphKey' },
          value: { text: data.section_1.address, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Con quién vive el niño/a?', style: 'ParagraphKey' },
          value: { text: data.section_1.childLiveWith, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Quién estará al cuidado cuando no esté en el jardín?', style: 'ParagraphKey' },
          value: { text: data.section_1.whoTakesCaresOfChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Duerme en:', style: 'ParagraphKey' },
          value: { text: data.section_1.childRoom, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_1.childShareRoomWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Posee:', style: 'ParagraphKey' },
          value: { text: data.section_1.childBed, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_1.childShareBedWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Procedencia escolar:', style: 'ParagraphKey' },
          value: { text: data.section_1.schoolOrigin, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: ' ', style: 'ParagraphKey' },
          value: { text: data.section_1.schoolName, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'II. Antecedentes de Salud del Niño/a', style: 'Title' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nacimiento del niño/a:', style: 'ParagraphKey' },
          value: { text: data.section_2.typeBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Peso al nacer:', style: 'ParagraphKey' },
          value: { text: data.section_2.weightBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Complicaciones en el parto:', style: 'ParagraphKey' },
          value: { text: textComplicationsBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a es alérgico?', style: 'ParagraphKey' },
          value: { text: data.section_2.childHasAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Qué alergias presenta?', style: 'ParagraphKey' },
          value: { text: data.section_2.whatAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Es atendido por algún especialista?', style: 'ParagraphKey' },
          value: { text: data.section_2.childSpecialist, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Sistema de salud al que pertenece el párvulo/a:', style: 'ParagraphKey' },
          value: { text: data.section_2.childHealthSystem, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a está inscrito en el CESFAM?', style: 'ParagraphKey' },
          value: { text: data.section_2.childInCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿A cuál pertenece?', style: 'ParagraphKey' },
          value: { text: data.section_2.childCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Mantiene el control del Niño Sano del párvulo/a al día?', style: 'ParagraphKey' },
          value: { text: data.section_2.childWellControl, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Está en alguno de estos tratamientos de salud?', style: 'ParagraphKey' },
          value: { text: data.section_2.childIsTreatment, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'III. Antecedentes Familiares', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '1. Datos de la Madre', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizada a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.mother.authorizedVisit, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: '2. Datos del Padre', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.father.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizado a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_3.father.authorizedVisit, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: '3. Datos del Apoderado', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.fullName, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Email:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.email, style: 'ParagraphValueEmail' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Documento de tutela:', style: 'ParagraphKey' },
          value: { text: data.section_3.guardian.guardianshipDocument, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'IV. Antecedentes Sociales', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '¿El grupo familiar del párvulo/a está inscrito en el "Registro Social de Hogares"?', style: 'ParagraphKey' },
          value: { text: data.section_4.socialHouseholdRegistry, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'El grupo familiar vive en:', style: 'ParagraphKey' },
          value: { text: data.section_4.familyLivesIn, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 1:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact1, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 2:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact2, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono emergencia 3:', style: 'ParagraphKey' },
          value: { text: data.section_4.emergencyContact3, style: 'ParagraphValue' }
        },
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'Matriculado por Tía: ________________________ Firma Apoderado: ________________________', style: 'SubTitle' },
          value: null
        }
      ]
    },
    {
      configuration: {
        type: 'EndDate'
      },
      values: [
        {
          breakLine: false,
          key:   { text: 'Fecha: ', style: 'EndDate' },
          value: { text: formatDate(), style: 'EndDate' }
        },
      ]
    }
  ];
}
