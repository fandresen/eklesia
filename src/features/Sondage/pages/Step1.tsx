import { useEffect } from "react";
import type { SondageData } from "../types/sondageShema";

// Définition des props étendues
interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
  updateData: (data: Partial<SondageData>) => void;
  formData: Partial<SondageData>;
  errors: any; // Objet pour les erreurs
}

// Helper pour afficher l'erreur
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-600 text-sm mt-1 px-1">{message}</p>;
};

export default function Step1({
  modifyStep,
  setTitle,
  updateData,
  formData,
  errors,
}: propsT) {

  // Récupérer les données de 'membre' ou un objet vide
  const membreData = formData.membre || {};

  // Gérer le changement de 'justYear'
  // C'est la valeur actuelle, dérivée de l'état
  const justYear = membreData.souvenir_date_bapteme === "Non";
  
  // CORRECTION: Mettre à jour tous les champs liés en une seule fois
  const setJustYear = (value: boolean) => {
    const newSouvenir = value ? "Non" : "Oui";
    
    // Construire le nouvel objet 'membre' avec tous les changements
    const newMembreData = {
      ...membreData,
      souvenir_date_bapteme: newSouvenir,
      // Effacer le champ qui n'est plus pertinent
      date_exacte_bapteme: (newSouvenir === "Non") ? undefined : membreData.date_exacte_bapteme,
      annee_bapteme: (newSouvenir === "Oui") ? undefined : membreData.annee_bapteme,
    };

    // Appeler updateData une seule fois
    updateData({ membre: newMembreData });
  };


  const nextStep = () => {
    modifyStep(2); // La validation se fait dans le container
  };

  useEffect(() => {
    setTitle("Fampahalalana fototra");
  }, [setTitle]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden antialiased bg-background-light font-display">
      
      {/* Form Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="full-name"
          >
            Anarana feno
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              person
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="full-name"
              placeholder="Ampidiro ny anarana feno"
              value={membreData.nom_complet || ""}
              onChange={(e) => updateData({ membre: { ...membreData, nom_complet: e.target.value } })}
              type="text"
            />
          </div>
          <FormError message={errors["membre.nom_complet"]} />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="dob"
          >
            Daty Nahaterahana
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              cake
            </span>
            {/* Logique originale (plus simple et fonctionnelle) */}
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="dob"
              value={membreData.date_naissance || ""}
              onChange={(e) => updateData({ membre: { ...membreData, date_naissance: e.target.value } })}
              onBlur={(e) => (e.target.type = "text")}
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Safidio ny daty nahaterahanao"
              type="text"
            />
          </div>
          <FormError message={errors["membre.date_naissance"]} />
        </div>

        {/* Gender */}
        <div>
          <h2 className="text-base font-medium leading-normal text-text-light pb-2">
            Lahy/Vavy
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-4 has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
              htmlFor="male"
            >
              <input
                className="form-radio h-5 w-5 text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
                id="male"
                name="gender"
                type="radio"
                value="Homme"
                checked={membreData.sexe === "Homme"}
                onChange={(e) => updateData({ membre: { ...membreData, sexe: e.target.value } })}
              />
              <span className="ml-3 text-base font-medium text-text-light">
                Lahy
              </span>
            </label>
            <label
              className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-4 has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
              htmlFor="female"
            >
              <input
                className="form-radio h-5 w-5 text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
                id="female"
                name="gender"
                type="radio"
                value="Femme"
                checked={membreData.sexe === "Femme"}
                onChange={(e) => updateData({ membre: { ...membreData, sexe: e.target.value } })}
              />
              <span className="ml-3 text-base font-medium text-text-light">
                Vavy
              </span>
            </label>
          </div>
          <FormError message={errors["membre.sexe"]} />
        </div>

        {/* Baptism Date */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="baptism-date"
          >
            Daty nanaovana Batisa
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              water_drop
            </span>
            {/* Utilisation de la logique originale du fichier `Step1.tsx` */}
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="baptism-date"
              onFocus={(e) => (e.target.type = justYear ? "number" : "date")}
              placeholder={justYear ? "YYYY" : "Safidio ny daty batisa"}
              type={justYear ? "number" : "text"}
              value={
                justYear
                  ? membreData.annee_bapteme || ""
                  : membreData.date_exacte_bapteme || ""
              }
              // CORRECTION: Mettre à jour tous les champs liés en une seule fois
              onChange={(e) => {
                let newAnnee: number | undefined;
                let newDate: string | undefined;

                if (justYear) {
                  const numVal = parseInt(e.target.value);
                  newAnnee = isNaN(numVal) ? undefined : numVal;
                  newDate = undefined;
                } else {
                  const dateVal = e.target.value;
                  const year = new Date(dateVal).getFullYear();
                  newAnnee = isNaN(year) ? undefined : year;
                  newDate = dateVal;
                }
                
                // Appeler updateData une seule fois
                updateData({
                  membre: {
                    ...membreData,
                    annee_bapteme: newAnnee,
                    date_exacte_bapteme: newDate
                  }
                });
              }}
              min="1900"
              max={new Date().getFullYear()}
              step="1"
            />
          </div>
          <FormError message={errors["membre.annee_bapteme"]} />
          
          <div className="flex items-center justify-start gap-2 pt-3">
            <input
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
              id="date-toggle"
              type="checkbox"
              checked={justYear}
              // `setJustYear` gère maintenant la mise à jour complète de l'état
              onChange={(e) => setJustYear(e.target.checked)}
            />
            <label className="text-sm text-text-light/80" htmlFor="date-toggle">
             Ny Taona ihany no tadidiko
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="address"
          >
            Adiresy
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              home
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="address"
              placeholder="Ampidiro ny Adiresy"
              value={membreData.adresse || ""}
              onChange={(e) => updateData({ membre: { ...membreData, adresse: e.target.value } })}
              type="text"
            />
          </div>
          <FormError message={errors["membre.adresse"]} />
        </div>

        {/* Phone Number (Optional) */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="phone"
          >
            Finday{" "}
            <span className="text-text-light/60 font-normal">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              phone
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="phone"
              placeholder="Apidiro ny laharana"
              type="tel"
              value={membreData.telephone || ""}
              onChange={(e) => updateData({ membre: { ...membreData, telephone: e.target.value } })}
            />
          </div>
          <FormError message={errors["membre.telephone"]} />
        </div>

        {/* Email (Optional) */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="email"
          >
            Email{" "}
            <span className="text-text-light/60 font-normal">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              mail
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="email"
              placeholder="Apidiro ny adiresy email"
              type="email"
              value={membreData.email || ""}
              onChange={(e) => updateData({ membre: { ...membreData, email: e.target.value } })}
            />
          </div>
          <FormError message={errors["membre.email"]} />
        </div>
      </main>

      {/* Bottom Action Button */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <button onClick={()=>nextStep()} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
          Manaraka
        </button>
      </footer>
    </div>
  );
}