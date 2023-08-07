import React from 'react'

export default function purchase() {
  return (
    <div>
      <div className=" text-left mx-4 my-4 mb-4">
              <label htmlFor="pro-na" className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900">
              Purchased Product Name
              </label>
              <div className="mt-2">              
                <input
                
                  type="text"
                  name="pro-na"
                  id="pro-na"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
              <label htmlFor="pro-pwei" className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900">
              Product Purchase Weight
              </label>
              <div className="mt-2">
              
                <input
                
                  type="number"
                  name="pro-pwei"
                  id="pro-pwei"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3 text-left mx-4 my-4 mb-4">
              <label htmlFor="pur-da" className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900">
              Purchase Date
              </label>
              <div className="mt-2">
              
                <input
                
                  type="date"
                  name="pur-da"
                  id="pur-da"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3 text-left mx-4 my-4 ">
              <label htmlFor="pay-ppr" className="text-sm justify-center inline-flex font-medium leading-6 text-gray-900">
              Purchase Product Price
              </label>
              <div className="mt-2">
              
                <input
                
                  type="text"
                  name="pay-ppr"
                  id="pay-ppr"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>  
    </div>
  )
}
