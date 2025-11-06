
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import type { SondageData } from "../types/sondageShema";

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
  return <p className="text-red-600 text-sm mt-1">{message}</p>;
};

export default function Step5({
  modifyStep,
  setTitle,
  updateData,
  formData,
  errors,
}: propsT) {
  const exigencesData = formData.exigences || {};

  const handleExigencesChange = (field: string, value: any) => {
    updateData({
      exigences: {
        ...exigencesData,
        [field]: value,
      },
    });
  };

  // Style CSS personnalisé intégré pour le feedback de l'interrupteur
  const customStyles = `
    .switch-bg:has(input:checked) {
        background-color: #003366;
    }
    .switch-handle {
        transform: translateX(2px);
    }
    input:checked + .switch-bg .switch-handle {
        transform: translateX(22px);
        background-color: #003366;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
    }
  `;

  const nextStep = () => {
    modifyStep(6);
  };

  const previousStep = () => {
    modifyStep(4);
  };

  useEffect(() => {
    setTitle("Fepetra ara-pivavahana sy fitondran-tena");
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased bg-background-light font-display">
      <style>{customStyles}</style>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 bg-background-light">
        <div className="space-y-4">
          {/* Active in Church */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft">
            <label
              className="flex cursor-pointer items-center justify-between"
              htmlFor="active-church"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">
                    church
                  </span>
                </div>
                <span className="text-base font-medium text-text-light">
                  Mavitrika amin’ny fivavahana sy fandraisana anjara amin’ny
                  fiainam-piangonana ve ianao??
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  className="sr-only"
                  id="active-church"
                  type="checkbox"
                  checked={exigencesData.actif_vie_religieuse === "Oui"}
                  onChange={(e) =>
                    handleExigencesChange(
                      "actif_vie_religieuse",
                      e.target.checked ? "Oui" : "Non"
                    )
                  }
                />
                <div className="switch-bg flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors">
                  <div className="switch-handle size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </label>
            <FormError message={errors.exigences?.actif_vie_religieuse} />
          </div>

          {/* Adventist Principles */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft">
            <label
              className="flex cursor-pointer items-start justify-between gap-4"
              htmlFor="adventist-principles"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">
                    favorite
                  </span>
                </div>
                <span className="flex-1 text-base font-medium text-text-light pt-3">
                  Mifanaraka amin’ny fitsipika advantista ve ny fiainanao
                  andavanandro?
                </span>
              </div>
              <div className="relative flex shrink-0 items-center pt-3">
                <input
                  className="sr-only"
                  id="adventist-principles"
                  type="checkbox"
                  checked={exigencesData.conformite_principes === "Oui"}
                  onChange={(e) =>
                    handleExigencesChange(
                      "conformite_principes",
                      e.target.checked ? "Oui" : "Non"
                    )
                  }
                />
                <div className="switch-bg flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors">
                  <div className="switch-handle size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </label>
            <p className="mt-2 pl-16 text-sm text-text-light/60">
              Sabata, fitondran-tena, tsy fandraisana toaka, sns.
            </p>
            <FormError message={errors.exigences?.conformite_principes} />
          </div>

          {/* Ready for Responsibilities */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft">
            <label
              className="flex cursor-pointer items-center justify-between"
              htmlFor="responsibilities"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">
                    raven
                  </span>
                </div>
                <span className="text-base font-medium text-text-light">
                  Manana fahavononana hanatanteraka andraikitra amin’ny taona
                  2026 ve ianao?
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  className="sr-only"
                  id="responsibilities"
                  type="checkbox"
                  checked={exigencesData.disponible_2026 === "Oui"}
                  onChange={(e) =>
                    handleExigencesChange(
                      "disponible_2026",
                      e.target.checked ? "Oui" : "Non"
                    )
                  }
                />
                <div className="switch-bg flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors">
                  <div className="switch-handle size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </label>
            <FormError message={errors.exigences?.disponible_2026} />
          </div>

          {/* Contact Permission */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft">
            <label
              className="flex cursor-pointer items-center justify-between"
              htmlFor="contact-permission"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">
                    call
                  </span>
                </div>
                <span className="text-base font-medium text-text-light">
                  Azo ifandraisana tsara ve amin’ny finday na mailaka ve ianao?
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  className="sr-only"
                  id="contact-permission"
                  type="checkbox"
                  checked={exigencesData.facilement_joignable === "Oui"}
                  onChange={(e) =>
                    handleExigencesChange(
                      "facilement_joignable",
                      e.target.checked ? "Oui" : "Non"
                    )
                  }
                />
                <div className="switch-bg flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors">
                  <div className="switch-handle size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </label>
            <FormError message={errors.exigences?.facilement_joignable} />
          </div>
        </div>
      </main>

      {/* Footer Buttons */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <div className="flex items-center gap-4">
          <button
            onClick={previousStep}
            className="flex w-1/3 items-center justify-center rounded-xl border border-border-light bg-subtle-light px-4 py-4 text-lg font-bold text-text-light shadow-sm transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Hiverina
          </button>
          <button
            onClick={nextStep}
            className="flex flex-1 items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Manaraka
          </button>
        </div>
      </footer>
    </div>
  );
}
