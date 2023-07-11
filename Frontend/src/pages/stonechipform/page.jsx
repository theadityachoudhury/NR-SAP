"use client";

import Stepper from "../components/stepper.jsx";
import Steppercontroller from "../components/steppercontroller";
import {StepperContext} from "../contexts/steppercontext";


import Purchase from "./steps/purchase.tsx";
import Loading from "./steps/loading.tsx";
import Customerp from "./steps/customerp.tsx";
import Customerd from "./steps/customerd.tsx";
import Payement from "./steps/payement.tsx";
import { useState } from "react";
export default function App() {

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setuserData] = useState('');
  const [finalData, setfinalData] = useState([]);

  const steps=[
    "Purchase Details",
    "Loading Details",
    "Customer Details",
    "Customer Payement",
    "Payement Details"
  ];

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <Purchase/>
      case 2:
        return <Loading/>
      case 3:
        return <Customerd/>
      case 4:
        return <Customerp/>
      case 5:
        return <Payement/>
      default:

    }
  }

  const handleClick = (direction) => {
      let newstep = currentStep;
      direction === "next" ? newstep++ : newstep--;

      newstep > 0 && newstep <= steps.length && setCurrentStep(newstep);
  }

  return (
    
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
      <Stepper
        steps={steps}
        currentStep={currentStep}
      />
      <div className="my-10 p-10">

        <StepperContext.Provider value={{
          userData,
          setuserData,
          finalData,
          setfinalData
        }}>

          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>
      </div>
      <Steppercontroller
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps} 
      />
    </div>
  )
}
