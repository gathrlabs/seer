/* This example requires Tailwind CSS v2.0+ */

export default function DefaultButton({ title, onPress, disabled, children, ...props }: { title: string, onPress: () => void, disabled?: boolean, children: React.ReactNode, props?: any }) {
    return (
        <div onClick={onPress} className={`${disabled ? "cursor-not-allowed opacity-70" : ""} px-2 rounded bg-white hover:shadow inline-flex space-x-2 leading-loose shadow-sm transition-shadow duration-300 w-full h-10 border border-slate-300 flex items-center justify-center text-gray-400 hover:text-gray-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}>
            <div className='text-slate-500'>{title}</div>
            {children}
        </div>
    )
}
