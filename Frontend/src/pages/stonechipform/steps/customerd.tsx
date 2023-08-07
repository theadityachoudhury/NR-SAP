import React from "react";

export default function customerd() {
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold px-4">
        Customer Details
      </h1>
      <div className=" text-left mx-4 my-4 mb-4">
        <label
          htmlFor="cust-nm"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Customer Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="cust-nm"
            id="cust-nm"
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="cust-ph"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Customer Phone Number
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="cust-ph"
            id="cust-ph"
            autoComplete="given-number"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4">
        <label
          htmlFor="cust-si"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Customer Site
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="cust-si"
            id="cust-si"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}
