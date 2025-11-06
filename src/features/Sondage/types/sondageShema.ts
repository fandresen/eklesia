import { z } from "zod";

// --- Schémas partiels pour les tables ---

// 1. Membres (Step 1)
const membreSchema = z.object({
  nom_complet: z.string().min(3, "Ny anarana feno dia tsy maintsy fenoina"),
  date_naissance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Daty tsy marina"),
  sexe: z.enum(["Homme", "Femme"], {
    errorMap: () => ({ message: "Safidio ny lahy na vavy" }),
  }),
  annee_bapteme: z.number().optional(), 
  date_exacte_bapteme: z.string().optional(),
  souvenir_date_bapteme: z.enum(["Oui", "Non"]).default("Oui"),
  adresse: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email("Email tsy marina").optional().or(z.literal("")),
})
.refine(data => {
    if (data.souvenir_date_bapteme === 'Oui') {
        return data.date_exacte_bapteme && data.date_exacte_bapteme.length > 0;
    }
    if (data.souvenir_date_bapteme === 'Non') {
        return data.annee_bapteme !== undefined;
    }
    return true;
}, {
    message: "Fenoina ny daty na ny taona nanaovana batisa",
    path: ["annee_bapteme"], 
})
.refine(data => {
    if (data.souvenir_date_bapteme === 'Non' && data.annee_bapteme !== undefined) {
        return data.annee_bapteme >= 1900 && data.annee_bapteme <= new Date().getFullYear();
    }
    if (data.souvenir_date_bapteme === 'Oui' && data.date_exacte_bapteme) {
        const year = new Date(data.date_exacte_bapteme).getFullYear();
        if (isNaN(year)) return false;
        return year >= 1900 && year <= new Date().getFullYear();
    }
    return true; 
}, {
    message: "Ny taona dia tsy maintsy marina (1900 - ankehitriny)",
    path: ["annee_bapteme"],
});


//Step 2
// const exigencesSchema2 = z.object({
//   actif_vie_religieuse: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
//   conformite_principes: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
//   disponible_2026: z.enum(["Oui", "Non", "Je ne sais pas"], { errorMap: () => ({ message: "Valio azafady" }) }),
//   facilement_joignable: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
// });


// 2. Responsabilités (Step 2)
export const responsabilitePasseeSchema = z.object({
  id_poste: z.number().optional(), // L'ID n'est plus requis
  nom_poste_personnalise: z.string().optional(), // Champ pour "Hafa"
  type_experience: z.literal("Assumé"),
  eglise: z.string().min(1, "Anaran'ny fiangonana"),
  type_eglise: z.enum(["Église principale", "Église annexe"]),
  annee_debut: z.number({required_error: "Taona fenoina"}),
  annee_fin: z.number().optional(),
  realisations: z.string().optional(),
}).refine(data => {
    // Il faut soit un id_poste, soit un nom personnalisé
    return data.id_poste !== undefined || (data.nom_poste_personnalise && data.nom_poste_personnalise.length > 0);
}, {
    message: "Tsy maintsy misafidy andraikitra ianao na manoratra 'Hafa'",
    path: ["id_poste"],
});


// 3. Compétences (Step 3)
// Schéma pour UN SEUL talent/compétence
const membreCompetenceSchema = z.object({
  id_competence: z.number(),
});

// Schéma pour L'ÉTAPE 3
const step3Schema = z.object({
    competences: z.array(membreCompetenceSchema), 
    
    competences_autres: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      // Vérifie si on a coché au moins une compétence
      const hasSelection = data.competences && data.competences.length > 0;
      // Vérifie si on a écrit au moins un talent "Hafa"
      const hasCustom =
        data.competences_autres && data.competences_autres.length > 0;
      // Doit avoir l'un OU l'autre
      return hasSelection || hasCustom;
    },
    {
      message: "Safidio farafahakeliny talenta iray na ampidiro ao @ 'Hafa'",
      path: ["competences"],
    }
  );


// 4. Exigences (Step 4)
const exigencesSchema = z.object({
  actif_vie_religieuse: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
  conformite_principes: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
  disponible_2026: z.enum(["Oui", "Non", "Je ne sais pas"], { errorMap: () => ({ message: "Valio azafady" }) }),
  facilement_joignable: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
});

// 5. Références et Consentement (Step 5)
const referenceSchema = z.object({
  nom_referent: z.string().min(1, "Fenoina"),
  fonction_referent: z.string().optional(),
  telephone_referent: z.string().optional(),
});

const consentementSchema = z.object({
  consentement: z.literal("Accepté", {
    errorMap: () => ({ message: "Tsy maintsy manaiky ianao" }),
  }),
  date_consentement: z.string(),
  photo: z.any().optional(),
});

// --- Schéma Global ---
export const sondageSchema = z.object({
  membre: membreSchema,
  responsabilites_passees: z.array(responsabilitePasseeSchema).optional(),
  responsabilites_souhaitees: z
    .array(responsabiliteSouhaiteeSchema)
    .min(1, "Safidio farafahakeliny andraikitra iray tianao sahanina"),
  
  competences: z.array(membreCompetenceSchema),
  
  competences_autres: z.array(z.string()).optional(),

  exigences: exigencesSchema,
  reference: referenceSchema.optional(),
  consentement: consentementSchema,
  remarques: z.string().optional(),
});
export type SondageData = z.infer<typeof sondageSchema>;

// --- Schémas par étape ---
export const stepSchemas = {
  1: z.object({ membre: membreSchema }),
  2: z.object({
    // responsabilites_souhaitees: z
    //   .array(responsabiliteSouhaiteeSchema)
    //   .min(1, "Safidio farafahakeliny andraikitra iray tianao sahanina"),
    // responsabilites_passees: z
    //   .array(responsabilitePasseeSchema)
    //   .optional(),
  }),
  3: step3Schema, 
  4: z.object({ exigences: exigencesSchema }),
  5: z.object({
    reference: referenceSchema.optional(),
    consentement: consentementSchema,
    remarques: z.string().optional(),
  }),
};