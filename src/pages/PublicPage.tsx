import React from "react";
import PublicView from "../components/PublicView";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";

const PublicPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 ">
        <Link to="/management" className="text-blue-500 hover:underline mb-4 block">
          {t("goToManagement")}
        </Link>
        <PublicView />
      </div>
    </div>
  );
};

export default PublicPage;