interface UiTranslations {
    [key: string]: {
      managementTitle: string;
      publicTitle: string;
      noTranslation: string;
      saveButton: string;
      searchPlaceholder: string;
      newWordPlaceholder: string;
      translationPlaceholder: string;
      addButton: string;
      homeTitle: string;
      goToManagement: string;
      goToPublic: string;
    };
  }
  
  const uiTranslations: UiTranslations = {
    en: {
      managementTitle: "Translation Management",
      publicTitle: "Word Translations",
      noTranslation: "No translation yet",
      saveButton: "Save",
      searchPlaceholder: "Search keywords...",
      newWordPlaceholder: "New Word",
      translationPlaceholder: "Translation",
      addButton: "Add Keyword",
      homeTitle: "Welcome to Translation App",
      goToManagement: "Go to Management Dashboard",
      goToPublic: "Go to Public View",
    },
    fa: {
      managementTitle: "مدیریت ترجمه‌ها",
      publicTitle: "ترجمه کلمات",
      noTranslation: "ترجمهای وجود ندارد",
      saveButton: "ذخیره",
      searchPlaceholder: "جستجوی کلمات...",
      newWordPlaceholder: "کلمه جدید",
      translationPlaceholder: "ترجمه",
      addButton: "اضافه کردن کلمه",
      homeTitle: "به برنامه ترجمه خوش آمدید",
      goToManagement: "برو به داشبورد مدیریت",
      goToPublic: "برو به نمای عمومی",
    },
    ar: {
      managementTitle: "إدارة الترجمات",
      publicTitle: "ترجمة الكلمات",
      noTranslation: "لا توجد ترجمة بعد",
      saveButton: "حفظ",
      searchPlaceholder: "ابحث عن الكلمات...",
      newWordPlaceholder: "كلمة جديدة",
      translationPlaceholder: "ترجمة",
      addButton: "إضافة كلمة",
      homeTitle: "مرحبًا بك في تطبيق الترجمة",
      goToManagement: "انتقل إلى لوحة الإدارة",
      goToPublic: "انتقل إلى العرض العام",
    },
  };
  
  export default uiTranslations;