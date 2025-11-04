import React from "react";
import { Link } from "react-router-dom";
import type { SondageData } from "../types/sondageShema";

interface propsT {
  data: SondageData;
}

// Un simple helper pour afficher les données
const DataRow = ({ label, value }: { label: string; value: any }) => (
  <div className="py-2 border-b">
    <strong className="text-text-light/60">{label}:</strong>
    <span className="text-text-light ml-2">
      {typeof value === "boolean" ? (value ? "Eny" : "Tsia") : value || "-"}
    </span>
  </div>
);

export default function Summary({ data }: propsT) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col antialiased bg-background-light font-display">
      <main className="flex-grow px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl p-5 border border-green-500 shadow-md">
          <h2 className="text-xl font-semibold text-green-700 pb-3 text-center">
            Misaotra Tompoko!
          </h2>
          <p className="text-text-light text-center">
            Voaray soa aman-tsara ny fampahalalana nomenao.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-primary pb-2">
            Famintinana ny valiny:
          </h3>
          {/* Step 1 Data */}
          <DataRow label="Anarana feno" value={data.membre.nom_complet} />
          <DataRow label="Daty Nahaterahana" value={data.membre.date_naissance} />
          <DataRow label="Lahy/Vavy" value={data.membre.sexe} />
          <DataRow label="Taona Batisa" value={data.membre.annee_bapteme} />
          <DataRow label="Email" value={data.membre.email} />

          {/* Step 2 Data */}
          <DataRow
            label="Andraikitra tiana"
            value={data.responsabilites_souhaitees.length + " safidy"}
          />
          
          {/* Step 3 Data */}
          <DataRow
            label="Talenta"
            value={data.competences.length + " safidy"}
          />

          {/* Step 4 Data */}
          <DataRow
            label="Mavitrika"
            value={data.exigences.actif_vie_religieuse}
          />
          <DataRow
            label="Vonona 2026"
            value={data.exigences.disponible_2026}
          />

          {/* Step 5 Data */}
          <DataRow label="Referant" value={data.reference?.nom_referent} />
          <DataRow label="Fanamarihana" value={data.remarques} />
        </div>

        <div className="p-4">
          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90"
          >
            Hiverina eo am-piandohana
          </Link>
        </div>
      </main>
    </div>
  );
}