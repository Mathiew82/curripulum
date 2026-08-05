import type { ExperienceType } from "../components/Experience/Experience";
import type { FormationType } from "../components/Formation/Formation";
import type { CertificateType } from "../components/Certificate/Certificate";
import type { AboutMeType } from "../components/AboutMe/AboutMe";

export interface SectionOrder {
  id: number;
  name: string;
}

interface CvData {
  name: string;
  photo: string | null;
  aboutMeActive: boolean;
  aboutMe: AboutMeType | null;
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

export type { CvData };

let _listeners: Array<() => void> = [];
let _batching = false;

function notify() {
  if (_batching) return;
  const fns = _listeners.slice();
  for (const fn of fns) fn();
}

const data: CvData = {
  name: "",
  photo: null,
  aboutMeActive: false,
  aboutMe: null,
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
  setAboutMeActive(v: boolean) {
    data.aboutMeActive = v;
    notify();
  },
  setAboutMe(v: AboutMeType) {
    data.aboutMe = v;
    notify();
  },
  setExperiencesActive(v: boolean) {
    data.experiencesActive = v;
    notify();
  },
  setExperiences(v: ExperienceType[]) {
    data.experiences = v;
    notify();
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
    notify();
  },
  setSkills(v: string[]) {
    data.skills = v;
    notify();
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
  subscribe(fn: () => void): () => void {
    _listeners.push(fn);
    return () => {
      _listeners = _listeners.filter((f) => f !== fn);
    };
  },
  batch(updates: () => void): void {
    _batching = true;
    try {
      updates();
    } finally {
      _batching = false;
      notify();
    }
  },
};
