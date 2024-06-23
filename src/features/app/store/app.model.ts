import { TreeNodeData } from "@mantine/core";

export interface ILanguage {
  header: IHeader;
  footer: IFooter;
  navbar: INavigation;
  contactForm: IContactForm;
  skills: ISkills;
  application: IApplication;
  fullview: IFullView;
  key: "ES" | "EN";
}

export interface IGetLangByKeyQuery {
  data: ILanguage;
  key: string;
  languageId: string;
}

export interface IContactFormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export interface IContactForm {
  title: string;
  nameInput: IContactFormField;
  emailInput: IContactFormField;
  subjectInput: IContactFormField;
  messageInput: IContactFormField;
  submitAction: string;
}

interface IFullView {
  careerTitle: string;
  freelanceTitle: string;
}

interface INavigation {
  title: string;
  tree: TreeNodeData[];
}

interface IFooter {
  linkCaption: string;
  caption: string;
}

interface IHeader {
  title: string;
  contactLabel: string;
  languageLabel: string;
  exportAction: string;
  languages: ILanguageOption[];
}

interface ILanguageOption {
  label: string;
  key: string;
}

interface ISkills {
  title: string;
  description: string;
}

interface IApplication {
  aboutTitle: string;
  linksTitle: string;
  stackTitle: string;
}
