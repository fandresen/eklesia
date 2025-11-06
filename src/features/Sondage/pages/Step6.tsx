
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { SondageData } from "../types/sondageShema";

interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
  updateData: (data: Partial<SondageData>) => void;
  formData: Partial<SondageData>;
  errors: any;
  handleSubmit: () => Promise<void>; // Fonction de soumission
  isSubmitting: boolean; // Pour l'état de chargement
}

// Helper pour afficher l'erreur
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-600 text-sm mt-1">{message}</p>;
};

export default function Step6({
  setTitle,
  modifyStep,
  errors,
  formData,
  handleSubmit,
  isSubmitting,
  updateData,
}: propsT) {
  const referenceData = formData.reference || {};
  const consentementData = formData.consentement || {};

  const handleReferenceChange = (field: string, value: any) => {
    updateData({
      reference: {
        ...referenceData,
        [field]: value,
      },
    });
  };

  const handleConsentementChange = (field: string, value: any) => {
    updateData({
      consentement: {
        ...consentementData,
        [field]: value,
      },
    });
  };

  // Styles CSS personnalisés pour la boîte de signature
  const customStyles = `
    .signature-box {
        /* Assurez-vous que la police 'Dancing Script' est chargée */
        font-family: 'Dancing Script', cursive;
        background-image: repeating-linear-gradient(to bottom, transparent, transparent 1px, #e0e0e0 1px, #e0e0e0 2px);
        background-size: 100% 40px;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
    }
    .bg-gradient-body {
        /* Recréation du dégradé du body en CSS pour le mode clair */
        background-image: linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 30%);
    }
  `;
  const previousStep = () => {
    modifyStep(5);
  };
  useEffect(() => {
    setTitle("Fanombanana sy Fijoroana ho vavolombelona");
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased font-display bg-gradient-body">
      {/* Intégration des styles personnalisés */}
      <style>{customStyles}</style>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Reference Person Card */}
        <div className="bg-white rounded-xl shadow-card p-5 space-y-4">
          <h2 className="text-lg font-semibold leading-normal text-text-light">
            Reference Person
          </h2>

          {/* Full Name */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium leading-normal text-text-light/80 pb-1.5"
              htmlFor="ref-name"
            >
              Anarana
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-primary/70">
                person
              </span>
              <input
                className="flex w-full min-w-0 flex-1 rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-12 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal"
                id="ref-name"
                placeholder="Ampidiro ny Anarana"
                value={referenceData.nom_referent || ""}
                onChange={(e) =>
                  handleReferenceChange("nom_referent", e.target.value)
                }
                type="text"
              />
            </div>
            <FormError message={errors.reference?.nom_referent} />
          </div>

          {/* Church Position */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium leading-normal text-text-light/80 pb-1.5"
              htmlFor="ref-position"
            >
              Asa/ Andraikitra
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-primary/70">
                church
              </span>
              <input
                className="flex w-full min-w-0 flex-1 rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-12 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal"
                id="ref-position"
                placeholder="e.g., Loholona, Diakona"
                value={referenceData.fonction_referent || ""}
                onChange={(e) =>
                  handleReferenceChange("fonction_referent", e.target.value)
                }
                type="text"
              />
            </div>
            <FormError message={errors.reference?.fonction_referent} />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium leading-normal text-text-light/80 pb-1.5"
              htmlFor="ref-phone"
            >
              Finday
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-primary/70">
                phone
              </span>
              <input
                className="flex w-full min-w-0 flex-1 rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-12 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal"
                id="ref-phone"
                placeholder="Ampidiro ny laharana"
                type="tel"
                value={referenceData.telephone_referent || ""}
                onChange={(e) =>
                  handleReferenceChange("telephone_referent", e.target.value)
                }
              />
            </div>
            <FormError message={errors.reference?.telephone_referent} />
          </div>
        </div>

        {/* Remarks Card */}
        <div className="bg-white rounded-xl shadow-card p-5 space-y-2">
          <h2 className="text-lg font-semibold leading-normal text-text-light">
            Fanamarihana na fanampim-panazavana avy amin’ny mambra
          </h2>
          <textarea
            className="flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light min-h-[120px] placeholder:text-text-light/50 p-4 text-base font-normal leading-normal"
            id="remarks"
            placeholder="Any other information you'd like to share..."
            value={formData.remarques || ""}
            onChange={(e) => updateData({ remarques: e.target.value })}
          ></textarea>
        </div>

        {/* Agreement Card */}
        <div className="bg-white rounded-xl shadow-card p-5 space-y-4">
          <h2 className="text-lg font-semibold leading-normal text-text-light">
            Fanekena
          </h2>

          <p className="text-sm leading-relaxed text-text-light/90">
            “Izaho dia manaiky fa ny angon-kevitra rehetra nomeko etsy ambony
            dia marina, ary ampiasaina amin’ny rafitra informatika fanendrena
            ara-piangonana eto anivon’ny fiangonana Ambolokandrina, araka ny
            fitsipika mifehy ny Fiangonana Advantista Mitandrina ny Andro
            Fahafito.”
          </p>

          {/* Digital Signature */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium leading-normal text-text-light/80 pb-1.5"
              htmlFor="signature"
            >
              Anarana sy sonia numerika
            </label>
            <div className="relative">
              {/* Le "signature-box" est utilisé ici, le style est défini dans le bloc <style> */}
              <div
                className="signature-box flex w-full items-center justify-center rounded-lg border border-border-light bg-subtle-light h-28 text-2xl font-bold text-text-light/40 cursor-pointer"
                onClick={() =>
                  handleConsentementChange(
                    "consentement",
                    consentementData.consentement === "Accepté"
                      ? ""
                      : "Accepté"
                  )
                } // Simuler une action de signature
              >
                {consentementData.consentement === "Accepté"
                  ? formData.membre?.nom_complet
                  : "Sign here"}
              </div>
            </div>
            <FormError message={errors.consentement?.consentement} />
          </div>

          {/* Upload Photo & Date */}
          <div className="flex items-center gap-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary text-primary px-4 py-3 text-base font-semibold transition-colors hover:bg-primary/10">
              <span className="material-symbols-outlined">add_a_photo</span>
              <span>Sary</span>
            </button>
            <div className="relative flex flex-1 items-center">
              <input
                className="flex w-full min-w-0 flex-1 rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-[52px] placeholder:text-text-light/50 px-4 text-base font-normal leading-normal"
                id="date"
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => (e.target.type = "date")}
                placeholder="Daty"
                type="text"
                value={consentementData.date_consentement || ""}
                onChange={(e) =>
                  handleConsentementChange("date_consentement", e.target.value)
                }
              />
            </div>
          </div>
          <FormError message={errors.consentement?.date_consentement} />
        </div>
      </main>

      {/* Footer Button (Submit) */}
      <footer className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:bg-primary/50"
        >
          {isSubmitting ? (
            <>Valider... <span className="material-symbols-outlined animate-spin">sync</span></>
          ) : (
            <>Valider <span className="material-symbols-outlined">check_circle</span></>
          )}
        </button>
        <button
          onClick={previousStep}
          className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-blend-lighten px-6 py-4 text-lg font-bold text-primary shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          <span>Hiverina</span>
        </button>
      </footer>
    </div>
  );
}
