/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import DefaultButton from '../../../components/DefaultButton'
import AppointmentsApi from '../../../lib/api/appointments'

export default function SendConfirmationEmailModal({ selectedRows, show, close }: { selectedRows: any, show: boolean, close: Function }) {
  const cancelButtonRef = useRef(null)
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendConfirmationEmail = async () => {
    setLoading(true);
    const ids = selectedRows.map((row) => row.data.id);
    try {
      await AppointmentsApi.sendConfirmationEmail(ids);
      toast.success('Email sent confirming selected appointments.');
      close('SendConfirmationEmailModal');
    } catch (err) {
      setErrors(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Send Confirmation Email to {selectedRows.length} Recpients
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to send a confirmation email? If a form has been assigned to this appointment, a link to the form will be emailed to the recepients.
                      </p>
                      {errors.length !== 0 ? (<p className="bg-red-100 rounded p-2 mt-4 text-red-600 text-sm">{errors}</p>) : null}
                    </div>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center space-x-2 justify-end w-full">
                  <DefaultButton customClasses={'bg-slate-50'} loading={false} onPress={() => close('SendConfirmationEmailModal')}>
                    Cancel
                  </DefaultButton>
                  <DefaultButton customClasses={'bg-slate-800 text-slate-200 hover:text-slate-100'} loading={loading} disabled={false} onPress={() => sendConfirmationEmail()}>
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
