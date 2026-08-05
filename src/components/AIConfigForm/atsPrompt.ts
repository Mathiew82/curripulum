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
  experienceCount: number,
): string {
  return `Eres un experto en reclutamiento y optimización de currículums para ATS (Applicant Tracking Systems).
Tu objetivo es mejorar el CV del usuario para que supere los filtros automáticos de los sistemas ATS.

## INSTRUCCIONES:
1. Analiza la oferta de trabajo y extrae las palabras clave principales (habilidades, tecnologías, soft skills, certificaciones)
2. Revisa el currículum actual y sugiere mejoras para incluir esas palabras clave de forma natural
3. No inventes experiencia que el usuario no tenga, pero reformula la existente para que coincida con los requisitos
4. Usa un lenguaje profesional y directo, con logros cuantificables cuando sea posible

## OFERTA DE TRABAJO:
${jobDescription}

## CURRÍCULUM ACTUAL:
${cvText}

## RESULTADO ESPERADO:
Devuelve ÚNICAMENTE un objeto JSON válido con esta estructura:
{
  "aboutMe": "texto optimizado para la sección Sobre Mí (2-3 líneas)",
  "experience": ["descripción optimizada experiencia 1", "descripción optimizada experiencia 2", ...],
  "skills": ["habilidad1", "habilidad2", "habilidad3", ...],
  "recommendations": "3-4 consejos específicos para mejorar aún más el CV"
}

IMPORTANTE:
- El array "experience" debe tener exactamente ${experienceCount} elemento(s), en el mismo orden que las experiencias del usuario.
- "aboutMe" debe ser un texto de 2-3 líneas con palabras clave relevantes.
- "skills" debe ser un array de strings con las habilidades clave para esta oferta.
- "recommendations" debe ser un texto con 3-4 consejos prácticos.
- Si no hay contenido para un campo, usa cadena vacía "" o array vacío [].
- No incluyas texto adicional ni marcadores de formato (nada de \`\`\`json).
- Devuelve solo el JSON.
`;
}
