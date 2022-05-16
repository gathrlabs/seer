/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import DefaultButton from '../../../components/DefaultButton'

export default function sendConfirmationEmailModal({ show, close } : { show: boolean, close: Any }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Send Confirmation Email to 4 Recpients
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to send a confirmation email? If a form has been assigned to this appointment, a link to the form will be emailed to the recepients.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center space-x-2 justify-end w-full">
                  <DefaultButton customClasses={'bg-slate-50'} onPress={() => close('SendConfirmationEmailModal')}>
                    Cancel
                  </DefaultButton>
                  <DefaultButton customClasses={'bg-slate-800 text-slate-200 hover:text-slate-100'}  disabled={false} onPress={() => close('SendConfirmationEmailModal')}>
                        Send Confirmation Email
                  </DefaultButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
