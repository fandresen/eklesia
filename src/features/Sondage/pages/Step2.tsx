import { useEffect } from "react";
import type { SondageData } from "../types/sondageShema";

interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
  updateData?: (data: Partial<SondageData>) => void;
  formData?: Partial<SondageData>;
  errors?: any; // Objet pour les erreurs
}

export default function Step2({
  modifyStep,
  setTitle,
}: propsT) {
  const nextStep = () => modifyStep(3);
  const previousStep = () => modifyStep(1);
  useEffect(() => {
    setTitle("Toe-piainana ara-pivavahana");
  }, [setTitle]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden antialiased">
      <main className="flex-grow px-4 py-6">
        <div className="space-y-6">
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-2xl p-4 shadow-soft border border-transparent dark:border-border-dark/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="material-symbols-outlined text-2xl text-primary dark:text-primary/90">
                  calendar_month
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark">
                Tonga mivavaka Alarobia
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="wed-always"
              >
                <input
                  className="sr-only"
                  id="wed-always"
                  name="wednesday-worship"
                  type="radio"
                  value="always"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tonga tsy tapaka
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="wed-sometimes"
              >
                <input
                  className="sr-only"
                  id="wed-sometimes"
                  name="wednesday-worship"
                  type="radio"
                  value="sometimes"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Mahalana
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="wed-never"
              >
                <input
                  className="sr-only"
                  id="wed-never"
                  name="wednesday-worship"
                  type="radio"
                  value="never"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tsy tonga mihitsy
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-2xl p-4 shadow-soft border border-transparent dark:border-border-dark/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="material-symbols-outlined text-2xl text-primary dark:text-primary/90">
                  calendar_month
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark">
                Tonga mivavaka Zoma
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="fri-always"
              >
                <input
                  className="sr-only"
                  id="fri-always"
                  name="friday-worship"
                  type="radio"
                  value="always"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tonga tsy tapaka
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="fri-sometimes"
              >
                <input
                  className="sr-only"
                  id="fri-sometimes"
                  name="friday-worship"
                  type="radio"
                  value="sometimes"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Mahalana
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="fri-never"
              >
                <input
                  className="sr-only"
                  id="fri-never"
                  name="friday-worship"
                  type="radio"
                  value="never"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tsy tonga mihitsy
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-2xl p-4 shadow-soft border border-transparent dark:border-border-dark/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="material-symbols-outlined text-2xl text-primary dark:text-primary/90">
                  church
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark">
                Tonga mivavaka Sabata maraina
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-morn-always"
              >
                <input
                  className="sr-only"
                  id="sab-morn-always"
                  name="sabbath-morning-worship"
                  type="radio"
                  value="always"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tonga tsy tapaka
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-morn-sometimes"
              >
                <input
                  className="sr-only"
                  id="sab-morn-sometimes"
                  name="sabbath-morning-worship"
                  type="radio"
                  value="sometimes"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Mahalana
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-morn-never"
              >
                <input
                  className="sr-only"
                  id="sab-morn-never"
                  name="sabbath-morning-worship"
                  type="radio"
                  value="never"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tsy tonga mihitsy
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-2xl p-4 shadow-soft border border-transparent dark:border-border-dark/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="material-symbols-outlined text-2xl text-primary dark:text-primary/90">
                  prayer_times
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark">
                Tonga mivavaka Sabata hariva
              </h2>
            </div>
            <div className="space-y-3 pl-2">
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-eve-always"
              >
                <input
                  className="sr-only"
                  id="sab-eve-always"
                  name="sabbath-evening-worship"
                  type="radio"
                  value="always"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tonga tsy tapaka
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-eve-sometimes"
              >
                <input
                  className="sr-only"
                  id="sab-eve-sometimes"
                  name="sabbath-evening-worship"
                  type="radio"
                  value="sometimes"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Mahalana
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
              <label
                className="radio-card flex cursor-pointer items-center justify-between rounded-xl border border-border-light dark:border-border-dark p-3 transition-all duration-200"
                htmlFor="sab-eve-never"
              >
                <input
                  className="sr-only"
                  id="sab-eve-never"
                  name="sabbath-evening-worship"
                  type="radio"
                  value="never"
                />
                <span className="text-base font-medium text-text-light dark:text-text-dark">
                  Tsy tonga mihitsy
                </span>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-border-light dark:border-border-dark transition-colors">
                  <div className="radio-dot size-3 scale-0 rounded-full bg-primary transition-transform"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={previousStep} className="flex w-1/3 items-center justify-center rounded-xl border border-border-light dark:border-border-dark bg-subtle-light dark:bg-subtle-dark px-4 py-4 text-lg font-bold text-text-light dark:text-text-dark shadow-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
            Back
          </button>
          <button onClick={nextStep} className="flex flex-1 items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
