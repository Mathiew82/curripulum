import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { cvStore } from "../../store/cvStore";
import type { ExperienceType } from "../Experience/Experience";
import type { FormationType } from "../Formation/Formation";
import type { CertificateType } from "../Certificate/Certificate";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#222",
  },
  nameSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  h1: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 16,
  },
  h2: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginTop: 24,
    paddingBottom: 4,
  },
  h3: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#2f5e52",
    paddingVertical: 8,
  },
  line1: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 3,
  },
  line2: {
    color: "#555",
    fontSize: 11,
    marginBottom: 10,
  },
  line3: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  editableItem: {
    marginTop: 6,
    paddingBottom: 8,
  },
  tag: {
    fontSize: 11,
    backgroundColor: "#f0f1f5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  nameOnly: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 16,
  },
});

function NameSection() {
  const { name, photo } = cvStore.getData();

  if (photo) {
    return (
      <View style={styles.nameSection}>
        <Image src={photo} style={styles.photo} />
        <Text style={styles.h1}>{name}</Text>
      </View>
    );
  }

  return <Text style={styles.nameOnly}>{name}</Text>;
}

function AboutMeSection() {
  const { aboutMe, aboutMeActive } = cvStore.getData();

  if (!aboutMeActive || !aboutMe || !aboutMe.text.trim()) return null;

  return (
    <View>
      <Text style={styles.h2}>Sobre mí</Text>
      <Text style={{ fontSize: 11, lineHeight: 1.5, marginTop: 8 }}>
        {aboutMe.text}
      </Text>
    </View>
  );
}

function ExperienceSection() {
  const { experiences, experiencesActive } = cvStore.getData();

  if (!experiencesActive || experiences.length === 0) return null;

  return (
    <View>
      <Text style={styles.h2}>Experiencia</Text>
      {experiences.map((item: ExperienceType) => (
        <View key={item.id} style={styles.editableItem}>
          <Text style={styles.h3}>{item.company}</Text>
          <Text style={styles.line1}>{item.position}</Text>
          <Text style={styles.line2}>{item.duration}</Text>
          <Text style={styles.line3}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

function FormationSection() {
  const { formations, formationsActive } = cvStore.getData();

  if (!formationsActive || formations.length === 0) return null;

  return (
    <View>
      <Text style={styles.h2}>Formación</Text>
      {formations.map((item: FormationType) => (
        <View key={item.id} style={styles.editableItem}>
          <Text style={styles.h3}>{item.trainingCenter}</Text>
          <Text style={styles.line1}>{item.theme}</Text>
          <Text style={styles.line2}>{item.date}</Text>
          <Text style={styles.line3}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

function CertificateSection() {
  const { certificates, certificatesActive } = cvStore.getData();

  if (!certificatesActive || certificates.length === 0) return null;

  return (
    <View>
      <Text style={styles.h2}>Certificados</Text>
      {certificates.map((item: CertificateType) => (
        <View key={item.id} style={styles.editableItem}>
          <Text style={styles.h3}>{item.certificationCenter}</Text>
          <Text style={styles.line1}>{item.theme}</Text>
          <Text style={styles.line3}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

function SkillsSection() {
  const { skills, skillsActive } = cvStore.getData();

  if (!skillsActive || skills.length === 0) return null;

  return (
    <View>
      <Text style={styles.h2}>Habilidades</Text>
      <View style={styles.tagsRow}>
        {skills.map((skill: string) => (
          <Text key={skill} style={styles.tag}>
            {skill}
          </Text>
        ))}
      </View>
    </View>
  );
}

function LanguagesSection() {
  const { languages, languagesActive } = cvStore.getData();

  if (!languagesActive || languages.length === 0) return null;

  return (
    <View>
      <Text style={styles.h2}>Idiomas</Text>
      <View style={styles.tagsRow}>
        {languages.map((language: string) => (
          <Text key={language} style={styles.tag}>
            {language}
          </Text>
        ))}
      </View>
    </View>
  );
}

const sectionComponents: Record<string, React.FC> = {
  Name: NameSection,
  AboutMe: AboutMeSection,
  Experience: ExperienceSection,
  Formation: FormationSection,
  Certificate: CertificateSection,
  Skills: SkillsSection,
  Languages: LanguagesSection,
};

function CvPdfDocument() {
  const { sectionOrder } = cvStore.getData();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {sectionOrder.map((section) => {
          const Component = sectionComponents[section.name];
          if (!Component) return null;
          return <Component key={section.id} />;
        })}
      </Page>
    </Document>
  );
}

export default CvPdfDocument;
