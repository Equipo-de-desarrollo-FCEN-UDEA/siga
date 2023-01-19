import { DevelopmentPlan } from '@interfaces/application/full_time/development-plan';

export interface Objetivo {
    descripcion: string;
    acciones: string[];
    indicadores?: string[];
}

export interface Tema {
    titulo: string;
    subtitulo: string;
    objetivos?: Objetivo[];
}
let developmentplan= {topics:[{
    "id": 0,
    "title": "Formación integral de ciudadanos con la articulación y el desarrollo de las funciones misionales, desde los territorios y en conexión con el mundo",
    "subtitle": "Una universidad humanista, de investigación e innovadora, conectada con el mundo y comprometida con la transformación de sí misma y de la sociedad.",
    "objectives": [
      {
        "id": 1,
        "description": "Articular la investigación y la extensión a la docencia para la formación integral de excelencia académica. ",
        "actions": [
          {
            "id": 1,
            "description": "Formación integral y humanista comprometida con la construcción de paz, la democracia, la justicia social, el bienestar y la responsabilidad con el ambiente y la biodiversidad."
          },
          {
            "id": 2,
            "description": "Políticas curriculares, con didácticas y pedagogías actualizadas, que atiendan al principio de excelencia académica a través del desarrollo de las disciplinas y las profesiones, la integración de saberes, la solución de problemas y la integración de los egresados a la sociedad."
          },
          {
            "id": 3,
            "description": "Programas de posgrado y pregrado que interroguen problemas globales y locales, así como disciplinares."
          },
          {
            "id": 4,
            "description": "Cobertura de posgrados aumentada con criterios de excelencia académica."
          },
          {
            "id": 5,
            "description": "Comunidades académicas consolidadas para, desde y con los territorios."
          },
          {
            "id": 6,
            "description": "Procesos de internacionalización implementados con una visión geopolítica, que conecten la Universidad con el mundo y le permitan posicionarse como destino y referente académico."
          },
          {
            "id": 7,
            "description": "Procesos de autoevaluación instaurados como cultura universitaria, con planes de mejoramiento en los procesos académicos."
          }
        ],
        "indicators": [
          {
            "id": 1,
            "description": "Número de cursos de pregrado que integren o combinen asignaturas en distintas modalidades. Desarrollo de las funciones misionales, desde los territorios y enconexión con el mundo."
          },
          {
            "id": 2,
            "description": "Número de programas depregrado que esten en armonización curricular."
          },
          {
            "id": 3,
            "description": "Número de estrategias didacticas innovadoras aplicadas en los programas de pregrado y posgrado en correspondencia con los cambios en los entornos de aprendizaje. "
          },
          {
            "id": 4,
            "description": "Número de integrantes de la comunidad universitaria participando en la nueva plataformade fortalecimiento de capacidades en internacionalización, interculturalidad y ciudadania global. "
          },
          {
            "id": 5,
            "description": "Número de aliados estratégicos internacionales con los que se realizan actividades de cooperaci6n cientifica, docente y de extension por ario. "
          },
          {
            "id": 6,
            "description": "Número de participantes en los cursos ofertados en el marco de formación complementaria, deportiva, cultural y de Bienestar. "
          },
          {
            "id": 7,
            "description": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 8,
            "description": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 9,
            "description": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 10,
            "description": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 11,
            "description": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 12,
            "description": "Número proyectos de innovación social. "
          }
        ]
      },
      {
        "id": 2,
        "description": "Fortalecer todas las expresiones de las artes y las culturas, que posicionen a la Universidad como referente humanista y cultural para el encuentro y el intercambio de la comunidad universitaria y la sociedad.",
        "actions": [
          {
            "id": 8,
            "description": "Políticas y estrategias de cultura, implementadas."
          },
          {
            "id": 9,
            "description": "Acciones artísticas y culturales integradas en el desarrollo de las funciones misionales."
          },
          {
            "id": 10,
            "description": "Estrategias realizadas para la creación e investigación artística y cultural."
          },
          {
            "id": 11,
            "description": "Actividades interculturales desarrolladas en los territorios."
          }
        ],
        "indicators": [
          {
            "id": 13,
            "description": "Número de eventos culturales y de patrimonio realizados en la Universidad. "
          },
          {
            "id": 14,
            "description": "Número de beneficiarios de la actividad cultural y de patrimonio universitaria. "
          }
        ]
      },
      {
        "id": 3,
        "description": "Potenciar sus patrimonios en función del desarrollo científico y cultural de la sociedad, en los territorios.",
        "actions": [
          {
            "id": 12,
            "description": "Investigación desarrollada sobre patrimonios."
          },
          {
            "id": 13,
            "description": "Política orgánica de los patrimonios universitarios, implementada."
          },
          {
            "id": 14,
            "description": "Patrimonios conservados, documentados, registrados, divulgados y visibilizados."
          },
          {
            "id": 15,
            "description": "Estrategias para la apropiación de los patrimonios, desarrolladas en sintonía con la diversidad territorial."
          }
        ],
        "indicators": [
          {
            "id": 15,
            "description": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 16,
            "description": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 17,
            "description": "Número departicipaciones de losestudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 18,
            "description": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 19,
            "description": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 20,
            "description": "Número proyectos de innovaci6n social. "
          },
          {
            "id": 21,
            "description": "Número de eventos culturales y de patrimonio realizados en la Universidad. "
          },
          {
            "id": 22,
            "description": "Número de beneficiarios de la actividad cultural y de patrimonio universitaria. "
          }
        ]
      },
      {
        "id": 4,
        "description": "Fomentar el avance y la diversidad en la generación, aplicación y apropiación del conocimiento.",
        "actions": [
          {
            "id": 16,
            "description": "Política implementada para el reconocimiento de las diferentes formas organizativas de producción de conocimiento."
          },
          {
            "id": 17,
            "description": "Estrategias para la generación de conocimiento, diversificadas mediante la interculturalidad y el diálogo de saberes."
          },
          {
            "id": 18,
            "description": "Productos de conocimiento reconocidos y valorados de acuerdo con las singularidades disciplinares, contextuales y epistemológicas."
          },
          {
            "id": 19,
            "description": "Estrategias instauradas para el fomento de redes de investigación interdisciplinarias, transdisciplinarias e interculturales."
          },
          {
            "id": 20,
            "description": "Política y estrategias de la ciencia abierta*, implementadas en equilibrio con los criterios de propiedad intelectual respecto de publicaciones, datos, metodologías, métricas y herramientas."
          },
          {
            "id": 21,
            "description": "Estrategias desarrolladas para la apropiación social del conocimiento, y el diálogo de saberes."
          },
          {
            "id": 22,
            "description": "Procesos implementados de difusión, divulgación y visibilización del conocimiento."
          }
        ],
        "indicators": [
          {
            "id": 23,
            "description": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 24,
            "description": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 25,
            "description": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 26,
            "description": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 27,
            "description": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 28,
            "description": "Número proyectos de innovación social. "
          }
        ]
      },
      {
        "id": 5,
        "description": "Fomentar la innovación para la comprensión y solución de problemas y la potenciación de capacidades hacia la transformación de la Universidad y de los territorios.",
        "actions": [
          {
            "id": 23,
            "description": "Relación fortalecida de la Universidad con la sociedad para el mejoramiento de las condiciones de vida en el marco de un enfoque territorial."
          },
          {
            "id": 24,
            "description": "Prácticas de cocreación, colaboración y coproducción del conocimiento, promovidas a partir de la interrelación con la sociedad, las empresas y el estado"
          },
          {
            "id": 25,
            "description": "Nuevos proyectos y productos de innovación, desarrollados a partir de resultados de procesos de investigación y docencia."
          },
          {
            "id": 26,
            "description": "Estrategias desarrolladas de emprendimiento basado en conocimiento."
          },
          {
            "id": 27,
            "description": "Procesos de participación de la Universidad en el ciclo de las políticas públicas, implementados en función del desarrollo y fomento de la ciencia, la tecnología y la innovación."
          }
        ],
        "indicators": [
          {
            "id": 29,
            "description": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 30,
            "description": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 31,
            "description": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 32,
            "description": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 33,
            "description": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 34,
            "description": "Número proyectos de innovación social. "
          }
        ]
      }
    ]
  }, {
    "id": 1,
    "title": "Ciclos de vida de la comunidad universitaria",
    "subtitle": "Encuentro de proyectos de vida y diálogos de saberes.",
    "objectives": [
      {
        "id": 6,
        "description": "Contribuir a la formación integral de los estudiantes como aporte de la Universidad a la sociedad.",
        "actions": [
          {
            "id": 28,
            "description": "Estrategias caracterizadas y consolidadas de articulación con los niveles de educación precedente, hacia la mejora de la calidad académica."
          },
          {
            "id": 29,
            "description": "Estrategias complementarias y condiciones, fortalecidas para el desarrollo de potencialidades académicas, científicas, epistemológicas, culturales, éticas, estéticas, deportivas, sociales, ciudadanas y proambientales de los estudiantes, en el marco de lo colectivo y la corresponsabilidad."
          },
          {
            "id": 30,
            "description": "Estrategias de acompañamiento específico, atención especializada, reconocimiento, protección y promoción de la diversidad, desarrolladas hacia la integración de los estudiantes para su buen vivir."
          },
          {
            "id": 31,
            "description": "Estrategias interculturales, pluriversales y plurilingües, implementadas con enfoque territorial en la formación de estudiantes de pregrado y posgrado."
          },
          {
            "id": 32,
            "description": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas que afrontan los estudiantes vulnerables, especialmente los priorizados por los lineamientos de educación superior inclusiva, en sus procesos de aprendizaje y en su participación durante el ciclo de vida universitaria"
          },
          {
            "id": 33,
            "description": "Sistema implementado de caracterización, seguimiento, evaluación a la trayectoria y reconocimiento del desempeño de los estudiantes durante su ciclo de vida universitaria."
          },
          {
            "id": 34,
            "description": "Procesos consolidados de preparación de los estudiantes para el egreso y el ejercicio profesional con responsabilidad social. "
          }
        ],
        "indicators": [
          {
            "id": 35,
            "description": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 36,
            "description": "Tasa de deserción por semestre."
          },
          {
            "id": 37,
            "description": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 38,
            "description": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 39,
            "description": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 7,
        "description": "Fortalecer la formación integral de los profesores hacia la construcción de comunidad universitaria.",
        "actions": [
          {
            "id": 35,
            "description": "Procesos mejorados de vinculación planificada en correspondencia con lasnecesidades misionales y con el carácter formativo y humano de los profesores, bajo principios de equidad, igualdad y trabajo digno."
          },
          {
            "id": 36,
            "description": "Procesos fortalecidos para la integración de los profesores a la vida universitaria."
          },
          {
            "id": 37,
            "description": "Estrategias y condiciones académicas, sociales y culturales, fortalecidas para el desarrollo de las actividades profesorales enmarcadas en la práctica permanente del cuidado individual y colectivo, de la Institución y de los bienes públicos."
          },
          {
            "id": 38,
            "description": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas, que afrontan los profesores vulnerables, especialmente con discapacidad, durante su ciclo de vida universitaria."
          },
          {
            "id": 39,
            "description": "Prácticas inclusivas e interculturales consolidadas de cualificación docente, enfocadas al reconocimiento de comportamientos proambientales y de las distintas expresiones de la diversidad, la diferencia epistémica y la pluralidad, presentes en la comunidad universitaria."
          },
          {
            "id": 40,
            "description": "Procesos mejorados de reconocimiento y asignación de estímulos con principios de equidad para los profesores en sus diferentes funciones."
          },
          {
            "id": 41,
            "description": "Comunidades académicas y redes de conocimiento consolidadas para el desarrollo del ejercicio profesoral tanto en el ámbito nacional como internacional"
          },
          {
            "id": 42,
            "description": "Prácticas de gestión de conocimiento incorporadas en la cultura universitaria, que permitan la identificación, la sistematización, la conservación y la difusión de los saberes propios del ejercicio profesoral en los procesos institucionales."
          },
          {
            "id": 43,
            "description": "Procesos mejorados de acompañamiento y preparación para el retiro laboral, que cultiven el desarrollo intelectual, físico y psicoafectivo de los profesores."
          }
        ],
        "indicators": [
          {
            "id": 40,
            "description": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 41,
            "description": "Tasa de deserción por semestre."
          },
          {
            "id": 42,
            "description": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 43,
            "description": "Porcentaje de profesores que realizan procesos formativos y de cualificación docente ofertados por la Universidad."
          },
          {
            "id": 44,
            "description": "Porcentaje de implementación de teletrabajo."
          },
          {
            "id": 45,
            "description": "Porcentaje planificación y retroalimentación de la labor."
          },
          {
            "id": 46,
            "description": "Número de nuevos empleados vinculados en carrera administrativa por concurso público."
          },
          {
            "id": 47,
            "description": "Número de plazas docentes de tiempo completos equivalentes ocupadas."
          },
          {
            "id": 48,
            "description": "Número de plazas docentes de tiempo completos equivalentes creadas. "
          },
          {
            "id": 49,
            "description": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 50,
            "description": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 8,
        "description": "Fortalecer la formación integral del personal administrativo hacia la construcción de comunidad universitaria.",
        "actions": [
          {
            "id": 44,
            "description": "Procesos consolidados de vinculación planificados, dinámicos y ágiles de los servidores administrativos, que respondan a las necesidades institucionales bajo principios de equidad, igualdad y trabajo digno."
          },
          {
            "id": 45,
            "description": "Estrategias para el desarrollo de las competencias del ser, el saber y el hacer en la gestión administrativa, en concordancia con las necesidades de bienestar y las condiciones normativas académicas, sociales y culturales, y enmarcadas en el trabajo en equipo, apertura al cambio, el sentido de lo colectivo y la corresponsabilidad."
          },
          {
            "id": 46,
            "description": "Prácticas inclusivas e interculturales consolidadas de cualificación de los servidores administrativos, enfocadas al reconocimiento de comportamientos proambientales y de las distintas expresiones de la diversidad, la diferencia epistémica y la pluralidad, presentes en la comunidad universitaria."
          },
          {
            "id": 47,
            "description": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas que afronten los servidores administrativos vulnerables, especialmente aquellos con discapacidad en su participación durante su ciclo de vida universitaria."
          },
          {
            "id": 48,
            "description": "Procesos mejorados de reconocimiento de logros personales, académicos y profesionales de los servidores administrativos."
          },
          {
            "id": 49,
            "description": "Prácticas de gestión de conocimiento incorporadas en la cultura universitaria que permitan la identificación, la sistematización, la conservación y la difusión de los saberes propios de la gestión administrativa en los procesos institucionales."
          },
          {
            "id": 50,
            "description": "Procesos mejorados de acompañamiento y preparación para el retiro laboral que cultiven el desarrollo intelectual, físico y psicoafectivo de los empleados administrativos."
          }
        ],
        "indicators": [
          {
            "id": 51,
            "description": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 52,
            "description": "Tasa de deserción por semestre."
          },
          {
            "id": 53,
            "description": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 54,
            "description": "Porcentaje de profesores que realizan procesos formativos y de cualificación docente ofertados por la Universidad."
          },
          {
            "id": 55,
            "description": "Porcentaje de implementación de teletrabajo."
          },
          {
            "id": 56,
            "description": "Porcentaje planificación y retroalimentación de la labor."
          },
          {
            "id": 57,
            "description": "Número de nuevos empleados vinculados en carrera administrativa por concurso público."
          },
          {
            "id": 58,
            "description": "Número de plazas docentes de tiempo completos equivalentes ocupadas."
          },
          {
            "id": 59,
            "description": "Número de plazas docentes de tiempo completos equivalentes creadas. "
          },
          {
            "id": 60,
            "description": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 61,
            "description": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 9,
        "description": "Consolidar los vínculos de egresados, jubilados y pensionados con la vida universitaria.",
        "actions": [
          {
            "id": 51,
            "description": "Procesos de generación de conocimientos, habilidades y destrezas, implementados para la proyección laboral y social de los egresados."
          },
          {
            "id": 52,
            "description": "Estrategias consolidadas para la articulación de los egresados a la vida universitaria. "
          },
          {
            "id": 53,
            "description": "Estrategias fortalecidas de articulación de los profesores y los empleados administrativos jubilados y pensionados en los procesos académicos, administrativos y culturales de la comunidad universitaria."
          }
        ],
        "indicators": []
      }
    ]
  }, {
    "id": 2,
    "title": "Democracia, gobierno universitario y convivencia",
    "subtitle": "Una universidad democrática, transparente y abierta a la sociedad.",
    "objectives": [
      {
        "id": 10,
        "description": "Implementar procesos de formación ciudadana en la construcción de una cultura política democrática, que guíen la reflexión y actuación de los integrantes de la comunidad universitaria. ",
        "actions": [
          {
            "id": 54,
            "description": "Política de formación ciudadana implementada para todos los estamentos de la Universidad, que cualifica el ejercicio de la participación y la cultura política democrática de los universitarios."
          },
          {
            "id": 55,
            "description": "Mecanismos, instancias y espacios permanentes de participación, deliberación y concertación política entre los actores universitarios."
          },
          {
            "id": 56,
            "description": "Reconocimiento y legitimidad de las organizaciones y colectivos universitarios ante el gobierno universitario y sus bases de origen, siempre y cuando actúen dentro del marco de la Constitución, la Ley y las normas universitarias."
          }
        ],
        "indicators": [
          {
            "id": 62,
            "description": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 63,
            "description": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 11,
        "description": "Fomentar la democracia en el gobierno universitario y los mecanismos de participación, de modo que la comunidad universitaria fortalezca los procesos de toma de decisiones.",
        "actions": [
          {
            "id": 57,
            "description": "Mecanismos de participación y canales de diálogo establecidos para el fortalecimiento de la toma de decisiones. "
          },
          {
            "id": 58,
            "description": "Consultas reglamentadas que incidan efectivamente en la reforma de los estatutos y reglamentos referidos a los estamentos y en la elección de sus representantes a los órganos de gobierno. "
          },
          {
            "id": 59,
            "description": "Normativa institucional simplificada, actualizada y publicitada, que permita acceder fácilmente a sus contenidos, esté acorde con las transformaciones de la educación superior, y se ajuste a las condiciones y particularidades institucionales en su construcción y aplicación."
          },
          {
            "id": 60,
            "description": "Órganos de gobierno y representaciones con reglamentos internos ajustados, que definan los principios de consecutividad, identidad y conexidad para el trámite de proyectos normativos, y las materias sobre las cuales rigen procedimientos, quórums o mayorías especiales."
          }
        ],
        "indicators": [
          {
            "id": 64,
            "description": "Número de temas de interés institucional priorizados que se actualizan desde lo normativo"
          },
          {
            "id": 65,
            "description": "Número de talleres de apoyo para la deliberación y proyección de la reforma de regulaciones especificas, priorizados por la Dirección Jurídica. "
          },
          {
            "id": 66,
            "description": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 67,
            "description": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 12,
        "description": "Garantizar el ejercicio del control sobre las actuaciones de los órganos de gobierno y las autoridades universitarias, que asegure la transparencia de su gestión.",
        "actions": [
          {
            "id": 61,
            "description": "Mecanismos y espacios fortalecidos de control a las actuaciones de las autoridades y sus órganos de gobierno en todos los niveles de decisión administrativa y académica."
          },
          {
            "id": 62,
            "description": "Política institucional de transparencia, desarrollada en el gobierno universitario, que garantice el acceso ágil y oportuno a la información relevante para la comunidad universitaria y la sociedad."
          },
          {
            "id": 63,
            "description": "Rendición pública y periódica de cuentas ajustada a la función institucional y a la gestión, que fomente el ejercicio autocrítico y la retroalimentación de la comunidad universitaria y de la sociedad."
          }
        ],
        "indicators": [
          {
            "id": 68,
            "description": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 69,
            "description": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 13,
        "description": "Fortalecer los campus como espacios públicos adecuados para la comunidad universitaria y la sociedad, que garanticen la convivencia entre quienes los habitan y los visitan respetando su destinación para las actividades misionales.",
        "actions": [
          {
            "id": 64,
            "description": "Estrategias desarrolladas de prevención, promoción, atención y seguimiento a la convivencia, que partan de la capacidad de autorregulación de los actores y del cumplimiento de deberes y responsabilidades."
          },
          {
            "id": 65,
            "description": "Sistema de resolución de conflictos implementado, que contemple fases previas de mediación y medidas alternativas sancionatorias."
          },
          {
            "id": 66,
            "description": "Coordinación con autoridades externas en el tratamiento de la ilegalidad en los campus, que garanticen el respeto a los derechos humanos de la comunidad y la continuidad de las actividades universitarias."
          },
          {
            "id": 67,
            "description": "Campus consolidados como espacios de participación y de construcción de comunidad universitaria."
          },
          {
            "id": 68,
            "description": "Política de espacios públicos de los campus implementada dentro del marco normativo y respetando siempre la misión de la Universidad."
          }
        ],
        "indicators": []
      }
    ]
  }, {
    "id": 3,
    "title": "Gestión administrativa y del financiamiento",
    "subtitle": "Una gestión integrada que transforma.",
    "objectives": [
      {
        "id": 14,
        "description": "Desarrollar capacidades para la anticipación, orientación y evaluación institucionales, que le permitan a la Universidad la toma estratégica de decisiones frente a su presencia y relación con el entorno.",
        "actions": [
          {
            "id": 69,
            "description": "Modelo de gestión integral implementado para el direccionamiento y la evaluación institucional."
          },
          {
            "id": 70,
            "description": "Procesos incorporados para el análisis estratégico del entorno."
          },
          {
            "id": 71,
            "description": "Capacidades instaladas para el direccionamiento estratégico de la Institución"
          },
          {
            "id": 72,
            "description": "Capacidades para la gestión de riesgos, implementadas e integradas al direccionamiento estratégico."
          }
        ],
        "indicators": [
          {
            "id": 70,
            "description": "Nivel de optimización de recursos en los nuevos procesos académicos o administrativos intervenidos. "
          },
          {
            "id": 71,
            "description": "Número de procesos académicos y administrativos prioritarios estandarizados"
          }
        ]
      },
      {
        "id": 15,
        "description": "Desarrollar capacidades para el aprendizaje e innovación que permitan a la Universidad mejorar y transformar sus procesos y prácticas.",
        "actions": [
          {
            "id": 73,
            "description": "Sistema de gestión del conocimiento implementado para la Universidad."
          },
          {
            "id": 74,
            "description": "Sistema de innovación implementado para la gestión administrativa y del financiamiento."
          },
          {
            "id": 75,
            "description": "Capacidades instaladas para el aprendizaje y la innovación universitaria."
          }
        ],
        "indicators": []
      },
      {
        "id": 16,
        "description": "Consolidar la descentralización y desconcentración de estructuras, procesos y recursos, que le permitan a la Universidad la flexibilización y la sostenibilidad de la operación interna, y la mejora de la proyección y autonomía en los territorios en los que tiene presencia.",
        "actions": [
          {
            "id": 76,
            "description": "Procesos académicos y administrativos descentralizados en seccionales y sedes, con autonomía, de acuerdo con las particularidades de los territorios y las capacidades institucionales."
          },
          {
            "id": 77,
            "description": "Procesos de la administración central desconcentrados."
          },
          {
            "id": 78,
            "description": "Enfoque implementado de trabajo por procesos y por proyectos."
          },
          {
            "id": 79,
            "description": "Estructuras académico-administrativas flexibles para el desarrollo misional en correspondencia con la integración de saberes y la gestión del conocimiento."
          },
          {
            "id": 80,
            "description": "Capacidades instaladas para la alineación, coordinación y colaboración en y entre unidades académicas y administrativas."
          }
        ],
        "indicators": [
          {
            "id": 72,
            "description": "Nivel de optimización de recursos en los nuevos procesos académicos o administrativos intervenidos. "
          },
          {
            "id": 73,
            "description": "Número de procesos académicos y administrativos prioritarios estandarizados."
          }
        ]
      },
      {
        "id": 17,
        "description": "Disponer de un sistema integral de comunicaciones que favorezca el relacionamiento de la Universidad con la comunidad interna y externa, que visibilice su quehacer académico, científico, social y cultural.",
        "actions": [
          {
            "id": 81,
            "description": "Sistema de comunicaciones institucional integrado."
          },
          {
            "id": 82,
            "description": "Mecanismos de comunicación e información institucional accesibles a todos los públicos, desarrollados con estándares de calidad, pertinencia y oportunidad."
          },
          {
            "id": 83,
            "description": "Estrategias integrales instauradas para la proyección y posicionamiento institucionales."
          }
        ],
        "indicators": [
          {
            "id": 74,
            "description": "Índice de madurez de la transformación digital."
          },
          {
            "id": 75,
            "description": "Índice de apropiación de la transformación digital. "
          }
        ]
      },
      {
        "id": 18,
        "description": "Disponer de tecnologías informáticas integradas para el direccionamiento y soporte de los procesos académicos y administrativos de la Institución de manera eficiente.",
        "actions": [
          {
            "id": 84,
            "description": "Infraestructura tecnológica y sistemas de información integrados, planificados y administrados bajo condiciones de seguridad, gobernabilidad y usabilidad e incorporados estratégicamente a las necesidades de la Universidad"
          },
          {
            "id": 85,
            "description": "Estrategias implementadas de gobierno en línea y de accesibilidad a la información dirigidas a los públicos internos y externos."
          },
          {
            "id": 86,
            "description": "Estrategias de desarrollo de la tecnología informática acordes con las propuestas académicas y los procesos administrativos."
          },
          {
            "id": 87,
            "description": "Procesos de transformación digital incorporados en las propuestas académicas y procesos administrativos."
          }
        ],
        "indicators": []
      },
      {
        "id": 19,
        "description": "Mejorar la infraestructura física de la Universidad en respuesta a las necesidades académicas y administrativas, las condiciones particulares de la comunidad universitaria y las políticas de responsabilidad social y ambiental.",
        "actions": [
          {
            "id": 88,
            "description": "Infraestructura física universitaria incrementada."
          },
          {
            "id": 89,
            "description": "Espacios físicos adecuados, soportados logísticamente y habilitados en relación con las necesidades generales y específicas de los procesos y de la comunidad universitaria."
          },
          {
            "id": 90,
            "description": "Infraestructura física y logística planeada e instalada de manera eficiente y con gestión del ambiente y la biodiversidad."
          },
          {
            "id": 91,
            "description": "Esquemas de colaboración establecidos para el crecimiento y desarrollo de la infraestructura física con instituciones y organizaciones públicas y privadas."
          }
        ],
        "indicators": [
          {
            "id": 76,
            "description": "Número de metros cuadrados construídos para adaptar la infraestructura universitaria a nuevas dinámicas institucionales "
          },
          {
            "id": 77,
            "description": "Número de metros cuadrados adecuados para adaptar la infraestructura universitaria a nuevas dinámicas institucionales. "
          }
        ]
      },
      {
        "id": 20,
        "description": "Mejorar la gestión del financiamiento y la administración de los recursos financieros para inversión y sostenibilidad universitarias, en el marco de actuación de una institución de educación superior pública.",
        "actions": [
          {
            "id": 92,
            "description": "Base presupuestal incrementada a partir de recursos del Estado."
          },
          {
            "id": 93,
            "description": "Recursos financieros para proyectos especiales, incrementados a partir de nuevas fuentes de financiación territoriales."
          },
          {
            "id": 94,
            "description": "Nuevos recursos financieros obtenidos mediante la articulación y asociación con el Estado, la empresa, organismos internacionales, organizaciones sociales y pares académicos o científicos."
          },
          {
            "id": 95,
            "description": "Administración descentralizada de los recursos financieros de la Universidad."
          },
          {
            "id": 96,
            "description": "Recursos financieros administrados con transparencia, eficiencia y eficacia."
          },
          {
            "id": 97,
            "description": "Nuevos fondos de apoyo financiero instaurados para el desarrollo de las funciones misionales."
          },
          {
            "id": 98,
            "description": "Relaciones de mutuo beneficio instauradas con entidades externas en las que la Universidad tiene participación. "
          },
          {
            "id": 99,
            "description": "Riesgos financieros gestionados y mitigados, derivados de la participación de la Universidad en otras entidades. "
          }
        ],
        "indicators": []
      }
    ]
  }, {
    "id": 4,
    "title": "Compromiso de la Universidad con la construcción de paz, equidad, inclusión e interculturalidad",
    "subtitle": "Una universidad equitativa, inclusiva e intercultural que siembra la paz con enfoque territorial e integral.",
    "objectives": [
      {
        "id": 21,
        "description": "Aportar a la solución de problemáticas territoriales asociadas a los posacuerdos, con propuestas académicas y saberes ancestrales al servicio de la educación para la paz. ",
        "actions": [
          {
            "id": 100,
            "description": "Intervenciones ejecutadas, desde la misión de la universidad, sobre los procesos, diseñados por el gobierno nacional, con sus estrategias para el reconocimiento, visibilización y acompañamiento de las víctimas del conflicto armado desde procesos de memoria, búsqueda de la verdad, reparación integral y garantías de no repetición."
          },
          {
            "id": 101,
            "description": "Acciones desarrolladas desde los ejes misionales, que respondan a las necesidades regionales y aporten a la comprensión de los conflictos violentos que perviven y se reactualizan en las regiones afectadas por el conflicto armado."
          },
          {
            "id": 102,
            "description": "Formación para la participación política y social, desarrollada desde el ejercicio de derechos y obligaciones ciudadanos, derivados de la construcción de paz por parte de comunidades, regiones y territorios afectados por el conflicto armado."
          }
        ],
        "indicators": [
          {
            "id": 78,
            "description": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 79,
            "description": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 80,
            "description": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 22,
        "description": "Acompañar a los grupos poblacionales en sus procesos de construcción de paz, equidad, inclusión e interculturalidad como parte de su relación con la comunidad universitaria y con la sociedad.",
        "actions": [
          {
            "id": 103,
            "description": "Centro permanente de tratamiento de conflictos constituido y que cuente con estrategias enriquecidas desde la diversidad epistémica."
          },
          {
            "id": 104,
            "description": "Estrategias para la generación y apropiación del conocimiento sobre las causas del conflicto y los procesos de construcción de paz."
          },
          {
            "id": 105,
            "description": "Sistema Universitario de Información sobre Memoria constituido para la gestión documental y la unificación de proyectos, estudios y actividades en el marco de las reparaciones individuales y colectivas."
          },
          {
            "id": 106,
            "description": "Ejercicios adelantados desde la Universidad para la reconstrucción de la memoria de los estamentos, y de búsqueda de la verdad y reparación como víctima colectiva del conflicto armado."
          },
          {
            "id": 107,
            "description": "Formación adelantada para el desarrollo de capacidades para la reintegración a la vida civil de los excombatientes y acompañamiento a las víctimas mediante la generación de relaciones desde el respeto a la vida, a los derechos y al pluralismo en las regiones."
          }
        ],
        "indicators": [
          {
            "id": 81,
            "description": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 82,
            "description": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          },
          {
            "id": 83,
            "description": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 84,
            "description": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 85,
            "description": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 23,
        "description": "Cualificar el quehacer universitario con la apertura del aprendizaje, la enseñanza, el currículo y la construcción del conocimiento a epistemologías y saberes propios de la diversidad de la comunidad universitaria.",
        "actions": [
          {
            "id": 108,
            "description": "Educación para la paz por intermedio de estrategias que promuevan la noviolencia con propuestas pedagógicas que podrán ser enriquecidas con saberes ancestrales, prácticas socio-políticas y formación en derechos humanos."
          },
          {
            "id": 109,
            "description": "Políticas de enfoque diferencial, de género e interculturalidad consolidadas en la investigación y la extensión, que aporten al conocimiento sobre la Universidad y la sociedad."
          }
        ],
        "indicators": [
          {
            "id": 86,
            "description": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 87,
            "description": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 88,
            "description": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 24,
        "description": "Fomentar el reconocimiento pleno de los derechos, de tal modo que se garanticen las diversidades y la vida digna, y se eliminen las discriminaciones en el espacio universitario.",
        "actions": [
          {
            "id": 110,
            "description": "Políticas contra el acoso, la violencia y la discriminación basados en el sexo, la orientación sexual y la identidad de género, desarrolladas desde la sensibilización, la atención integral y la generación de protocolos que promuevan condiciones de convivencia y derechos humanos en la Universidad."
          },
          {
            "id": 111,
            "description": "Gestión para la apropiación social e institucional del conocimiento sobre la inclusión en la educación superior, desarrollada con base en los lineamientos políticos y avances teóricos latinoamericanos y globales."
          }
        ],
        "indicators": [
          {
            "id": 89,
            "description": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 90,
            "description": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          },
          {
            "id": 91,
            "description": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 92,
            "description": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 93,
            "description": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      }
    ]
  }, {
    "id": 5,
    "title": "Contribuciones de la Universidad a la gestión del ambiente y la biodiversidad",
    "subtitle": "Una universidad biodiversa y ambientalmente responsable.",
    "objectives": [
      {
        "id": 25,
        "description": "Consolidar una cultura y una ética universitarias basadas en el respeto por el ambiente y la biodiversidad en el marco de los objectives de Desarrollo Sostenible.",
        "actions": [
          {
            "id": 112,
            "description": "Acciones de gestión ambiental articuladas al Sistema de Gestión Ambiental."
          },
          {
            "id": 113,
            "description": "Estrategias para la formación transversalizadas por la educación ambiental."
          },
          {
            "id": 114,
            "description": "Prácticas éticas y responsables con el ambiente y la biodiversidad, realizadas por la comunidad universitaria."
          },
          {
            "id": 115,
            "description": "Proyectos de ampliación de infraestructura ambientalmente sostenibles. "
          },
          {
            "id": 116,
            "description": "Agendas implementadas de investigación y formación en ambiente y biodiversidad."
          },
          {
            "id": 117,
            "description": "Colecciones y patrimonio ambiental conservados, documentados, registrados, divulgados y visibilizados, que generen estrategias para su apropiación."
          },
          {
            "id": 118,
            "description": "Estrategias implementadas para la asesoría y el acompañamiento jurídico a la investigación científica en ambiente y biodiversidad."
          }
        ],
        "indicators": [
          {
            "id": 94,
            "description": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 95,
            "description": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      },
      {
        "id": 26,
        "description": "Participar activamente en la formulación y evaluación de políticas públicas ambientales y de responsabilidad ambiental con diferentes sectores sociales.",
        "actions": [
          {
            "id": 119,
            "description": "Estrategias de producción, difusión, divulgación y visibilización del conocimiento en ambiente y biodiversidad, desarrolladas para orientar la toma de decisiones."
          },
          {
            "id": 120,
            "description": "Mecanismos instalados de articulación entre el Sistema Nacional Ambiental, los tomadores de decisiones y la Universidad."
          }
        ],
        "indicators": [
          {
            "id": 96,
            "description": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 97,
            "description": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      },
      {
        "id": 27,
        "description": "Promover la apropiación social del conocimiento y el diálogo intercultural en ambiente y biodiversidad con los diferentes actores sociales en el territorio.",
        "actions": [
          {
            "id": 121,
            "description": "Estrategias desarrolladas de comunicación y divulgación en ambiente y biodiversidad con actores sociales en el territorio."
          },
          {
            "id": 122,
            "description": "Eventos académicos y de extensión pertinentes en gestión del ambiente y biodiversidad, fortalecidos."
          },
          {
            "id": 123,
            "description": "Pedagogías y diálogos de saberes interdisciplinares e interculturales incorporados a la gestión del ambiente y la biodiversidad."
          },
          {
            "id": 124,
            "description": "Capacidades y oportunidades de las poblaciones locales, fortalecidas para la gestión del ambiente y de la biodiversidad, con énfasis en los territorios afectados por el conflicto armado."
          }
        ],
        "indicators": [
          {
            "id": 98,
            "description": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 99,
            "description": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      }
    ]
  }] }
