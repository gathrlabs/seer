/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import DefaultButton from '../../../components/DefaultButton'

export default function AssignFormSlideover({ show, close } : { open: boolean, close: () => void }) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-5300 sm:duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-slate-50 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg text-slate-800"> Assign Form </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
                              onClick={() => close('AssignFormSlideover')}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-slate-500">
                            Assign form 
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4 space-x-2">
                      <DefaultButton disabled={false}>
                        Assign Form
                      </DefaultButton>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
