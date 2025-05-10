export type UiTranslationKeys =
  | "managementTitle"
  | "publicTitle"
  | "noTranslation"
  | "saveButton"
  | "searchPlaceholder"
  | "newWordPlaceholder"
  | "translationPlaceholder"
  | "addButton"
  | "homeTitle"
  | "goToManagement"
  | "goToPublic";

export interface Keyword {
  id: number;
  word: string;
  translations: { [key: string]: string };
}

export interface TranslationContextType {
  keywords: Keyword[];
  languages: string[];
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  addKeyword: (word: string, translation: string, language: string) => void;
  updateTranslation: (id: number, language: string, translation: string) => void;
  reorderKeywords: (newKeywords: Keyword[]) => void;
  t: (key: UiTranslationKeys) => string; 
}