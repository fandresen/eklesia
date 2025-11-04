import { useState } from "react";
import TopAppBar from "../components/TopAppBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function SondageContainer() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const modifyStep=(_step:number)=>{
    setStep(_step);
  }
  return (
    <div>
      <TopAppBar step={step} title={title} />
      {step === 1 && <Step1 modifyStep={modifyStep} setTitle={setTitle}/>}
      {step === 2 && <Step2 modifyStep={modifyStep} setTitle={setTitle}/>}
      {step === 3 && <Step3 modifyStep={modifyStep} setTitle={setTitle}/>}
      {step === 4 && <Step4 modifyStep={modifyStep} setTitle={setTitle}/>}
      {step === 5 && <Step5 modifyStep={modifyStep} setTitle={setTitle}/>}
    </div>
  );
}
