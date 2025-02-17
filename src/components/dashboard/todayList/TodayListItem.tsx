import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  todo: {
    id: number;
    title: string;
    date: string;
    done: boolean;
    note: boolean;
  };
};

export default function TodayListItem({ todo }: Props) {
  return (
    <div className="flex h-8 w-full items-center rounded-md px-2 py-1 text-sm hover:bg-gray-100 hover:text-primary">
      <p className={`text-overflow mr-auto ${todo.done && 'line-through'}`}>
        {todo.title}
      </p>
      {todo.note && (
        <div className="flex cursor-pointer items-center justify-center p-1">
          <FontAwesomeIcon
            icon={faBook}
            className="h-4 w-4 text-primary"
            size="xs"
          />
        </div>
      )}
    </div>
  );
}
