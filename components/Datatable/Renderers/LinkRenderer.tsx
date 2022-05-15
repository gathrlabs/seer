import { useRouter } from 'next/router';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'


export default props => {
  const router = useRouter();

  const buttonClicked = () => {
    router.push('/case-file')
  }

  return (
    <div
      className="group block inline-flex space-x-1 items-center"
    >
      <button className="font-light" onClick={() => buttonClicked()}>{props.value}</button>
      <div className="transition ease-in-out group-hover:translate-x-1 invisible group-hover:visible">
        <ArrowNarrowRightIcon className="h-3 w-3 text-slate-500" />
      </div>
    </div>
  );
}
