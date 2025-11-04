import { useNavigate } from "react-router-dom";

export default function LandingPage() { 
  const navigate = useNavigate();
  return (
    <div
      className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root font-display"
      style={{
        backgroundImage: 'radial-gradient(circle at top, #f5f7f8 0%, #e0e8f0 100%)',
      }}
    >
      <div className="flex flex-col grow justify-between p-6">
        <div className="flex flex-col items-center justify-center text-center pt-16">
          <div className="relative flex w-full max-w-[280px] grow bg-background-light/0 dark:bg-background-dark/0 @container aspect-square mb-6">
            <div className="w-full gap-1 overflow-hidden bg-background-light/0 dark:bg-background-dark/0 @[480px]:gap-2 aspect-square flex">
              <div
                className="w-full bg-center bg-no-repeat bg-contain aspect-auto rounded-none flex-1"
                data-alt="Abstract illustration of a dove and a cross representing peace and faith"
                // Correction 2: L'attribut style doit être un objet JS (camelCase pour les propriétés).
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_hNq3mX2X5W0wrMxfuhyophqqd_IOKkCg1IY1IQdIQrxWKRaHBtwp0nQ55NgtG_CkEv6J55xyCajVgr09l0Xq7DhRpRLTPTn9VKWwg8EiZImqED0Z3Yri-NlH0bDOHb6N-IU0YUwf5SNFRBY9WHIuWRKYmgkcXkK3YZDtETDAXxijVI225JlUf1uc8drssOSd3vUZPf7kkPWIkTkgx_DbPxtDYgypz7XuZEXATQR6GXYJXbJHMyf0A1KO-H1nYZ_i2LkWHt4E81F-")',
                  mixBlendMode: 'multiply',
                  filter: 'grayscale(100%) contrast(1.2) brightness(1.2)',
                }}
              ></div>
            </div>
          </div>
          <h1 className="text-primary dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
            SDA Ambolokandrina
          </h1>
          <p className="text-primary/80 dark:text-white/80 text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            Mazotoa, fa aza malaina, ary aoka hafana fo amin'ny fanompoana ny Tompo <br /> Rom 12:11
          </p>
        </div>
        <div className="w-full pb-4">
          <div className="flex px-4 py-3 justify-center">
            <button onClick={()=>navigate("/sondage")} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow">
              <span className="truncate">Continue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}