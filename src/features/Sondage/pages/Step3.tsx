import React, { useEffect, useState, type ReactNode } from "react";
import type { SondageData, ResponsabilitePassee } from "../types/sondageShema";
import { getPostes, type Poste } from "../../../api/sondageApi";

// --- Props Interface ---
interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
  updateData: (data: Partial<SondageData>) => void;
  formData: Partial<SondageData>;
  errors: any;
}

// --- Helper Components ---

// Helper pour afficher l'erreur
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-600 text-sm mt-1 px-1">{message}</p>;
};

// Carte stylisée
const Card = ({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-xl p-5 border border-border-light shadow-md shadow-primary/5 border-l-4 border-l-primary">
    {children}
  </div>
);

// --- Formulaire pour "Andraikitra Efa Nosahanina" ---
interface AddPastRoleFormProps {
  postes: Poste[];
  onSave: (role: ResponsabilitePassee) => void;
  onCancel: () => void;
}

function AddPastRoleForm({ postes, onSave, onCancel }: AddPastRoleFormProps) {
  // État local pour le formulaire d'ajout
  const [idPoste, setIdPoste] = useState<number | undefined>(undefined);
  const [nomPersonnalise, setNomPersonnalise] = useState(""); // Pour "Hafa"
  const [isCustom, setIsCustom] = useState(false); // Pour basculer l'input
  // ... autres états ...
  const [eglise, setEglise] = useState("");
  const [typeEglise, setTypeEglise] = useState<
    "Église principale" | "Église annexe"
  >("Église principale");
  const [anneeDebut, setAnneeDebut] = useState<number | undefined>(undefined);
  const [anneeFin, setAnneeFin] = useState<number | undefined>(undefined);
  const [realisations, setRealisations] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    // --- Validation (Modifié) ---
    const hasRole = idPoste !== undefined || nomPersonnalise.trim() !== "";
    if (!hasRole || !eglise.trim() || !anneeDebut) {
      setError(
        "Fenoina farafaharatsiny ny Andraikitra, Fiangonana, ary Taona nanombohana."
      );
      return;
    }
    setError("");
    // --- Envoi des données (Modifié) ---
    onSave({
      id_poste: isCustom ? undefined : idPoste, // N'envoie l'ID que si ce n'est pas "Hafa"
      nom_poste_personnalise: isCustom ? nomPersonnalise.trim() : undefined, // N'envoie le nom que si c'est "Hafa"
      type_experience: "Assumé",
      eglise,
      type_eglise: typeEglise,
      annee_debut: anneeDebut,
      annee_fin: anneeFin,
      realisations,
    });
  };

  // --- Gestion du Select (Modifié) ---
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "HAFA") {
      setIsCustom(true);
      setIdPoste(undefined);
    } else {
      setIsCustom(false);
      setIdPoste(parseInt(value));
      setNomPersonnalise(""); // Vider le champ "Hafa"
    }
  };

  return (
    <div className="bg-subtle-light p-4 rounded-lg mt-4 space-y-4 border border-primary/20">
      <h3 className="text-base font-semibold text-primary">
        Hanampy traikefa vaovao
      </h3>
      {/* --- Andraikitra (Poste) (Modifié) --- */}
      <div>
        <label
          className="text-sm font-medium text-text-light"
          htmlFor="id_poste"
        >
          Andraikitra
        </label>
        <select
          id="id_poste"
          value={isCustom ? "HAFA" : idPoste || ""} // Gérer la sélection
          onChange={handleSelectChange}
          className="mt-1 block w-full rounded-lg bg-white border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary"
        >
          <option value="" disabled>
            Safidio ny andraikitra
          </option>
          {postes.map((p) => (
            <option key={p.id_poste} value={p.id_poste}>
              {p.nom_poste_mg}
            </option>
          ))}
          {/* Option "Hafa" */}
          <option value="HAFA">-- Hafa (Farito eto ambany) --</option>
        </select>
      </div>

      {/* Champ "Hafa" conditionnel */}
      {isCustom && (
        <div>
          <label
            className="text-sm font-medium text-text-light"
            htmlFor="custom-role-name"
          >
            Andraikitra "Hafa"
          </label>
          <input
            className="mt-1 block w-full rounded-lg bg-white border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary"
            id="custom-role-name"
            placeholder="Soraty eto ny anaran'ny andraikitra"
            type="text"
            value={nomPersonnalise}
            onChange={(e) => setNomPersonnalise(e.target.value)}
          />
        </div>
      )}

      {/* Anaran'ny fiangonana */}
      <div>
        <label
          className="text-sm font-medium text-text-light"
          htmlFor="church-name"
        >
          Anaran’ny fiangonana
        </label>
        <input
          className="mt-1 block w-full rounded-lg bg-white border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary"
          id="church-name"
          placeholder="e.g. SDA Antarandolo"
          type="text"
          value={eglise}
          onChange={(e) => setEglise(e.target.value)}
        />
      </div>

      {/* Karazana Fiangonana */}
      <div>
        <label className="text-sm font-medium text-text-light">
          Karazana Fiangonana
        </label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <label
            className={`flex cursor-pointer ... ${
              typeEglise === "Église principale"
                ? "bg-primary/20 border-primary"
                : "bg-white"
            }`}
            htmlFor="organized"
          >
            <input
              className="sr-only"
              id="organized"
              name="church-type"
              type="radio"
              value="Église principale"
              checked={typeEglise === "Église principale"}
              onChange={() => setTypeEglise("Église principale")}
            />
            Fiangonan-dehibe
          </label>
          <label
            className={`flex cursor-pointer ... ${
              typeEglise === "Église annexe"
                ? "bg-primary/20 border-primary"
                : "bg-white"
            }`}
            htmlFor="group"
          >
            <input
              className="sr-only"
              id="group"
              name="church-type"
              type="radio"
              value="Église annexe"
              checked={typeEglise === "Église annexe"}
              onChange={() => setTypeEglise("Église annexe")}
            />
            Zanam-piangonana
          </label>
        </div>
      </div>

      {/* Taona */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-sm font-medium text-text-light"
            htmlFor="start-year"
          >
            Taona nanombohana
          </label>
          <input
            className="mt-1 block w-full rounded-lg bg-white border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary"
            id="start-year"
            placeholder="YYYY"
            type="number"
            value={anneeDebut || ""}
            onChange={(e) =>
              setAnneeDebut(
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-text-light"
            htmlFor="end-year"
          >
            Taona Namaranana
          </label>
          <input
            className="mt-1 block w-full rounded-lg bg-white border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary"
            id="end-year"
            placeholder="YYYY (tsy fenoina raha mbola mitohy)"
            type="number"
            value={anneeFin || ""}
            onChange={(e) =>
              setAnneeFin(e.target.value ? parseInt(e.target.value) : undefined)
            }
          />
        </div>
      </div>

      {/* Fanamarihana */}
      <div>
        <label className="text-sm font-medium text-text-light" htmlFor="notes">
          Zava-bita / Traikefa manan-danja (Optional)
        </label>
        <textarea
          className="mt-1 block w-full rounded-lg bg-white border border-subtle-light p-4 text-text-light min-h-24 resize-none"
          id="notes"
          placeholder="Fanamarihana hafa..."
          value={realisations}
          onChange={(e) => setRealisations(e.target.value)}
        ></textarea>
      </div>

      <FormError message={error} />

      {/* Boutons d'action */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl bg-subtle-light px-4 py-3 text-base font-bold text-primary shadow-sm"
        >
          Hanafoana
        </button>
        <button
          onClick={handleSave}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-base font-bold text-white shadow-lg"
        >
          Hitahiry
        </button>
      </div>
    </div>
  );
}

// --- Composant Principal Step2 ---

export default function Step3({
  modifyStep,
  setTitle,
  formData,
  updateData,
  errors,
}: propsT) {
  // --- États Locaux ---
  const [postesList, setPostesList] = useState<Poste[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [customSouhaitee, setCustomSouhaitee] = useState("");

  // --- Chargement des données ---
  useEffect(() => {
    setTitle("Traikefa sy Andraikitra");

    const fetchPostes = async () => {
      try {
        const postes = await getPostes();
        setPostesList(postes);
      } catch (err) {
        console.error("Tsy azo ny lisitry ny andraikitra:", err);
        // Gérer l'erreur (ex: afficher un message)
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostes();
  }, [setTitle]);

  // --- Navigation ---
  const nextStep = () => modifyStep(4);
  const previousStep = () => modifyStep(2);

  // --- Données du Container ---
 const responsabilitesSouhaitees = formData.responsabilites_souhaitees || [];
  // Le nouveau champ "Hafa" pour les souhaits
  const autresSouhaitees = formData.responsabilites_souhaitees_autres || []; 
  const responsabilitesPassees = formData.responsabilites_passees || [];

  // --- Gestion "Andraikitra Tiana ho Sahanina" ---
  const handleToggleSouhaitee = (posteId: number) => {
    const isSelected = responsabilitesSouhaitees.some(r => r.id_poste === posteId);
    let newList = [];
    if (isSelected) {
      newList = responsabilitesSouhaitees.filter(r => r.id_poste !== posteId);
    } else {
      newList = [...responsabilitesSouhaitees, { id_poste: posteId, type_experience: "Souhaite assumer" }];
    }
    updateData({ responsabilites_souhaitees: newList });
  }

  const handleAddAutreSouhaitee = () => {
    if (customSouhaitee.trim().length === 0) return;
    const newList = [...autresSouhaitees, customSouhaitee.trim()];
    updateData({ responsabilites_souhaitees_autres: newList });
    setCustomSouhaitee(""); // Vider l'input
  };

  const handleDeleteAutreSouhaitee = (index: number) => {
    const newList = autresSouhaitees.filter((_, i) => i !== index);
    updateData({ responsabilites_souhaitees_autres: newList });
  };

  const filteredPostes = postesList.filter((p) =>
    p.nom_poste_mg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Gestion "Andraikitra Efa Nosahanina" ---
  const handleSavePasse = (role: ResponsabilitePassee) => {
    const newList = [...responsabilitesPassees, role];
    updateData({ responsabilites_passees: newList });
    setShowAddForm(false); // Cacher le formulaire après sauvegarde
  };

  const handleDeletePasse = (index: number) => {
    const newList = responsabilitesPassees.filter((_, i) => i !== index);
    updateData({ responsabilites_passees: newList });
  };

  // Helper pour trouver le nom du poste
  const getPosteName = (resp: ResponsabilitePassee): string => {
    if (resp.nom_poste_personnalise) {
      return `${resp.nom_poste_personnalise} (Hafa)`;
    }
    if (resp.id_poste) {
      return postesList.find(p => p.id_poste === resp.id_poste)?.nom_poste_mg || `Poste ID: ${resp.id_poste}`;
    }
    return "Andraikitra tsy fantatra";
  };

  // --- Rendu ---
  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased bg-subtle-light font-display">
      {/* Form Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* --- Andraikitra Tiana ho Sahanina (Désirés) --- */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Andraikitra Tiana ho Sahanina
          </h2>
          <p className="text-sm text-text-light/70 pb-4">
            Safidio izay mety aminao (afaka misafidy maro)
          </p>

          {/* Barre de recherche */}
          <div className="relative flex items-center mb-4">
            <span className="material-symbols-outlined absolute left-4 text-primary/70 pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Hitady andraikitra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex w-full min-w-0 flex-1 rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-12 placeholder:text-text-light/50 pl-12 pr-4 text-base"
            />
          </div>

          {/* Liste scrollable */}
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {filteredPostes.length > 0 ? (
              filteredPostes.map((poste) => {
                const isSelected = responsabilitesSouhaitees.some(
                  (r) => r.id_poste === poste.id_poste
                );
                return (
                  <label
                    key={poste.id_poste}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : "bg-transparent"
                    }`}
                    htmlFor={`poste-${poste.id_poste}`}
                  >
                    <input
                      type="checkbox"
                      id={`poste-${poste.id_poste}`}
                      checked={isSelected}
                      onChange={() => handleToggleSouhaitee(poste.id_poste)}
                      className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-gray-400"
                    />
                    <span className="ml-3 text-base text-text-light">
                      {poste.nom_poste_mg}
                    </span>
                  </label>
                );
              })
            ) : (
              <p className="text-text-light/60 text-center p-4">
                Tsy misy andraikitra mifanaraka
              </p>
            )}
          </div>
          <FormError message={errors["responsabilites_souhaitees"]} />
        </Card>

        {/* --- Andraikitra Efa Nosahanina (Passés) --- */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Traikefa sy Andraikitra Efa Nosahanina
          </h2>

          {/* Liste des traikefa ajoutés */}
          <div className="space-y-3">
            {responsabilitesPassees.length === 0 && !showAddForm && (
              <p className="text-sm text-text-light/70 text-center p-4">
                Tsy mbola nisy traikefa nampiana.
              </p>
            )}

            {responsabilitesPassees.map((resp, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-subtle-light p-3"
              >
                <div>
                  <p className="font-semibold text-text-light">
                    {getPosteNameById(resp.id_poste)}
                  </p>
                  <p className="text-sm text-text-light/80">
                    {resp.eglise} ({resp.annee_debut} -{" "}
                    {resp.annee_fin || "ankehitriny"})
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePasse(index)}
                  className="text-text-light/50 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Afficher le formulaire ou le bouton "Ajouter" */}
          {showAddForm ? (
            <AddPastRoleForm
              postes={postesList}
              onSave={handleSavePasse}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/50 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <span className="material-symbols-outlined">add</span>
              Hanampy Traikefa Efa Nosahanina
            </button>
          )}
        </Card>
      </main>

      {/* Bottom Action Buttons */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <div className="flex gap-4">
          <button
            onClick={() => previousStep()}
            className="flex-1 rounded-xl bg-subtle-light px-6 py-4 text-lg font-bold text-primary shadow-sm"
          >
            Hiverina
          </button>
          <button
            onClick={() => nextStep()}
            className="flex-1 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg"
          >
            Manaraka
          </button>
        </div>
      </footer>
    </div>
  );
}
