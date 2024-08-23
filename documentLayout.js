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
          breakLine: false,
          key:   { text: 'Nacionalidad:', style: 'ParagraphKey' },
          value: { text: data.section_1.nationality, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Lugar de nacimiento:', style: 'ParagraphKey' },
          value: { text: data.section_1.birthPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Domicilio:', style: 'ParagraphKey' },
          value: { text: data.section_1.address, style: 'ParagraphValue' }
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
          key:   { text: 'II. Antecedentes del Hogar del Niño/a', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '¿Quién estará al cuidado cuando no esté en el jardín?', style: 'ParagraphKey' },
          value: { text: data.section_2.whoTakesCaresOfChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Duerme en:', style: 'ParagraphKey' },
          value: { text: data.section_2.childRoom, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_2.childShareRoomWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Posee:', style: 'ParagraphKey' },
          value: { text: data.section_2.childBed, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Con quién comparte:', style: 'ParagraphKey' },
          value: { text: data.section_2.childShareBedWith, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Procedencia escolar:', style: 'ParagraphKey' },
          value: { text: data.section_2.schoolOrigin, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: ' ', style: 'ParagraphKey' },
          value: { text: data.section_2.schoolName, style: 'ParagraphValue' }
        },
        {
          breakLine: false, hasTable: true,
          key:   { text: '¿Con quién vive el niño/a?', style: 'ParagraphKey' },
          value: { text: data.section_2.childLiveWith, style: 'ParagraphValue' }
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
          key:   { text: 'III. Antecedentes de Salud del Niño/a', style: 'Title' },
          value: null
        },
        {
          breakLine: false,
          key:   { text: 'Nacimiento del niño/a:', style: 'ParagraphKey' },
          value: { text: data.section_3.typeBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Peso al nacer:', style: 'ParagraphKey' },
          value: { text: data.section_3.weightBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Complicaciones en el parto:', style: 'ParagraphKey' },
          value: { text: textComplicationsBirth, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a es alérgico?', style: 'ParagraphKey' },
          value: { text: data.section_3.childHasAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Qué alergias presenta?', style: 'ParagraphKey' },
          value: { text: data.section_3.whatAllergies, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Es atendido por algún especialista?', style: 'ParagraphKey' },
          value: { text: data.section_3.childSpecialist, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Sistema de salud al que pertenece el párvulo/a:', style: 'ParagraphKey' },
          value: { text: data.section_3.childHealthSystem, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿El párvulo/a está inscrito en el CESFAM?', style: 'ParagraphKey' },
          value: { text: data.section_3.childInCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿A cuál pertenece?', style: 'ParagraphKey' },
          value: { text: data.section_3.childCesfam, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Mantiene el control del Niño Sano del párvulo/a al día?', style: 'ParagraphKey' },
          value: { text: data.section_3.childWellControl, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Está en alguno de estos tratamientos de salud?', style: 'ParagraphKey' },
          value: { text: data.section_3.childIsTreatment, style: 'ParagraphValue' }
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
          key:   { text: 'IV. Antecedentes Familiares', style: 'Title' },
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
          value: { text: data.section_4.mother.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizada a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_4.mother.authorizedVisit, style: 'ParagraphValue' }
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
          value: { text: data.section_4.father.fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.rut, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.phone, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Estudios:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.study, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_4.father.workingHours, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Vive con el párvulo/a?', style: 'ParagraphKey' },
          value: { text: data.section_4.father.liveWithChild, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Tiene visitas?', style: 'ParagraphKey' },
          value: { text: data.section_4.father.hasVisit, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '¿Entrega aporte monetario?', style: 'ParagraphKey' },
          value: { text: data.section_4.father.monetaryContribution, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Está autorizado a: ¿Retirarlo del jardín?', style: 'ParagraphKey' },
          value: { text: data.section_4.father.authorizedWithdraw, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: '¿Visitarlo al jardín?', style: 'ParagraphKey' },
          value: { text: data.section_4.father.authorizedVisit, style: 'ParagraphValue' }
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
          value: { text: data.section_4.guardian.fullName, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Email:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.email, style: 'ParagraphValueEmail' }
        },
        {
          breakLine: false,
          key:   { text: 'Edad:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.age, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Profesión u oficio:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.occupation, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Lugar de trabajo:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.workPlace, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Renta mensual:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.rent, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Tipo de jornada:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.typeWorkday, style: 'ParagraphValue' }
        },
        {
          breakLine: true, breakPage: true,
          key:   { text: 'Horario laboral:', style: 'ParagraphKey' },
          value: { text: data.section_4.guardian.workingHours, style: 'ParagraphValue' }
        }
      ]
    },
    {
      configuration: {
        type: 'Paragraph'
      },
      values: [
        {
          breakLine: true,
          key:   { text: 'V. Antecedentes Sociales', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '¿El grupo familiar del párvulo/a está inscrito en el "Registro Social de Hogares"?', style: 'ParagraphKey' },
          value: { text: data.section_5.socialHouseholdRegistry, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'El grupo familiar vive en:', style: 'ParagraphKey' },
          value: { text: data.section_5.familyLivesIn, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'El grupo familiar es parte de un Programa de Protección Familiar (PPF):', style: 'ParagraphKey' },
          value: { text: data.section_5.familyHasPpf, style: 'ParagraphValue' }
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
          key:   { text: 'VI. Antecedentes Relevantes', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '1. Contacto de Emergencia', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[0].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[0].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[0].phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '2. Contacto de Emergencia', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[1].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[1].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[1].phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '3. Contacto de Emergencia', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[2].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[2].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: false,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_6.emergencyContact[2].phone, style: 'ParagraphValue' }
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
          key:   { text: 'VII. Antecedentes de adultos autorizados para retirar al Niño/a', style: 'Title' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Personas que pueden retirar al niño/a', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: '1. Retiro Autorizado', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[0].rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[0].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[0].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[0].phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '2. Retiro Autorizado', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[1].rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[1].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[1].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[1].phone, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: '3. Retiro Autorizado', style: 'SubTitle' },
          value: null
        },
        {
          breakLine: true,
          key:   { text: 'Rut:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[2].rut, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Nombre completo:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[2].fullName, style: 'ParagraphValueImportant' }
        },
        {
          breakLine: true,
          key:   { text: 'Parentesco:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[2].kinship, style: 'ParagraphValue' }
        },
        {
          breakLine: true,
          key:   { text: 'Teléfono:', style: 'ParagraphKey' },
          value: { text: data.section_7.authorizedWithdraw[2].phone, style: 'ParagraphValue' }
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
          key:   { text: 'Datos Relevantes:', style: 'SubTitle' },
          value: { text: data.section_7.relevantData, style: 'SubTitle' }
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
          value: { text: formatDate(data.enrollment.date), style: 'EndDate' }
        },
      ]
    }
  ];
}
