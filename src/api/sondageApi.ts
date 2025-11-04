
import type { SondageData } from "../features/Sondage/types/sondageShema";
// --- Définition des types pour les données de l'API ---

export interface Poste {
  id_poste: number;
  nom_poste_mg: string;
  categorie: string;
}

export interface Competence {
  id_competence: number;
  nom_competence_mg: string;
  categorie: string;
}

// --- Mocks pour GET ---

// Mock des postes (responsabilités)
export const getPostes = async (): Promise<Poste[]> => {
  console.log("API MOCK: getPostes()");
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id_poste: 1, nom_poste_mg: "Mozika", categorie: "Musique" },
          { id_poste: 2, nom_poste_mg: "Fitarihana Tanora", categorie: "Jeunesse" },
          { id_poste: 3, nom_poste_mg: "Fitarihana Ankizy", categorie: "Education" },
          { id_poste: 4, nom_poste_mg: "Asa soa", categorie: "Diaconie" },
          { id_poste: 5, nom_poste_mg: "Fampianarana", categorie: "Education" },
          { id_poste: 6, nom_poste_mg: "Fikirakirana Teknika", categorie: "Technique" },
          { id_poste: 7, nom_poste_mg: "Fandraisambahiny", categorie: "Diaconie" },
        ]),
      500
    )
  );
};

// Mock des compétences (talents)
export const getCompetences = async (): Promise<Competence[]> => {
  console.log("API MOCK: getCompetences()");
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id_competence: 1, nom_competence_mg: "Fitarihana", categorie: "Leadership" },
          { id_competence: 2, nom_competence_mg: "Fampianarana", categorie: "Enseignement" },
          { id_competence: 3, nom_competence_mg: "Fihirana", categorie: "Artistique" },
          { id_competence: 4, nom_competence_mg: "Manampy ny hafa", categorie: "Social" },
          { id_competence: 5, nom_poste_mg: "Fifandraisana", categorie: "Social" },
          { id_competence: 6, nom_poste_mg: "Fampiofanana", categorie: "Enseignement" },
        ]),
      500
    )
  );
};

// --- Vraie soumission POST ---

const API_BASE_URL = "https://votreserveur.com/api"; // Remplacez par votre URL

/**
 * Transforme les données du formulaire front-end pour correspondre
 * exactement à la structure attendue par l'API (basée sur les tables SQL).
 */
const transformerDonneesPourApi = (data: SondageData) => {
  const payload = {
    // Table 'membres'
    membre: data.membre,
    // Table 'responsabilites'
    responsabilites: [
      ...(data.responsabilites_passees || []),
      ...data.responsabilites_souhaitees,
    ],
    // Table 'membres_competences'
    competences: data.competences,
    // ... on peut ajouter competences_autres ici si le backend le gère
    
    // Table 'exigences_religieuses'
    exigences: data.exigences,
    
    // Table 'references'
    reference: data.reference,
    
    // Table 'consentements'
    consentement: data.consentement,

    // Champs divers (à adapter)
    remarques: data.remarques,
  };
  return payload;
};

export const submitSondage = async (data: SondageData) => {
  const payload = transformerDonneesPourApi(data);
  console.log("Envoi des données à l'API:", payload);

  // Décommentez pour envoyer réellement
  /*
  try {
    const response = await axios.post(`${API_BASE_URL}/sondage`, payload);
    console.log("Réponse de l'API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    throw error;
  }
  */

  // Simuler une réponse réussie
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("API MOCK: Soumission réussie");
      resolve({ success: true, message: "Données enregistrées" });
    }, 1000)
  );
};