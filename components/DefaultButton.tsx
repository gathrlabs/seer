/* This example requires Tailwind CSS v2.0+ */

export default function DefaultButton({ title, onPress, disabled, children, customClasses, ...props }: { title: string, onPress: () => void, disabled?: boolean, children: React.ReactNode, customClasses?: String, props?: any }) {
    return (
        <div onClick={onPress} className={`${disabled ? "cursor-not-allowed opacity-70" : ""} ${customClasses} px-2 rounded object-contain cursor-pointer hover:shadow space-x-2 leading-loose shadow-sm transition-shadow duration-300 h-10 border border-slate-300 flex items-center justify-center text-gray-700 hover:text-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}>
            <div className='text-slate-500'>{title}</div>
            {children}
        </div>
    )
}
