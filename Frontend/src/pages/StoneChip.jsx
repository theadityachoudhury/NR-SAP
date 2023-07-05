import { useState } from "react";

export default function StoneChip() {
	let [step, setStep] = useState(0);

	function stone(ev) {
		ev.preventDefault();
		setStep(step + 1);
		console.log(step);
	}

	if (step == 1) {
		return (
			<div>
				<form onSubmit={stone}>
					<h1>step 2</h1>
					<button>Next</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<form>
				<label className="" htmlFor={"name"}>
					name
				</label>
				<br />
				<input id={"name"} name="name" />
				<br />
				<label htmlFor={"email"}>email</label>
				<br />
				<input id={"email"} name="email" />
				<br />
				<label htmlFor={"mess"}>message</label>
				<br />
				<input id={"mess"} name={"message"} />
				<br />
				<button>Button</button>
            </form>
            
		</div>
	);
}
