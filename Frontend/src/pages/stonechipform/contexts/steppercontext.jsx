import { createContext, useState } from "react";

export const StepperContext = createContext({});

export function StepperContextProvider({ children }) {
	const [formData, setFormData] = useState({
		step1Data: {},
		step2Data: {},
		step3Data: {},
		step4Data: {},
		step5Data: {},
	});

	console.log(formData);

	const updateStep1Data = (data) => {
		setFormData((prevData) => ({
			...prevData,
			step1Data: data,
		}));
	};

	const updateStep2Data = (data) => {
		setFormData((prevData) => ({
			...prevData,
			step2Data: data,
		}));
	};

	const updateStep3Data = (data) => {
		setFormData((prevData) => ({
			...prevData,
			step3Data: data,
		}));
	};

	const updateStep4Data = (data) => {
		setFormData((prevData) => ({
			...prevData,
			step3Data: data,
		}));
	};

	const updateStep5Data = (data) => {
		setFormData((prevData) => ({
			...prevData,
			step3Data: data,
		}));
	};

	return (
		<StepperContext.Provider
			value={{
				formData,
				setFormData,
			}}>
			{children}
		</StepperContext.Provider>
	);
}
