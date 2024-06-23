export interface Skill {
  skillId: string;
  name: string;
  percent: number;
  icon: string;
  color: string;
}

export interface Job {
  jobId: string;
  title: string;
  brandColor: string;
  fromTo: string;
  description: string;
  lang: "ES" | "EN";
  positions: Position[];
}

export interface Profile {
  profileId: string;
  title: string;
  description: string;
  contactTitle: string;
  educationTitle: string;
  languagesTitle: string;
  lang: "ES" | "EN";
  languages: Language[];
  educations: Education[];
  contacts: Contact[];
}

export interface Application {
  applicationId: string;
  name: string;
  about: string;
  stack: string;
  duration: string;
  lang: "ES" | "EN";
  code: string;
  links: Link[];
  technologies: Skill[];
}

interface Link {
  linkId: string;
  caption: string;
  url: string;
}

interface Education {
  educationId: string;
  name: string;
  description: string | null;
  fromTo: string;
}

interface Language {
  languageId: string;
  name: string;
  level: string;
  percent: number;
}

interface Contact {
  contactId: string;
  name: string;
  icon: string;
}

interface Project {
  projectId: string;
  title: string;
  description: string;
  technologies: Skill[];
}

interface Position {
  positionId: string;
  title: string;
  brandColor: string;
  fromTo: string;
  projects: Project[];
}
