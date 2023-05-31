import Image from "next/image";
import COVER_IMAGE from "../asset.png";
import LOGO from "../logo.png";

const colors = {
	primary: "#060606",
	background: "#f5f5f5",
	disabled: "#D9D9D9",
};

export default function login() {
	return (
		<div className="w-full h-screen flex items-start">
			<div className="w-1/2 h-full flex flex-col">
				<div className="w-1/2 absolute left-[5%] top-[2%] flex flex-col">
					<Image src={LOGO} width={100} height={100} />
				</div>
				<div className="w-1/2 absolute left-[12%] top-[2%] flex flex-col">
					<a href="/login">
						<h2 className="text-2xl text-black font-bold my-4">
							SALES AND MARKETING
							<br />
							PRIVATE LIMITED
						</h2>
					</a>
				</div>
				<Image src={COVER_IMAGE} className="w-full h-full object-cover" />
			</div>

			<div className="w-1/2 h-full bg-[#f5f5f5] text-[#060606] flex flex-col p-20 justify-between items-center">
				<h1 className="text-xl text-[#060606] font-semibold">
					Construction Brand
                </h1>
                
                <div className=" flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">Sign In</h3>
                    <p className="text-lg mb-2">Welcome Back! Please Enter your Credentials</p>
                </div>

                <div className=" items-center justify-center">
                <p className="text-sm font-normal">Don't have an account? <span className="font-semibold underline underline-offset-2 cursor-pointer">Sign Up</span></p></div>
			</div>
		</div>
	);
}
