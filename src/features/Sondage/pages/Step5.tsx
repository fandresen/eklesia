interface propsT {
  modifyStep: (step: number) => void;
  setTitle: (title: string) => void;
}
import React, { useEffect, useState } from "react";

export default function Step5({ setTitle, modifyStep }: propsT) {
  const [refName, setRefName] = useState("");
  const [refPosition, setRefPosition] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [signature, setSignature] = useState(""); // Pour simuler la signature
  const [date, setDate] = useState("");

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
    modifyStep(4);
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
                value={refName}
                onChange={(e) => setRefName(e.target.value)}
                type="text"
              />
            </div>
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
                value={refPosition}
                onChange={(e) => setRefPosition(e.target.value)}
                type="text"
              />
            </div>
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
                value={refPhone}
                onChange={(e) => setRefPhone(e.target.value)}
              />
            </div>
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
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
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
                onClick={() => setSignature("Your Signature Here")} // Simuler une action de signature
              >
                {signature || "Sign here"}
              </div>
            </div>
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button (Submit) */}
      <footer className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <button className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
          <span>Valider</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
        <button onClick={previousStep} className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-blend-lighten px-6 py-4 text-lg font-bold text-primary shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
          <span>Hiverina</span>
        </button>
      </footer>
    </div>
  );
}
