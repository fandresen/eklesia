import { z } from "zod";

// --- Types de Base (par table) ---

// ÉTAPE 1: Table 'membres'
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
  // Champs ajoutés depuis le SQL
  eglise_actuelle: z.string().min(1, "Fenoina ny fiangonana ankehitriny"),
  eglise_precedente: z.string().optional(),
})
.refine(data => {
    // Valide la logique de la date/année de baptême
    if (data.souvenir_date_bapteme === 'Oui') {
        return data.date_exacte_bapteme && data.date_exacte_bapteme.length > 0;
    }
    if (data.souvenir_date_bapteme === 'Non') {
        return data.annee_bapteme !== undefined && data.annee_bapteme > 1900;
    }
    return true;
}, {
    message: "Fenoina ny daty na ny taona nanaovana batisa",
    path: ["annee_bapteme"], 
});

// ÉTAPE 2: Table 'pratique_religieuse'
const pratiqueReligieuseSchema = z.object({
  mercredi_soir: z.enum(["Fréquente", "Régulièrement", "Rarement", "N'y va jamais"], { errorMap: () => ({ message: "Valio azafady" }) }),
  vendredi_soir: z.enum(["Fréquente", "Régulièrement", "Rarement", "N'y va jamais"], { errorMap: () => ({ message: "Valio azafady" }) }),
  samedi_matin: z.enum(["Fréquente", "Régulièrement", "Rarement", "N'y va jamais"], { errorMap: () => ({ message: "Valio azafady" }) }),
  samedi_soir: z.enum(["Fréquente", "Régulièrement", "Rarement", "N'y va jamais"], { errorMap: () => ({ message: "Valio azafady" }) }),
});

// ÉTAPE 3: Table 'responsabilites'
export const responsabilitePasseeSchema = z.object({
  id_poste: z.number().optional(),
  // Le backend n'a pas ce champ, on le gère côté client mais on envoie l'ID
  // Pour l'instant, on garde la structure de la table
  nom_poste_personnalise: z.string().optional(),
  type_experience: z.literal("Assumé"),
  eglise: z.string().min(1, "Anaran'ny fiangonana"),
  type_eglise: z.enum(["Église principale", "Église annexe"]),
  annee_debut: z.number({required_error: "Taona fenoina"}),
  annee_fin: z.number().optional(),
  realisations: z.string().optional(),
}).refine(data => {
    return data.id_poste !== undefined || (data.nom_poste_personnalise && data.nom_poste_personnalise.length > 0);
}, {
    message: "Tsy maintsy misafidy andraikitra ianao na manoratra 'Hafa'",
    path: ["id_poste"],
});
export type ResponsabilitePassee = z.infer<typeof responsabilitePasseeSchema>;

const responsabiliteSouhaiteeSchema = z.object({
  id_poste: z.number(),
  type_experience: z.literal("Souhaite assumer"),
});

// ÉTAPE 4: Table 'membres_competences'
const membreCompetenceSchema = z.object({
  id_competence: z.number(),
});

// ÉTAPE 5: Table 'exigences_religieuses'
const exigencesSchema = z.object({
  actif_vie_religieuse: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
  conformite_principes: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
  disponible_2026: z.enum(["Oui", "Non", "Je ne sais pas"], { errorMap: () => ({ message: "Valio azafady" }) }),
  facilement_joignable: z.enum(["Oui", "Non"], { errorMap: () => ({ message: "Valio azafady" }) }),
});

// ÉTAPE 6: Tables 'references' & 'consentements'
const referenceSchema = z.object({
  nom_referent: z.string().min(1, "Fenoina"),
  fonction_referent: z.string().optional(),
  telephone_referent: z.string().optional(),
});
const consentementSchema = z.object({
  consentement: z.literal("Accepté", {
    errorMap: () => ({ message: "Tsy maintsy manaiky ianao" }),
  }),
  date_consentement: z.string(), // Sera rempli à la soumission
  photo: z.any().optional(),
});

// --- Schéma Global (pour la soumission) ---
// Ce schéma combine TOUTES les données
export const sondageSchema = z.object({
  membre: membreSchema,
  pratique_religieuse: pratiqueReligieuseSchema,
  responsabilites_passees: z.array(responsabilitePasseeSchema).optional(),
  responsabilites_souhaitees: z.array(responsabiliteSouhaiteeSchema).optional(),
  responsabilites_souhaitees_autres: z.array(z.string()).optional(), // "Hafa" pour Step 3
  competences: z.array(membreCompetenceSchema).optional(),
  competences_autres: z.array(z.string()).optional(), // "Hafa" pour Step 4
  exigences: exigencesSchema,
  reference: referenceSchema.optional(),
  consentement: consentementSchema,
  remarques: z.string().optional(),
});

export type SondageData = z.infer<typeof sondageSchema>;

// --- Schémas par étape (pour la validation) ---
export const stepSchemas: { [key: number]: z.ZodType<any> } = {
  // Étape 1: Fampahalalana fototra
  1: z.object({ 
    membre: membreSchema 
  }),
  
  // Étape 2: Pratique religieuse
  2: z.object({ 
    pratique_religieuse: pratiqueReligieuseSchema 
  }),
  
  // Étape 3: Traikefa (Responsabilites)
  3: z.object({
      responsabilites_souhaitees: z.array(responsabiliteSouhaiteeSchema),
      responsabilites_souhaitees_autres: z.array(z.string()).optional(),
      responsabilites_passees: z.array(responsabilitePasseeSchema).optional(),
    }).refine(data => {
        const hasSelection = data.responsabilites_souhaitees && data.responsabilites_souhaitees.length > 0;
        const hasCustom = data.responsabilites_souhaitees_autres && data.responsabilites_souhaitees_autres.length > 0;
        return hasSelection || hasCustom;
    }, {
        message: "Safidio farafahakeliny andraikitra iray tianao sahanina na ampidiro 'Hafa'",
        path: ["responsabilites_souhaitees"], // Erreur sur la section "Tiana"
    }),
  
  // Étape 4: Talenta (Competences)
  4: z.object({
      competences: z.array(membreCompetenceSchema), 
      competences_autres: z.array(z.string()).optional(),
    }).refine(data => {
        const hasSelection = data.competences && data.competences.length > 0;
        const hasCustom = data.competences_autres && data.competences_autres.length > 0;
        return hasSelection || hasCustom;
    }, {
        message: "Safidio farafahakeliny talenta iray na ampidiro ao @ 'Hafa'",
        path: ["competences"],
    }),

  // Étape 5: Fepetra (Exigences)
  5: z.object({ 
    exigences: exigencesSchema 
  }),
  
  // Étape 6: Fanekena (Consentement)
  6: z.object({
    reference: referenceSchema.optional(),
    consentement: consentementSchema,
    remarques: z.string().optional(),
  }),
};