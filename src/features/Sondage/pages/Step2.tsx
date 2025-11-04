interface propsT {
  modifyStep: (step: number) => void;
   setTitle:(title:string)=>void;
}

import React, { useEffect, useState, type ReactNode } from "react";

// Composant pour l'étape 2: Expérience d'Église
export default function Step2({ modifyStep,setTitle }: propsT) {
  const nextStep = () => {
    modifyStep(3);
  };

  const previousStep = () => {
    modifyStep(1);
  };

  // Définition des options pour les responsabilités désirées
  const initialDesiredResponsibilities = [
    { name: "Mozika", selected: true },
    { name: "Fitarihana Tanora", selected: false },
    { name: "Fitarihana Ankizy", selected: false },
    { name: "Asa soa", selected: true },
    { name: "Fampianarana", selected: false },
    { name: "Fikirakirana Teknika", selected: false },
    { name: "Fandraisambahiny", selected: false },
  ];

  // État pour gérer la sélection des responsabilités désirées
  const [desiredResponsibilities, setDesiredResponsibilities] = useState(
    initialDesiredResponsibilities
  );

  // Fonction pour basculer la sélection d'une puce (chip)
  const toggleResponsibility = (name: string) => {
    setDesiredResponsibilities((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, selected: !item.selected } : item
      )
    );
  };

  useEffect(() => {
    setTitle("Traikefa sy Asa efa natao tao amin’ny fiangonana");
  }, []);

  // Liste des responsabilités actuelles (simulées)
  const [currentResponsibilities, setCurrentResponsibilities] = useState([
    "Mpapianatra Sekoly Sabata",
    "Membre Chorale",
  ]);

  // Style de carte simplifié pour le mode clair
  const Card = ({ children }: { children: ReactNode }) => (
    <div className="bg-white rounded-xl p-5 border border-border-light shadow-md shadow-primary/5 border-l-4 border-l-primary">
      {children}
    </div>
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased bg-subtle-light font-display">
      {/* Form Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Previous Responsibilities (Select) */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Andraikitra efa nosahanina
          </h2>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70 pointer-events-none">
              history
            </span>
            <select className="flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-10 text-base font-normal leading-normal shadow-sm appearance-none">
              <option disabled selected>
                Safidio
              </option>
              <option>Sekretera</option>
              <option>Mpitambola</option>
              <option>Filohan'ny Tanora</option>
              <option>Loholona</option>
              <option>Diakona</option>
              <option>Mampianatra Sekoly Sabata</option>
              <option>Filohan'ny Mpisavalalana</option>
              <option>Hafa</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 text-text-light/60 pointer-events-none">
              expand_more
            </span>
          </div>
        </Card>

        {/* Desired Responsibilities (Chips) */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Andraikitra Tiana ho sahanina
          </h2>
          <p className="text-sm text-text-light/70 pb-4">
            Safidio izay mety aminao
          </p>
          <div className="flex flex-wrap gap-2">
            {desiredResponsibilities.map((item) => (
              <button
                key={item.name}
                onClick={() => toggleResponsibility(item.name)}
                className={`
                  inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors
                  ${
                    item.selected
                      ? "bg-primary text-white border border-primary shadow-sm"
                      : "bg-transparent text-text-light border border-border-light hover:bg-subtle-light/50"
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Past Church Experience (Detailed Input) */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Traikefa tany @ fiangonana Niavina
          </h2>
          <div className="space-y-4">
            {/* Church Name */}
            <div>
              <label
                className="text-sm font-medium text-text-light"
                htmlFor="church-name"
              >
               Anaran’ny fiangonana
              </label>
              <input
                className="mt-1 block w-full rounded-lg bg-subtle-light border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary focus:bg-white"
                id="church-name"
                placeholder="e.g. SDA Antarandolo"
                type="text"
              />
            </div>

            {/* Church Type */}
            <div>
              <label className="text-sm font-medium text-text-light">
                Karazana Fiangonana
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <label
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-3 text-sm has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
                  htmlFor="organized"
                >
                  <input
                    className="sr-only"
                    id="organized"
                    name="church-type"
                    type="radio"
                    value="organized"
                  />
                  Fiangonan-dehibe
                </label>
                <label
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-3 text-sm has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
                  htmlFor="group"
                >
                  <input
                    className="sr-only"
                    id="group"
                    name="church-type"
                    type="radio"
                    value="group"
                  />
                  Zanam-piangonana
                </label>
              </div>
            </div>

            {/* Responsibility */}
            <div>
              <label
                className="text-sm font-medium text-text-light"
                htmlFor="responsibility"
              >
                Andraikitra
              </label>
              <input
                className="mt-1 block w-full rounded-lg bg-subtle-light border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary focus:bg-white"
                id="responsibility"
                placeholder="e.g. Diakona"
                type="text"
              />
            </div>

            {/* Start/End Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="text-sm font-medium text-text-light"
                  htmlFor="start-year"
                >
                  Taona nanombohana
                </label>
                <input
                  className="mt-1 block w-full rounded-lg bg-subtle-light border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary focus:bg-white"
                  id="start-year"
                  placeholder="YYYY"
                  type="number"
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
                  className="mt-1 block w-full rounded-lg bg-subtle-light border border-subtle-light h-12 px-4 text-text-light focus:ring-primary/50 focus:border-primary focus:bg-white"
                  id="end-year"
                  placeholder="YYYY"
                  type="number"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                className="text-sm font-medium text-text-light"
                htmlFor="notes"
              >
               Zava-bita manokana / Traikefa manan-danja
              </label>
              <textarea
                className="mt-1 block w-full rounded-lg bg-subtle-light border border-subtle-light p-4 text-text-light min-h-24 resize-none focus:ring-primary/50 focus:border-primary focus:bg-white"
                id="notes"
                placeholder="Fanamarihana hafa..."
              ></textarea>
            </div>
          </div>
        </Card>

        {/* Current Responsibilities (List) */}
        <Card>
          <h2 className="text-base font-semibold leading-normal text-text-light pb-3">
            Andraikitra Ankehitriny
          </h2>
          <div className="space-y-3">
            {currentResponsibilities.map((resp, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-subtle-light p-3"
              >
                <p className="text-text-light">{resp}</p>
                <button
                  onClick={() => {
                    /* Logique pour supprimer la responsabilité */
                  }}
                  className="text-text-light/50 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/50 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
            <span className="material-symbols-outlined">add</span>
            Hanampy Hafa
          </button>
        </Card>
      </main>

      {/* Bottom Action Buttons */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <div className="flex gap-4">
          <button
            onClick={() => previousStep()}
            className="flex-1 rounded-xl bg-subtle-light px-6 py-4 text-lg font-bold text-primary shadow-sm transition-colors hover:bg-subtle-light/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Hiverina
          </button>
          <button
            onClick={() => nextStep()}
            className="flex-1 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Manaraka
          </button>
        </div>
      </footer>
    </div>
  );
}
