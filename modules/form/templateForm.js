function getDescriptionForm() {
  return `Crisolito te invita a formar parte de nuestra comunidad escolar, periodo 2025
Este formulario tiene como objetivo principal recopilar antecedentes para ficha de matrícula 2025.

Nuestros niveles son:
  • Pre kínder (NT1): 4 años cumplidos al 31 de marzo del 2025
  • Kínder (NT2): 5 años cumplidos al 31 de marzo del 2025

Nuestro canales oficiales de comunicación son:
  • Correo electrónico jardininfantilcrisolito@gmail.com
  • Contacto telefónico y WhatsApp institucional +569 7339 7450

Envíar el certificado de nacimiento al correo: jardininfantilcrisolito@gmail.com`;
}

function getTermsAndConditions() {
  return `  1. Escuela de Párvulos Crisolito forma parte del programa de Subvención Escolar Preferencial (SEP)
  2. Durante el mes de Marzo se compartirá con la comunidad Escolar: Reglamento Interno de Convivencia Escolar, Proyecto Institucional, Reglamento de promoción y evaluación y planes normativos.
  3. El MINEDUC, hace entrega de forma gratuita de Texto de estudio Ministerial.
  4. Nuestro establecimiento cuenta con Instagram institucional, donde se comparte con la comunidad escolar diversas experiencias pedagógicas y actividades realizadas con los estudiantes y comunidad educativa.

AUTORIZO
  1. A que mi pupilo(a) realice salidas pedagógicas por el entorno, en horario de clases.
  2. A que las fotos donde mi pupilo(a) aparezca durante las experiencias pedagógicas o actividades con la comunidad educativa, puedan ser compartidas en la Página Web u otras de la institución.

Nuestros canales oficiales de comunicación son:
  • Correo electrónico jardininfantilcrisolito@gmail.com
  • Contacto telefónico y WhatsApp institucional +569 7339 7450`;
}

function getItemTypes() {
  return {
    TEXT: 'Text',
    PARAGRAPH_TEXT: 'ParagraphText',
    MULTIPLE_CHOICE: 'MultipleChoice',
    DATE: 'Date',
    PAGE_BREAK: 'PageBreak',
    SECTION_HEADER: 'SectionHeader',
  };
}

function getTemplateForm() {
  const itemTypes = getItemTypes();
  const termsAndConditions = getTermsAndConditions();

  return [
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Usted desea matricular en:',
      'choices': ['Jornada de Mañana', 'Jornada de Tarde'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿Usted desea postular al beneficio de extensión horaria?',
      'helpText': 'En el siguiente link, encontrará un documento con información del beneficio:\nBeneficio de Extensión Horaria',
      'choices': ['Sí', 'No'],
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'I. Antecedentes Personales del Párvulo/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Apellido Paterno del niño/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Apellido Materno del niño/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Nombres del niño/a',
    },
    {
      'type': itemTypes.DATE,
      'required': true,
      'title': 'Fecha de nacimiento',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Lugar de nacimiento',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Nacionalidad del niño/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Rut del niño/a',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Edad del niño/a al 31 de Marzo de 2025',
      'helpText': 'Ejemplo: 4 años 3 meses',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Dirección del domicilio',
      'helpText': '(Calle, N° de casa y pasaje/ N° de block, departamento, Sector y Comuna)',
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'II. Antecedentes del Hogar del Niño/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '¿Con quién vive el niño/a?',
      'helpText': 'Indicar parentesco y números de personas\nEjemplo: Vive con padre, madre y hermana menor, total 4 personas',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': '¿Quién estará al cuidado del párvulo/a cuando no esté en el jardín?',
      'helpText': 'Indicar nombre completo y parentesco',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'El párvulo/a duerme en',
      'choices': ['Dormitorio solo', 'Dormitorio compartido'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'En caso de compartir dormitorio, indicar con quién comparte',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'El párvulo/a posee',
      'choices': ['Cama solo/a', 'Cama compartida'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'En caso de compartir cama, indicar con quién comparte',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'Procedencia Escolar',
      'choices': ['Escuela de Lenguaje', 'Jardín', 'Hogar', 'Otro'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Nombre del establecimiento educacional de procedencia',
      'helpText': 'Responder solo si el párvulo/a viene de un establecimiento educacional',
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'III. Antecedentes de Salud del Niño/a',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'Nacimiento del niño/a',
      'choices': ['Normal', 'Prematuro', 'Tardío'],
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Peso al nacer',
      'helpText': 'En kilogramos (kg), ej: 3.5',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'Complicaciones en el parto',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.PARAGRAPH_TEXT,
      'required': false,
      'title': 'Si su respuesta anterior fue un "Sí", especificar cuáles fueron las complicaciones',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿El párvulo/a es alérgico?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Si su respuesta anterior fue un "Sí", especificar que alergia presenta',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿El párvulo/a es atendido por alguno de estos especialistas?',
      'choices': ['Fonoaudiólogo', 'Terapeuta ocupacional', 'Neurólogo', 'Psicólogo', 'No está derivado a ninguno de estos especialistas'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Si su respuesta anterior fue algún especialista\n¿En dónde es atendido por un especialista?',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': 'Sistema de salud al que pertenece el párvulo/a',
      'choices': ['FONASA', 'ISAPRE', 'Otro'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿El párvulo/a está inscrito en el Centro de Salud Familiar de su sector?',
      'helpText': '(CESFAM)',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Si su respuesta anterior fue un "Sí", indique a cuál CESFAM pertenece',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿Mantiene el control del Niño Sano del párvulo/a al día?',
      'choices': ['Si', 'No', 'No lo sé'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿Está en alguno de estos tratamientos de salud?',
      'choices': ['Oído', 'Ojos', 'Dientes', 'Pie', 'Cadera', 'Otro', 'No está en tratamiento'],
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'IV. Antecedentes Familiares',
      'helpText': '1) Datos de la Madre',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Nombre completo',
      'helpText': 'Nombres y Apellidos',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Número telefónico',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Edad',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Estudios',
      'choices': ['Básica Completa', 'Media Completa', 'Técnico Completa', 'Universitario Completa'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Profesión u Oficio',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Lugar de trabajo',
      'helpText': 'Si actualmente no se encuentra con trabajo, colocar "Cesante"',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Renta mensual',
      'helpText': 'Renta aproximada',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'En caso de estar trabajando, indicar tipo jornada laboral',
      'choices': ['Parcial', 'Turnos', 'Completa'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'En caso de estar trabajando, indicar horario laboral',
      'helpText': 'Ejemplo: De 9:00 a 17:00 horas',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿La madre vive con el párvulo?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Si su respuesta anterior fue un "No"\n¿Tiene visitas?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'En caso de no vivir con el niño/a\n¿Entrega aporte monetario?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿La madre está autorizada para retirar al párvulo/a del jardín?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿La madre está autorizada para visitar al párvulo/a en el jardín?',
      'choices': ['Si', 'No'],
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'IV. Antecedentes Familiares',
      'helpText': '2) Datos del Padre',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Nombre completo',
      'helpText': 'Nombres y Apellidos',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Número telefónico',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Edad',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Estudios',
      'choices': ['Básica Completa', 'Media Completa', 'Técnico Completa', 'Universitario Completa'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Profesión u Oficio',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Lugar de trabajo',
      'helpText': 'Si actualmente no se encuentra con trabajo, colocar "Cesante"',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Renta mensual',
      'helpText': 'Renta aproximada',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'En caso de estar trabajando, indicar tipo jornada laboral',
      'choices': ['Parcial', 'Turnos', 'Completa'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'En caso de estar trabajando, indicar horario laboral',
      'helpText': 'Ejemplo: De 9:00 a 17:00 horas',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿El padre vive con el párvulo?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Si su respuesta anterior fue un "No"\n¿Tiene visitas?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'En caso de no vivir con el niño/a\n¿Entrega aporte monetario?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿El padre está autorizado para retirar al párvulo/a del jardín?',
      'choices': ['Si', 'No'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': '¿El padre está autorizado para visitar al párvulo/a en el jardín?',
      'choices': ['Si', 'No'],
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'IV. Antecedentes Familiares',
      'helpText': '3) Datos del Apoderado',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Nombre completo',
      'helpText': 'Nombres y Apellidos',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Parentesco con el párvulo/a',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Número telefónico',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Correo electrónico',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Edad',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Profesión u Oficio',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': 'Lugar de trabajo',
      'helpText': 'Si actualmente no se encuentra con trabajo, colocar "Cesante"',
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'Renta mensual',
      'helpText': 'Renta aproximada',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'En caso de estar trabajando, indicar tipo jornada laboral',
      'choices': ['Parcial', 'Turnos', 'Completa'],
    },
    {
      'type': itemTypes.TEXT,
      'required': false,
      'title': 'En caso de estar trabajando, indicar horario laboral',
      'helpText': 'Ejemplo: De 9:00 a 17:00 horas',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'En caso de que el apoderado no sea familiar directo (Padre / Madre), indicar parentesco, junto con enviar el "Documento de Tutela" o "Cuidado Personal" al siguiente correo:\nnjardininfantilcrisolito@gmail.com',
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'V. Antecedentes Sociales',
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': true,
      'title': '¿El grupo familiar del párvulo/a está inscrito en el "Registro Social de Hogares"?',
      'choices': ['Si', 'No', 'No Sabe'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'El grupo familiar vive en:',
      'choices': ['Vivienda propia', 'Vivienda arrendada', 'Vivienda compartida'],
    },
    {
      'type': itemTypes.MULTIPLE_CHOICE,
      'required': false,
      'title': 'Su grupo familiar pertenece a Programa De Prevención Focalizada en niños (PPF)',
      'choices': ['Si', 'No'],
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'VI. Antecedentes Relevantes',
      'helpText': 'Indicar contactos de emergencia del niño/a\n(3 personas como máximo)',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Contacto N°1',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Contacto N°2',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Contacto N°3',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
//!=================================================================================================
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'VII. Antecedentes de adultos autorizados para retirar al Niño/a',
      'helpText': 'Indicar personas que pueden retirar al niño/a\n(3 personas como máximo)',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Persona N°1',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '1. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Persona N°2',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '2. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'title': 'Persona N°3',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Rut',
      'helpText': 'Con puntos y guión',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Nombre Completo',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Parentesco',
    },
    {
      'type': itemTypes.TEXT,
      'required': true,
      'title': '3. Teléfono',
      'helpText': 'Ejemplo: +569xxxxxxxx',
    },
    {
      'type': itemTypes.PARAGRAPH_TEXT,
      'title': 'Datos relevantes que usted considere importante dar a conocer al Jardín Infantil',
    },
    {
      'type': itemTypes.PAGE_BREAK,
      'title': 'Al completar este formulario estoy en conocimiento de:',
    },
    {
      'type': itemTypes.SECTION_HEADER,
      'helpText': termsAndConditions,
    },
  ];
}
