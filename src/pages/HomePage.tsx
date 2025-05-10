import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t("homeTitle")}</h1>
        <div className="flex gap-2 flex-col lg:flex-row m-5">
          <Link
            to="/management"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {t("goToManagement")}
          </Link>
          <Link
            to="/public"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {t("goToPublic")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;