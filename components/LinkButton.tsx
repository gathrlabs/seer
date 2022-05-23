import { ArrowNarrowRightIcon } from "@heroicons/react/solid"

function LinkButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="group block inline-flex space-x-1 items-center cursor-pointer"
    >
      {children}
      <div className="transition ease-in-out group-hover:translate-x-1 invisible group-hover:visible">
        <ArrowNarrowRightIcon className="h-3 w-3 text-slate-500" />
      </div>
    </div>
  );
}

export default LinkButton;