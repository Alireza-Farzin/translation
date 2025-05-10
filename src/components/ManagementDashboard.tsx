import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from "../context/TranslationContext";
import { Keyword } from "../types";

interface SortableItemProps {
  id: number;
  keyword: Keyword;
  editingId: number | null;
  editTranslation: string;
  setEditTranslation: (value: string) => void;
  handleEdit: (id: number, translation: string) => void;
  handleSaveEdit: (id: number) => void;
  currentLanguage: string;
  activeId: number | null;
}

const SortableItem = ({
  id,
  keyword,
  editingId,
  editTranslation,
  setEditTranslation,
  handleEdit,
  handleSaveEdit,
  currentLanguage,
  activeId,
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { t } = useTranslation();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm mb-2 touch-action-manipulation"
    >
      <span className={`font-medium ${editingId === id ? "text-[#FF6F61]" : "text-gray-800"}`}>
        {keyword.word}
      </span>
      {editingId === id ? (
        <div className="flex items-center space-x-2">
          <input
            value={editTranslation}
            onChange={(e) => setEditTranslation(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            style={{ direction: currentLanguage === "fa" ? "rtl" : "ltr" }}
          />
          <button
            onClick={() => handleSaveEdit(id)}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            {t("saveButton")}
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span
            className={`text-gray-600 ${currentLanguage === "fa" ? "font-persian" : ""}`}
            style={{ direction: currentLanguage === "fa" ? "rtl" : "ltr" }}
          >
            {keyword.translations[currentLanguage] || t("noTranslation")}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(id, keyword.translations[currentLanguage] || "");
            }}
            className="bg-[#FF6F61] text-white px-3 py-1 rounded-lg hover:bg-[#E65A50] transition flex items-center"
          >
            <span className="text-xl leading-none">⋯</span>
          </button>
        </div>
      )}
    </li>
  );
};

const ManagementDashboard = () => {
  const {
    keywords,
    languages,
    currentLanguage,
    setCurrentLanguage,
    addKeyword,
    updateTranslation,
    reorderKeywords,
    t,
  } = useTranslation();
  const [newWord, setNewWord] = useState<string>("");
  const [newTranslation, setNewTranslation] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTranslation, setEditTranslation] = useState<string>("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );

  const handleAddKeyword = () => {
    if (newWord && newTranslation) {
      addKeyword(newWord, newTranslation, currentLanguage);
      setNewWord("");
      setNewTranslation("");
    }
  };

  const handleEdit = (id: number, translation: string) => {
    setEditingId(id);
    setEditTranslation(translation);
  };

  const handleSaveEdit = (id: number) => {
    updateTranslation(id, currentLanguage, editTranslation);
    setEditingId(null);
    setEditTranslation("");
  };

  const onDragStart = (event: DragStartEvent) => {

    setActiveId(Number(event.active.id));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = keywords.findIndex((keyword) => keyword.id === active.id);
      const newIndex = keywords.findIndex((keyword) => keyword.id === over.id);
      const newKeywords = arrayMove(keywords, oldIndex, newIndex);
      reorderKeywords(newKeywords);
    }
    setActiveId(null);
  };

  const activeKeyword = keywords.find((keyword) => keyword.id === activeId);

  const filteredKeywords = keywords.filter((keyword) =>
    keyword.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">{t("managementTitle")}</h1>
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

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div key={currentLanguage} className="fade-in">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={filteredKeywords.map((keyword) => keyword.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {filteredKeywords.map((keyword) => (
                <SortableItem
                  key={keyword.id}
                  id={keyword.id}
                  keyword={keyword}
                  editingId={editingId}
                  editTranslation={editTranslation}
                  setEditTranslation={setEditTranslation}
                  handleEdit={handleEdit}
                  handleSaveEdit={handleSaveEdit}
                  currentLanguage={currentLanguage}
                  activeId={activeId}
                />
              ))}
            </ul>
          </SortableContext>

          <DragOverlay>
            {activeKeyword ? (
              <div className="flex justify-between items-center p-3 border rounded-lg bg-gray-100 shadow-sm">
                <span>{activeKeyword.word}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder={t("newWordPlaceholder")}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <input
          type="text"
          value={newTranslation}
          onChange={(e) => setNewTranslation(e.target.value)}
          placeholder={t("translationPlaceholder")}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <button
          onClick={handleAddKeyword}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
        >
          <span className="mr-2">+</span> {t("addButton")}
        </button>
      </div>
    </div>
  );
};

export default ManagementDashboard;