import React from 'react'

export default function payement() {
  return (
    <div>
      <div className=" text-left mx-4 my-4 mb-4">
        <label
          htmlFor="trba-na"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Transfer Bank acc name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="trba-na"
            id="trba-na"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="trba-no"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Transfer Bank acc number
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="trba-no"
            id="trba-no"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="tr-am"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Transfer Amount
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="tr-am"
            id="tr-am"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4">
        <label
          htmlFor="total-am"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Total Amount
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="total-am"
            id="total-am"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  )
}
