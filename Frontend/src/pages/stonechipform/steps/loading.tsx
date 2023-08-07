import React from 'react'

export default function loading() {
  return (
    <div>
        <div className=" text-left mx-4 my-4 mb-4">
        <label
          htmlFor="vec-num"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Vehicle Number
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="vec-num"
            id="vec-num"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="load-we"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Loading Weight
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="load-we"
            id="load-we"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
        <label
          htmlFor="load-ad"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Loading Address
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="load-ad"
            id="load-ad"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 text-left mx-4 my-4">
        <label
          htmlFor="unload-we"
          className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900"
        >
          Before Unloading Weight
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="unload-we"
            id="unload-we"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  )
}
