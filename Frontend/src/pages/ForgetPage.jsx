import { useState } from "react";

export default function ForgetPage() {
	const [email, setEmail] = useState("");
	

	async function ResetPassword(ev) {
		ev.preventDefault();
		try {
			const res = await axios.post("/api/auth/forget", { email });
			if (res.status === 200) {
				alert("Check your E-Mail for Password Reset Link");
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				alert(err.response.status + "!! " + err.response.data.message);
			}
		}
	}

	return (
		<div className="flex justify-center text-center items-center h-screen">
			<div className="">
				<h1 className="font-bold text-5xl">Password Reset Portal</h1>
				<form className="flex justify-center m-5" onSubmit={ResetPassword}>
					<div>
						<h2 className="text-xl">Enter your Email-Id</h2>
						<input
							className="text-xl text-center"
							type="text"
							placeholder="you@you.com"
							value={email}
							onChange={(ev) => {
								setEmail(ev.target.value);
							}}
						/>
						<button className="mt-5" style={{ backgroundColor: "#ff432a" }}>
							Reset Password
						</button>
						<div className="flex mt-10 justify-center items-center">
							<Link to={"/login"} className="flex gap-2 hover:text-red">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
									/>
								</svg>
								<p>Back to Login</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
