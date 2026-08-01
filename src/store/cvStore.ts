import type { ExperienceType } from "../components/Experience/Experience";
import type { FormationType } from "../components/Formation/Formation";
import type { CertificateType } from "../components/Certificate/Certificate";

export interface SectionOrder {
  id: number;
  name: string;
}

interface CvData {
  name: string;
  photo: string | null;
  experiencesActive: boolean;
  experiences: ExperienceType[];
  formationsActive: boolean;
  formations: FormationType[];
  certificatesActive: boolean;
  certificates: CertificateType[];
  skillsActive: boolean;
  skills: string[];
  languagesActive: boolean;
  languages: string[];
  sectionOrder: SectionOrder[];
}

const data: CvData = {
  name: "",
  photo: null,
  experiencesActive: false,
  experiences: [],
  formationsActive: false,
  formations: [],
  certificatesActive: false,
  certificates: [],
  skillsActive: false,
  skills: [],
  languagesActive: false,
  languages: [],
  sectionOrder: [],
};

export const cvStore = {
  setName(v: string) {
    data.name = v;
  },
  setPhoto(v: string | null) {
    data.photo = v;
  },
  setExperiencesActive(v: boolean) {
    data.experiencesActive = v;
  },
  setExperiences(v: ExperienceType[]) {
    data.experiences = v;
  },
  setFormationsActive(v: boolean) {
    data.formationsActive = v;
  },
  setFormations(v: FormationType[]) {
    data.formations = v;
  },
  setCertificatesActive(v: boolean) {
    data.certificatesActive = v;
  },
  setCertificates(v: CertificateType[]) {
    data.certificates = v;
  },
  setSkillsActive(v: boolean) {
    data.skillsActive = v;
  },
  setSkills(v: string[]) {
    data.skills = v;
  },
  setLanguagesActive(v: boolean) {
    data.languagesActive = v;
  },
  setLanguages(v: string[]) {
    data.languages = v;
  },
  setSectionOrder(v: SectionOrder[]) {
    data.sectionOrder = v;
  },
  getData(): CvData {
    return { ...data };
  },
};
