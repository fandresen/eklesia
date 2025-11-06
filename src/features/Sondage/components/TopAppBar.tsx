interface propsT{
    title:string;
    step:number;
    totalSteps: number; // Ajouté
}

export default function TopAppBar({title, step, totalSteps}:propsT) {
  return (
    <div>
        <div className="sticky top-0 z-10 bg-background-light/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center justify-start text-text-light">
            {/* Back Icon can be added here if needed */}
          </div>
          <h1 className="text-2xl -mt-3 font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-light pr-12">
           {title}
          </h1>
        </div>
        
        {/* Page Indicators */}
        <div className="px-4 pt-2 -mt-3">
          <p className="text-[15px] text-primary/80 text-center font-medium pb-2">
            Dingana {step} / {totalSteps}
          </p>
          <div className="flex w-full flex-row items-center justify-center gap-1.5 py-1">
            {/* Boucle sur le nombre total d'étapes */}
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i}
                className={`flex-1 h-1.5 rounded-full ${step === (i + 1) ? "bg-primary" : "bg-gray-200"}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}