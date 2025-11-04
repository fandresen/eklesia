import { useState } from "react";
import TopAppBar from "../components/TopAppBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { submitSondage } from "../../../api/sondageApi";
import { sondageSchema, stepSchemas, type SondageData } from "../types/sondageShema";
import Summary from "./Summary";

export default function SondageContainer() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("Fampahalalana fototra");
  const [formData, setFormData] = useState<Partial<SondageData>>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour mettre à jour l'état partagé
  // (Utilisez 'deep merge' si vous avez des objets imbriqués comme 'membre')
  const handleUpdateData = (update: Partial<SondageData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
    // Optionnel: effacer les erreurs pour les champs mis à jour
    if (Object.keys(errors).length > 0) {
       setErrors({});
    }
  };

  const validateStep = (stepToValidate: number): boolean => {
    const schemaToValidate = stepSchemas[stepToValidate];
    
    // Zod ne valide pas 'undefined', on lui passe un objet vide s'il n'y a pas de données
    const dataToValidate = {
      membre: formData.membre || {},
      responsabilites_souhaitees: formData.responsabilites_souhaitees || [],
      competences: formData.competences || [],
      exigences: formData.exigences || {},
      consentement: formData.consentement || {},
      // ...etc pour les autres champs
    };

    const result = schemaToValidate.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        // 'path' est un tableau, ex: ['membre', 'nom_complet']
        const fieldName = issue.path.join('.');
        fieldErrors[fieldName] = issue.message;
      });
      console.log("Erreurs de validation:", fieldErrors);
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const modifyStep = (_step: number) => {
    // Si on avance, on valide l'étape actuelle
    if (_step > step) {
      if (!validateStep(step)) {
        return; // Arrêter si la validation échoue
      }
    }
    // Si on recule, on ne valide pas
    setStep(_step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    // 1. Validation finale du schéma complet
    // On ajoute la date de consentement juste avant de valider/soumettre
    const finalData = {
      ...formData,
      consentement: {
        ...formData.consentement,
        consentement: 'Accepté', // Assumé depuis le clic
        date_consentement: new Date().toISOString(),
      },
    };

    const result = sondageSchema.safeParse(finalData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.');
        fieldErrors[fieldName] = issue.message;
      });
      console.log("Erreurs soumission:", fieldErrors);
      setErrors(fieldErrors);
      setIsSubmitting(false);
      // Essayer de ramener à la première étape avec une erreur
      const firstErrorStep = Object.keys(stepSchemas).find(s => 
         stepSchemas[s].safeParse(finalData).success === false
      );
      if(firstErrorStep) setStep(Number(firstErrorStep));

      return;
    }

    // 2. Soumission API
    try {
      await submitSondage(result.data as SondageData);
      setFormData(result.data); // Stocker les données finales validées
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ global: "Tsy nandaitra ny fandefasana. Mba avereno azafady." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Props communes pour toutes les étapes ---
  const stepProps = {
    modifyStep: modifyStep,
    setTitle: setTitle,
    updateData: handleUpdateData,
    formData: formData, // Les données sont retenues !
    errors: errors,
  };

  // --- Affichage du résumé après soumission ---
  if (isSubmitted) {
    return (
      <div>
        <TopAppBar step={6} title={"Famaranana"} />
        <Summary data={formData as SondageData} />
      </div>
    );
  }

  // --- Affichage des étapes ---
  return (
    <div>
      <TopAppBar step={step} title={title} />
      {step === 1 && <Step1 {...stepProps} />}
      {step === 2 && <Step2 {...stepProps} />}
      {step === 3 && <Step3 {...stepProps} />}
      {step === 4 && <Step4 {...stepProps} />}
      {step === 5 && (
        <Step5
          {...stepProps}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}