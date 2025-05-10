import React from "react";
import { useTranslation } from "../context/TranslationContext";

const PublicView = () => {
  const { keywords, languages, currentLanguage, setCurrentLanguage, t } = useTranslation();

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">{t("publicTitle")}</h1>
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
          style={{ direction: "rtl" }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang === "en" ? "English" : lang === "fa" ? "فارسی" : "عربي"}
            </option>
          ))}
        </select>
      </div>

      <div key={currentLanguage} className="fade-in">
        <ul className="space-y-2">
          {keywords.map((keyword) => (
            <li
              key={keyword.id}
              className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-white"
            >
              <span className="font-medium text-gray-800">{keyword.word}</span>
              <span
                className={`text-gray-600 ${currentLanguage === "fa" ? "font-persian" : ""}`}
                style={{ direction: currentLanguage === "fa" ? "rtl" : "ltr" }}
              >
                {keyword.translations[currentLanguage] || t("noTranslation")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicView;