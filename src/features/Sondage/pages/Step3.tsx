interface propsT {
  modifyStep: (step: number) => void;
   setTitle:(title:string)=>void;
}

import React, { useEffect, useState } from "react";

// Structure des talents pour le state (avec des noms d'icônes)
const initialTalents = [
  { name: "Fitarihana", icon: "groups", value: "Fitarihana", selected: false },
  {
    name: "Fampianarana",
    icon: "school",
    value: "Fampianarana",
    selected: false,
  },
  { name: "Fihirana", icon: "music_note", value: "Fihirana", selected: false },
  {
    name: "Manampy ny hafa",
    icon: "volunteer_activism",
    value: "helping",
    selected: false,
  },
  {
    name: "Fifandraisana",
    icon: "campaign",
    value: "communication",
    selected: false,
  },
  {
    name: "Fampianarana",
    icon: "model_training",
    value: "training",
    selected: false,
  },
];

export default function Step3({ modifyStep,setTitle }: propsT) {
  const [talents, setTalents] = useState(initialTalents);
  const [otherTalents, setOtherTalents] = useState("");

  // Fonction pour basculer la sélection d'un talent
  const toggleTalent = (value) => {
    setTalents((prev) =>
      prev.map((talent) =>
        talent.value === value
          ? { ...talent, selected: !talent.selected }
          : talent
      )
    );
  };

  const nextStep = () => {
    modifyStep(4);
  };

  const previousStep = () => {
    modifyStep(2);
  };

  // Style CSS personnalisé intégré pour le feedback de sélection
  // Ceci est conservé pour reproduire le ':has(input:checked)' original
  const customStyles = `
    .talent-card:has(input:checked) {
        border-color: #003366;
        background-color: rgba(0, 51, 102, 0.1);
        color: #003366;
    }
    .talent-card:has(input:checked) .material-symbols-outlined {
        color: #003366;
    }
    .talent-bg {
        background: linear-gradient(180deg, #FFFFFF 0%, #F0F4F8 100%);
    }
  `;
  useEffect(() => {
    setTitle("Fahaiza-manao sy Talenta manokana");
  }, []);

  return (
    // J'utilise bg-background-light pour le wrapper principal pour plus de simplicité,
    // en supposant que le style de dégradé est appliqué globalement ou sur le body
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

        {/* Talent Grid */}
        <div className="grid grid-cols-2 gap-4">
          {talents.map((talent) => (
            <label
              key={talent.value}
              className={`
                talent-card flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-border-light bg-subtle-light p-4 text-center text-text-light/80 shadow-soft transition-all duration-200
                ${talent.selected ? "is-checked" : ""}
              `}
              onClick={() => toggleTalent(talent.value)}
            >
              <input
                className="sr-only"
                name="talents"
                type="checkbox"
                value={talent.value}
                checked={talent.selected}
                onChange={() => {}} // Nécessaire pour React, géré par onClick sur le label
              />
              <span className="material-symbols-outlined text-3xl text-primary/70">
                {talent.icon}
              </span>
              <span className="text-sm font-medium">{talent.name}</span>
            </label>
          ))}
        </div>

        {/* Other Talents Input */}
        <div className="flex flex-col pt-4">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="other-talents"
          >
            Fahaiza-manao Hafa
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              add_circle
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="other-talents"
              placeholder="e.g. Cooking, Graphic Design,..."
              value={otherTalents}
              onChange={(e) => setOtherTalents(e.target.value)}
              type="text"
            />
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
