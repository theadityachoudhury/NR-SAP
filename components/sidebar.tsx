import React from "react";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(/homesvg.svg)`,
          }}
        >
          <img
            className="absolute top-0 left-5 mt-4 ml-4 w-16 h-16"
            src="/Icon.svg"
            alt="Icon"
          />
          <div className="absolute top-0 left-20 mt-4 ml-4 text-center max-w-xs">
            <span
              className="text-black text-xl font-bold"
              /* style={{ fontFamily: "Poppins" }} */
            >
              NR SALES AND MARKETING PRIVATE LIMITED
            </span>
          </div>
          {/*           <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-30">
            <div>
              <h2 className="text-4xl font-bold text-white">Brand</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-left ">
              <h2 className="text-4xl font-bold text-left text-black">
                Sign Up
              </h2>

              <p className="mt-3 text-gray-700">
                If you already have an account register{" "}
                <a
                  href="#"
                  className="text-orange-500 focus:outline-none focus:underline hover:underline"
                >
                  Login Here!
                  </a>
              </p>
            </div>

            <div className="mt-8">
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="password"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className=" w-full px-4 py-2 mt-2 border-b-4 text-gray-300 placeholder-gray-600 bg-black  border-b-black-800 rounded-lg dark:placeholder-gray-400 dark:bg-white dark:text-gray-700 dark:border-gray-300 focus:border-b-red-400 dark:focus:border-b-red-400  focus:outline-none  "
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                    
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    className=" w-full px-4 py-2 mt-2 border-b-4 text-gray-300 placeholder-gray-600 bg-black  border-b-black-800 rounded-lg dark:placeholder-gray-400 dark:bg-white dark:text-gray-700 dark:border-gray-300 focus:border-b-red-400 dark:focus:border-b-red-400  focus:outline-none  "
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Confirm Password
                    </label>
                    
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Confirm your Password"
                    className=" w-full px-4 py-2 mt-2 border-b-4 text-gray-300 placeholder-gray-600 bg-black  border-b-black-800 rounded-lg dark:placeholder-gray-400 dark:bg-white dark:text-gray-700 dark:border-gray-300 focus:border-b-red-400 dark:focus:border-b-red-400  focus:outline-none  "
                  />
                </div>
                
                <div>
                  <div className="p-4">
                    <div className="flex items-center mr-4 mb-2">
	                    <input type="checkbox" id="A3-yes" name="A3-confirmation" value="yes" />
	                    <label className="select-none text-gray-600 px-4 py-3">By Creating An Account, I Agree To Our Terms Of Use And Privacy Policy.</label>
                      
                    </div>
                    <div className="flex items-center mr-4 mb-2">
	                    <input type="checkbox" id="A3-yes" name="A3-confirmation" value="yes" />
	                    <label className="select-none text-gray-600 px-4 py-3">By Creating An Account, I Am Agree To Receive SMS, Message, Email, Promotional Content.</label>
                      
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full shadow-lg px-4 py-2 rounded-full tracking-wide text-white transition-colors duration-200 transform bg-orange-500 hover:bg-orange-400 focus:outline-none focus:bg-orange-400 focus:ring focus:ring-orange-300 focus:ring-opacity-50" style={{backgroundColor:'#FF432A'}}>
                    Sign Up
                  </button>
                </div>
              </form>

            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}