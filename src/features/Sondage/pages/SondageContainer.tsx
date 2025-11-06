import { useState } from "react";
import TopAppBar from "../components/TopAppBar";

import { submitSondage } from "../../../api/sondageApi";
import { sondageSchema, stepSchemas, type SondageData } from "../types/sondageShema";
import Summary from "./Summary";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";


export default function SondageContainer() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("Fampahalalana fototra");
  const [formData, setFormData] = useState<Partial<SondageData>>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateData = (update: Partial<SondageData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
    if (Object.keys(errors).length > 0) {
       setErrors({});
    }
  };

  const validateStep = (stepToValidate: number): boolean => {
    const schemaToValidate = stepSchemas[stepToValidate];
    if (!schemaToValidate) return true; // Sécurité
    
    // Fournir des valeurs par défaut pour les objets imbriqués
    const dataToValidate = {
      membre: formData.membre || {},
      pratique_religieuse: formData.pratique_religieuse || {}, // Ajouté
      responsabilites_souhaitees: formData.responsabilites_souhaitees || [],
      responsabilites_souhaitees_autres: formData.responsabilites_souhaitees_autres || [],
      responsabilites_passees: formData.responsabilites_passees || [],
      competences: formData.competences || [],
      competences_autres: formData.competences_autres || [],
      exigences: formData.exigences || {},
      consentement: formData.consentement || {},
      reference: formData.reference || {},
      remarques: formData.remarques || "",
    };

    const result = schemaToValidate.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.');
        fieldErrors[fieldName] = issue.message;
      });
      console.log(`Erreurs de validation (Étape ${stepToValidate}):`, fieldErrors);
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const modifyStep = (_step: number) => {
    if (_step > step) {
      if (!validateStep(step)) {
        return; 
      }
    }
    setStep(_step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    // Validation finale de TOUTES les étapes
    for (let i = 1; i <= 6; i++) {
      if (!validateStep(i)) {
        setIsSubmitting(false);
        // Ramener à la première étape avec une erreur
        setStep(i);
        console.log(`Validation finale échouée à l'étape ${i}`);
        return;
      }
    }

    const finalData: Partial<SondageData> = {
      ...formData,
      consentement: {
        ...formData.consentement,
        consentement: 'Accepté',
        date_consentement: new Date().toISOString(),
      },
    };

    // Validation finale avec le schéma global
    const result = sondageSchema.safeParse(finalData);

    if (!result.success) {
      console.error("Erreurs soumission (Schéma Global):", result.error.flatten().fieldErrors);
      setErrors(result.error.flatten().fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // 2. Soumission API
    try {
      await submitSondage(result.data as SondageData);
      setFormData(result.data);
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ global: "Tsy nandaitra ny fandefasana. Mba avereno azafady." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = {
    modifyStep: modifyStep,
    setTitle: setTitle,
    updateData: handleUpdateData,
    formData: formData,
    errors: errors,
  };

  if (isSubmitted) {
    return (
      <div>
        <TopAppBar step={7} totalSteps={6} title={"Famaranana"} />
        <Summary data={formData as SondageData} />
      </div>
    );
  }

  return (
    <div>
      <TopAppBar step={step} totalSteps={6} title={title} />
      {step === 1 && <Step1 {...stepProps} />}
      {step === 2 && <Step2 {...stepProps} />}
      {step === 3 && <Step3 {...stepProps} />}
      {step === 4 && <Step4 {...stepProps} />}
      {step === 5 && <Step5 {...stepProps} />}
      {step === 6 && (
        <Step6
          {...stepProps}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}