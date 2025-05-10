import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import initialData from "../data/initialData";
import uiTranslations from "../data/uiTranslations";
import { TranslationContextType, Keyword, UiTranslationKeys } from "../types";

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [keywords, setKeywords] = useState<Keyword[]>(() => {
    const saved = localStorage.getItem("keywords");
    return saved ? JSON.parse(saved) : initialData.keywords;
  });
  const [languages] = useState<string[]>(initialData.languages);
  const [currentLanguage, setCurrentLanguage] = useState<string>("fa");

  useEffect(() => {
    try {
      localStorage.setItem("keywords", JSON.stringify(keywords));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [keywords]);

  const addKeyword = (word: string, translation: string, language: string) => {
    const newKeyword: Keyword = {
      id: keywords.length + 1,
      word,
      translations: languages.reduce((acc, lang) => {
        acc[lang] = lang === language ? translation : "";
        return acc;
      }, {} as { [key: string]: string }),
    };
    setKeywords([...keywords, newKeyword]);
  };

  const updateTranslation = (id: number, language: string, translation: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.id === id
          ? {
              ...keyword,
              translations: { ...keyword.translations, [language]: translation },
            }
          : keyword
      )
    );
  };

  const reorderKeywords = (newKeywords: Keyword[]) => {
    setKeywords(newKeywords);
  };


  const t = (key: UiTranslationKeys) => {
    return uiTranslations[currentLanguage][key] || uiTranslations.en[key];
  };

  const value: TranslationContextType = {
    keywords,
    languages,
    currentLanguage,
    setCurrentLanguage,
    addKeyword,
    updateTranslation,
    reorderKeywords,
    t,
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};