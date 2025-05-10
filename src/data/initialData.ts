import { Keyword } from "../types";

const initialData = {
  keywords: [
    { id: 1, word: "hello", translations: { en: "hello", fa: "سلام", ar: "مرحبا" } },
    { id: 2, word: "world", translations: { en: "world", fa: "جهان", ar: "عالم" } },
    { id: 3, word: "apple", translations: { en: "apple", fa: "", ar: "" } },
    { id: 4, word: "book", translations: { en: "book", fa: "", ar: "" } },
    { id: 5, word: "head", translations: { en: "head", fa: "سر", ar: "رأس" } },
    { id: 6, word: "green", translations: { en: "green", fa: "سبز", ar: "أخضر" } },
  ] as Keyword[],
  languages: ["en", "fa", "ar"],
};

export default initialData;