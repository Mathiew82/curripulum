import type { CvData } from "../../store/cvStore";

export function buildCvText(data: CvData): string {
  const lines: string[] = [];

  for (const section of data.sectionOrder) {
    switch (section.name) {
      case "Name":
        if (data.name) lines.push(data.name, "");
        break;
      case "AboutMe":
        if (data.aboutMeActive && data.aboutMe && data.aboutMe.text.trim()) {
          lines.push("SOBRE MÍ");
          lines.push(data.aboutMe.text);
          lines.push("");
        }
        break;
      case "Experience":
        if (data.experiencesActive && data.experiences.length > 0) {
          lines.push("EXPERIENCIA");
          for (const exp of data.experiences) {
            lines.push(`- ${exp.company} | ${exp.position} (${exp.duration})`);
            if (exp.description) lines.push(`  ${exp.description}`);
          }
          lines.push("");
        }
        break;
      case "Formation":
        if (data.formationsActive && data.formations.length > 0) {
          lines.push("FORMACIÓN");
          for (const form of data.formations) {
            lines.push(`- ${form.trainingCenter} | ${form.theme} (${form.date})`);
            if (form.description) lines.push(`  ${form.description}`);
          }
          lines.push("");
        }
        break;
      case "Certificate":
        if (data.certificatesActive && data.certificates.length > 0) {
          lines.push("CERTIFICADOS");
          for (const cert of data.certificates) {
            lines.push(`- ${cert.certificationCenter} | ${cert.theme}`);
            if (cert.description) lines.push(`  ${cert.description}`);
          }
          lines.push("");
        }
        break;
      case "Skills":
        if (data.skillsActive && data.skills.length > 0) {
          lines.push("HABILIDADES");
          lines.push(data.skills.join(", "));
          lines.push("");
        }
        break;
      case "Languages":
        if (data.languagesActive && data.languages.length > 0) {
          lines.push("IDIOMAS");
          lines.push(data.languages.join(", "));
          lines.push("");
        }
        break;
      default:
        break;
    }
  }

  return lines.join("\n").trim();
}

export function buildATSOptimizationPrompt(
  cvText: string,
  jobDescription: string,
): string {
  return `Eres un experto en reclutamiento y optimización de currículums para ATS (Applicant Tracking Systems).
Tu objetivo es mejorar el CV del usuario para que supere los filtros automáticos de los sistemas ATS.

## INSTRUCCIONES:
1. Analiza la oferta de trabajo y extrae las palabras clave principales (habilidades, tecnologías, soft skills, certificaciones)
2. Revisa el currículum actual y sugiere mejoras para incluir esas palabras clave de forma natural
3. Mantén el formato en texto plano (sin tablas, columnas o gráficos)
4. No inventes experiencia que el usuario no tenga, pero reformula la existente para que coincida con los requisitos
5. Usa el formato de secciones estándar ATS: Resumen, Experiencia Laboral, Habilidades, Educación

## OFERTA DE TRABAJO:
${jobDescription}

## CURRÍCULUM ACTUAL:
${cvText}

## RESULTADO ESPERADO:
Devuelve el currículum optimizado con las siguientes secciones:
1. Resumen profesional (2-3 líneas con palabras clave)
2. Experiencia laboral (con logros cuantificables y palabras clave)
3. Habilidades (lista en texto plano separada por comas)
4. Educación (formato simplificado)

Además, al final, incluye una sección "RECOMENDACIONES" con 3-4 consejos específicos para mejorar aún más el CV.
`;
}
