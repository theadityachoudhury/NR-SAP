import React from "react";

export default function customerp() {
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold px-4">
        Customer Payement
      </h1>
      <div className=" text-left mx-4 my-4 mb-4">
        <label
          htmlFor="pro-ra"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Product Sale Rate
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="pro-ra"
            id="pro-ra"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="pro-wei"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Product Weight
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="pro-wei"
            id="pro-wei"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 ">
        <label
          htmlFor="pay-me"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Payement Method
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="pay-me"
            id="pay-me"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}
