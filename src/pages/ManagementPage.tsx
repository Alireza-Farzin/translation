import React from "react";
import ManagementDashboard from "../components/ManagementDashboard";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";

const ManagementPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <Link to="/" className="text-blue-500 hover:underline mb-4 block">
          {t("goToPublic")}
        </Link>
        <ManagementDashboard />
      </div>
    </div>
  );
};

export default ManagementPage;