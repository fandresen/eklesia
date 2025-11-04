import { useEffect, useState } from "react";

interface propsT {
    modifyStep:(step:number)=>void;
    setTitle:(title:string)=>void;
}
export default function Step1({modifyStep,setTitle}:propsT) {
    const [justYear,setJustYear]=useState(false);
    const nextStep=()=>{
        modifyStep(2);
    }
    useEffect(()=>{
      setTitle("Fampahalalana fototra")
    },[])
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden antialiased bg-background-light font-display">
      
      {/* Form Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="full-name"
          >
            Anarana feno
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              person
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="full-name"
              placeholder="Ampidiro ny anarana feno"
              defaultValue=""
              type="text"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="dob"
          >
            Daty Nahaterahana
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              cake
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="dob"
              onBlur={(e) => (e.target.type = "text")}
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Safidio ny daty nahaterahanao"
              type="text"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <h2 className="text-base font-medium leading-normal text-text-light pb-2">
            Lahy/Vavy
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-4 has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
              htmlFor="male"
            >
              <input
                className="form-radio h-5 w-5 text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
                id="male"
                name="gender"
                type="radio"
                value="male"
              />
              <span className="ml-3 text-base font-medium text-text-light">
                Lahy
              </span>
            </label>
            <label
              className="flex cursor-pointer items-center justify-center rounded-lg border border-border-light bg-subtle-light p-4 has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
              htmlFor="female"
            >
              <input
                className="form-radio h-5 w-5 text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
                id="female"
                name="gender"
                type="radio"
                value="female"
              />
              <span className="ml-3 text-base font-medium text-text-light">
                Vavy
              </span>
            </label>
          </div>
        </div>

        {/* Baptism Date */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="baptism-date"
          >
            Daty nanaovana Batisa
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              water_drop
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="baptism-date"
              // onBlur={(e) => (e.target.type = "text")}
              onFocus={(e) => (e.target.type = justYear?"number":"date")}
              placeholder="Safidio ny daty batisa"
              type={justYear?"number":"text"}
              min="1900"
              max="2099"
              step="1"
            />
          </div>
          <div className="flex items-center justify-start gap-2 pt-3">
            <input
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-gray-400 bg-transparent"
              id="date-toggle"
              type="checkbox"
              onChange={()=>setJustYear(!justYear)}
            />
            <label className="text-sm text-text-light/80" htmlFor="date-toggle">
             Ny Taona ihany no tadidiko
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="address"
          >
            Adiresy
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              home
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="address"
              placeholder="Ampidiro ny Adiresy"
              defaultValue=""
              type="text"
            />
          </div>
        </div>

        {/* Phone Number (Optional) */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="phone"
          >
            Finday{" "}
            <span className="text-text-light/60 font-normal">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              phone
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="phone"
              placeholder="Apidiro ny laharana"
              type="tel"
              defaultValue=""
            />
          </div>
        </div>

        {/* Email (Optional) */}
        <div className="flex flex-col">
          <label
            className="text-base font-medium leading-normal text-text-light pb-2"
            htmlFor="email"
          >
            Email{" "}
            <span className="text-text-light/60 font-normal">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-primary/70">
              mail
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light bg-subtle-light h-14 placeholder:text-text-light/50 pl-12 pr-4 text-base font-normal leading-normal shadow-sm"
              id="email"
              placeholder="Apidiro ny adiresy email"
              type="email"
              defaultValue=""
            />
          </div>
        </div>
      </main>

      {/* Bottom Action Button */}
      <footer className="sticky bottom-0 bg-background-light/80 backdrop-blur-sm p-4 pt-2 shadow-inner">
        <button onClick={()=>nextStep()} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
          Manaraka
        </button>
      </footer>
    </div>
  );
}
