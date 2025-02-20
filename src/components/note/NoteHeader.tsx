import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

type Props = {
  id: string;
};
export default function NoteHeader({ id }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center text-18R">
        <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
        임시 목표 {id}
      </h1>
    </div>
  );
}
