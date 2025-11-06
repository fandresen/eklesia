/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { SondageData } from "../types/sondageShema";
import { getCompetences, type Competence } from "../../../api/sondageApi"; // Importer l'API

interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
  updateData: (data: Partial<SondageData>) => void;
  formData: Partial<SondageData>;
  errors: any;
}

// Helper pour afficher l'erreur
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  // L'erreur s'affiche maintenant ici
  return <p className="text-red-600 text-sm mt-1 text-center">{message}</p>;
};

// Interface pour les talents locaux (avec icône)
interface Talent extends Competence {
  icon: string;
}

// Mapping des icônes (vous pouvez l'enrichir)
const iconMap: { [key: string]: string } = {
  Leadership: "groups",
  Enseignement: "school",
  Artistique: "music_note",
  Social: "volunteer_activism",
  Technique: "construction",
  Financier: "account_balance",
  Evangélisation: "campaign",
  Autre: "auto_awesome",
};

export default function Step4({
  modifyStep,
  setTitle,
  updateData,
  formData,
  errors,
}: propsT) {
  // --- États Locaux ---
  const [competencesList, setCompetencesList] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customTalentInput, setCustomTalentInput] = useState(""); // Pour le champ "Hafa"

  // --- Chargement des données ---
  useEffect(() => {
    setTitle("Fahaiza-manao sy Talenta manokana");

    const fetchCompetences = async () => {
      setIsLoading(true);
      try {
        const data = await getCompetences();
        const talentsAvecIcones = data.map((c) => ({
          ...c,
          icon: iconMap[c.categorie] || "auto_awesome",
        }));
        setCompetencesList(talentsAvecIcones);
      } catch (err) {
        console.error("Tsy azo ny lisitry ny talenta:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompetences();
  }, [setTitle]);

  // --- Données du Container ---
  const competencesData = formData.competences || [];
  // 'otherTalentsData' est maintenant un TABLEAU
  const otherTalentsData = formData.competences_autres || [];

  // --- Gestion des changements ---
  const handleCompetencesChange = (id: number) => {
    const newCompetences = [...competencesData];
    const index = newCompetences.findIndex((c) => c.id_competence === id);
    if (index > -1) {
      newCompetences.splice(index, 1);
    } else {
      newCompetences.push({ id_competence: id });
    }
    updateData({ competences: newCompetences });
  };

  // Ajoute un talent "Hafa" à la liste
  const handleAddOtherTalent = () => {
    if (customTalentInput.trim().length === 0) return;
    const newList = [...otherTalentsData, customTalentInput.trim()];
    updateData({ competences_autres: newList });
    setCustomTalentInput(""); // Vider l'input
  };

  // Supprime un talent "Hafa" de la liste
  const handleDeleteOtherTalent = (index: number) => {
    const newList = otherTalentsData.filter((_, i) => i !== index);
    updateData({ competences_autres: newList });
  };


  // --- Navigation ---
  const nextStep = () => modifyStep(5);
  const previousStep = () => modifyStep(3);

  // --- Style CSS Corrigé ---
  // Ajout de .is-checked en fallback si :has() n'est pas supporté
  const customStyles = `
    .talent-card:has(input:checked),
    .talent-card.is-checked {
        border-color: #003366;
        background-color: rgba(0, 51, 102, 0.1);
        color: #003366;
    }
    .talent-card:has(input:checked) .material-symbols-outlined,
    .talent-card.is-checked .material-symbols-outlined {
        color: #003366;
    }
  `;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased bg-background-light font-display">
      <style>{customStyles}</style>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 space-y-8 bg-background-light">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-light">
            Safidio ny talenta sy Fahaiza-manao
          </h2>
          <p className="text-text-light/70 mt-1">Hanompoana ny fiangonana</p>
        </div>

        {isLoading ? (
          <div className="text-center p-10">...</div>
        ) : (
          <>
            {/* --- Talent Grid (Corrigé pour le clic) --- */}
            <div className="grid grid-cols-2 gap-4">
              {competencesList.map((talent) => {
                const isSelected = competencesData.some(
                  (c) => c.id_competence === talent.id_competence
                );
                const inputId = `talent-${talent.id_competence}`;
                return (
                  <label
                    key={talent.id_competence}
                    htmlFor={inputId} // <-- Ajout de htmlFor
                    className={`
                      talent-card flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-border-light bg-subtle-light p-4 text-center text-text-light/80 shadow-soft transition-all duration-200
                      ${isSelected ? "is-checked" : ""}
                    `}
                  >
                    <input
                      id={inputId} // <-- Ajout de id
                      className="sr-only"
                      name="talents"
                      type="checkbox"
                      value={talent.id_competence}
                      checked={isSelected}
                      // <-- La logique est mise ici ---
                      onChange={() => handleCompetencesChange(talent.id_competence)}
                    />
                    <span className="material-symbols-outlined text-3xl text-primary/70">
                      {talent.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {talent.nom_competence_mg}
                    </span>
                  </label>
                );
              })}
            </div>

            <FormError message={errors.competences} />
          </>
        )}

        {/* --- Other Talents Input (Corrigé) --- */}
        <div className="flex flex-col pt-4">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="other-talents"
          >
            Fahaiza-manao Hafa (Raha misy)
          </label>
          {/* Liste des talents "Hafa" ajoutés */}
          <div className="space-y-2 mb-4">
            {otherTalentsData.map((talent, index) => (
               <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-subtle-light p-3"
              >
                <p className="text-text-light">{talent}</p>
                <button
                  onClick={() => handleDeleteOtherTalent(index)}
                  className="text-text-light/50 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Champ d'ajout */}
          <div className="relative flex items-center gap-2">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              add_circle
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="other-talents"
              placeholder="e.g. Mahay mahandro, Design,..."
              value={customTalentInput}
              onChange={(e) => setCustomTalentInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddOtherTalent(); }}
              type="text"
            />
            <button 
              onClick={handleAddOtherTalent}
              className="shrink-0 rounded-lg bg-primary px-4 py-4 text-white shadow-lg"
              aria-label="Hanampy talenta hafa"
            >
               <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Buttons */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <div className="flex items-center gap-4">
          <button
            onClick={previousStep}
            className="flex w-1/3 items-center justify-center rounded-xl border border-border-light bg-subtle-light px-4 py-4 text-lg font-bold text-text-light shadow-sm"
          >
            Hiverina
          </button>
          <button
            onClick={nextStep}
            className="flex flex-1 items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg"
          >
            Manaraka
          </button>
        </div>
      </footer>
    </div>
  );
}
