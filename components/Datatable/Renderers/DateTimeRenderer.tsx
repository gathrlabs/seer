import { useRouter } from 'next/router';
import { CalendarIcon } from '@heroicons/react/solid'


export default props => {
  const router = useRouter();

  return (
    <div
      className="group block inline-flex space-x-1 items-center"
    >
      <div className="font-light">{props.value}</div>
      <div className="transition ease-in-out group-hover:translate-x-1 invisible group-hover:visible">
        <CalendarIcon className="h-3 w-3 text-slate-500" />
      </div>
    </div>
  );
}
