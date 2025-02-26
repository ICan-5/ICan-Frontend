import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id: string;
}
export default function NoteHeader({ id }: Props) {
  return (
    <h1 className="flex items-center gap-2 text-16R font-semibold">
      <FontAwesomeIcon icon={faFlag} className="text-slate500" />
      임시 목표 {id}
    </h1>
  );
}
