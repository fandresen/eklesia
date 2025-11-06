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
  return <p className="text-red-600 text-sm mt-1 px-1">{message}</p>;
};

// Map des valeurs pour simplifier
const options = [
  { value: "Fréquente", label: "Tonga tsy tapaka" },
  { value: "Régulièrement", label: "Tonga matetika" }, // Ajouté pour 4 options
  { value: "Rarement", label: "Mahalana" },
  { value: "N'y va jamais", label: "Tsy tonga mihitsy" },
];

export default function Step2({
  modifyStep,
  setTitle,
  updateData,
  formData,
  errors,
}: propsT) {
  // Ajout de '?' pour la sécurité, au cas où formData est undefined
  const pratiqueData = formData?.pratique_religieuse || {};

  const handlePratiqueChange = (field: string, value: any) => {
    updateData({
      pratique_religieuse: {
        ...pratiqueData,
        [field]: value,
      },
    });
  };

  const nextStep = () => modifyStep(3);
  const previousStep = () => modifyStep(1);

  useEffect(() => {
    setTitle("Toe-piainana ara-pivavahana");
  }, [setTitle]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden antialiased bg-background-light">
      <main className="flex-grow px-4 py-6">
        <div className="space-y-6">
          {/* Alarobia */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft border border-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-2xl text-primary">
                  calendar_month
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light">
                Tonga mivavaka Alarobia
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light p-3 transition-all duration-200"
                  htmlFor={`wed-${opt.value}`}
                >
                  <input
                    className="sr-only"
                    id={`wed-${opt.value}`}
                    name="wednesday-worship"
                    type="radio"
                    value={opt.value}
                    checked={pratiqueData.mercredi_soir === opt.value}
                    onChange={(e) =>
                      handlePratiqueChange("mercredi_soir", e.target.value)
                    }
                  />
                  <span className="text-base font-medium text-text-light">
                    {opt.label}
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light transition-colors">
                    <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                  </div>
                </label>
              ))}
            </div>
            <FormError
              message={errors?.["pratique_religieuse.mercredi_soir"]}
            />
          </div>

          {/* Zoma */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft border border-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-2xl text-primary">
                  calendar_month
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light">
                Tonga mivavaka Zoma
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light p-3 transition-all duration-200"
                  htmlFor={`fri-${opt.value}`}
                >
                  <input
                    className="sr-only"
                    id={`fri-${opt.value}`}
                    name="friday-worship"
                    type="radio"
                    value={opt.value}
                    checked={pratiqueData.vendredi_soir === opt.value}
                    onChange={(e) =>
                      handlePratiqueChange("vendredi_soir", e.target.value)
                    }
                  />
                  <span className="text-base font-medium text-text-light">
                    {opt.label}
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light transition-colors">
                    <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                  </div>
                </label>
              ))}
            </div>
            <FormError
              message={errors?.["pratique_religieuse.vendredi_soir"]}
            />
          </div>

          {/* Sabata Maraina */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft border border-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-2xl text-primary">
                  church
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light">
                Tonga mivavaka Sabata maraina
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light p-3 transition-all duration-200"
                  htmlFor={`sab-morn-${opt.value}`}
                >
                  <input
                    className="sr-only"
                    id={`sab-morn-${opt.value}`}
                    name="sabbath-morning-worship"
                    type="radio"
                    value={opt.value}
                    checked={pratiqueData.samedi_matin === opt.value}
                    onChange={(e) =>
                      handlePratiqueChange("samedi_matin", e.target.value)
                    }
                  />
                  <span className="text-base font-medium text-text-light">
                    {opt.label}
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light transition-colors">
                    <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                  </div>
                </label>
              ))}
            </div>
            <FormError
              message={errors?.["pratique_religieuse.samedi_matin"]}
            />
          </div>

          {/* Sabata Hariva */}
          <div className="bg-subtle-light rounded-2xl p-4 shadow-soft border border-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-2xl text-primary">
                  prayer_times
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light">
                Tonga mivavaka Sabata hariva
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light p-3 transition-all duration-200"
                  htmlFor={`sab-eve-${opt.value}`}
                >
                  <input
                    className="sr-only"
                    id={`sab-eve-${opt.value}`}
                    name="sabbath-evening-worship"
                    type="radio"
                    value={opt.value}
                    checked={pratiqueData.samedi_soir === opt.value}
                    onChange={(e) =>
                      handlePratiqueChange("samedi_soir", e.target.value)
                    }
                  />
                  <span className="text-base font-medium text-text-light">
                    {opt.label}
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light transition-colors">
                    <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                  </div>
                </label>
              ))}
            </div>
            <FormError
              message={errors?.["pratique_religieuse.samedi_soir"]}
            />
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2">
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