import { useRouter } from 'next/router';
import { ArrowNarrowDownIcon } from '@heroicons/react/solid'


export default props => {
  const router = useRouter();

  return (
    <div
      className="group block inline-flex space-x-1 items-center"
    >
     {props.value.length} Form{props.value.length === 1 ? (<span></span>) : <span>s</span>}
      {/* <div className="font-light">{props.value}</div> */}
      <div className="transition ease-in-out group-hover:translate-x-1 invisible group-hover:visible">
        <ArrowNarrowDownIcon className="h-3 w-3 text-slate-500" />
      </div>
    </div>
  );
}
