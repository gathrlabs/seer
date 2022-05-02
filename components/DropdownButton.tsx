/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownButton({ options, title, ...props }: { options: any[], title: string }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-lg bg-white py-1 pr-2 border border-slate-500 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5 text-slate-700" aria-hidden="true" />
          <div className='text-slate-700'>Actions</div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-xl border border-gray-300 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          {options.map((option, index) => (
            <div key={index} className="py-1 border-b">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-2 py-1'
                    )}
                  >
                    {option.text}
                  </a>
                )}
              </Menu.Item>
            </div>
          ))}

        </Menu.Items>
      </Transition>
    </Menu>
  )
}
