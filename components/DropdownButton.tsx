/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

enum Direction {
  Left = "LEFT",
  Right = "RIGHT",
}

export default function DropdownButton({ options, title, buttonRegular, children, optionSelected, disabled, direction, ...props }: { options: any[], title: string, buttonRegular?: boolean, children: React.ReactNode, optionSelected?: any, disabled: boolean, direction: Direction  }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {buttonRegular ? (<Menu.Button className="rounded-lg bg-white py-1 pr-2 border border-slate-500 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5 text-slate-700" aria-hidden="true" />
          <div className='text-slate-700'>Actions</div>
        </Menu.Button>) :
          (<Menu.Button>{children}</Menu.Button>)}
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
        <Menu.Items className={`${direction === 'Right' ? 'right-0' : 'left-0'} origin-top-left absolute mt-2 w-56 rounded-md shadow-xl border border-gray-300 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20`}>
          {options.map((option, index) => (
            <div key={index} className="cursor-pointer">
              {option.cell ? (
              <div>
                <Menu.Item className='px-3 py-2 block bg-slate-100 text-gray-900'>
                    {option.text}
                </Menu.Item>
              </div>) : (
                <Menu.Item>
                  {({ active }) => (
                    <div onClick={() => optionSelected(option.actionName)} className={classNames(
                      active ? 'bg-slate-50 text-slate-900' : 'text-slate-700',
                      'block px-3 py-2 text-sm rounded'
                    )}>
                      {option.text}
                    </div>
                  )}
                </Menu.Item>
              )}
            </div>
          ))}

        </Menu.Items>
      </Transition>
    </Menu>
  )
}
