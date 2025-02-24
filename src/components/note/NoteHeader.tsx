import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id: string;
}
export default function NoteHeader({ id }: Props) {
  return (
    <div className="flex items-center">
      <h1 className="flex items-center text-16R font-semibold">
        <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
        임시 목표 {id}
      </h1>
    </div>
  );
}
