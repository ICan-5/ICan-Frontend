import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import GoalList from '@/components/goalDetail/GoalList';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

interface TodoItem {
  id: number;
  task: string;
  date: string;
  done: boolean;
}

interface GoalDetailProps {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  baskets: string[];
  setBaskets: Dispatch<SetStateAction<string[]>>;
}

interface SelectedItemIndex {
  today: number | null;
  future: number | null;
  past: number | null;
}

export default function GoalDetail({
  todos,
  setTodos,
  baskets,
  setBaskets,
}: GoalDetailProps) {
  const todoItems = todos.filter((item) => !item.done);
  const doneItems = todos.filter((item) => item.done);

  //메뉴바 이슈로 인해 나눔
  const [selectedTodoItemIndex, setSelectedTodoItemIndex] =
    useState<SelectedItemIndex>({
      today: null,
      future: null,
      past: null,
    });

  const [selectedDoneItemIndex, setSelectedDoneItemIndex] =
    useState<SelectedItemIndex>({
      today: null,
      future: null,
      past: null,
    });

  const [pastTodoCollapsed, setPastTodoCollapsed] = useState(false);
  const [futureTodoCollapsed, setFutureTodoCollapsed] = useState(false);
  const listMenuRefTodo = useRef<HTMLDivElement>(null);
  const listMenuRefDone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !listMenuRefTodo.current?.contains(event.target as Node) &&
        !listMenuRefDone.current?.contains(event.target as Node)
      ) {
        setSelectedTodoItemIndex({
          today: null,
          future: null,
          past: null,
        });
        setSelectedDoneItemIndex({
          today: null,
          future: null,
          past: null,
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onCheckboxClick = (itemId: number) => {
    setTodos((prevItems: TodoItem[]) =>
      prevItems.map((item: TodoItem) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const toggleTodoListMenu = (
    index: number,
    listCategory: 'today' | 'future' | 'past',
  ) => {
    setSelectedTodoItemIndex((prev) => ({
      ...prev,
      [listCategory]: prev[listCategory] === index ? null : index,
    }));
  };

  const toggleDoneListMenu = (
    index: number,
    listCategory: 'today' | 'future' | 'past',
  ) => {
    setSelectedDoneItemIndex((prev) => ({
      ...prev,
      [listCategory]: prev[listCategory] === index ? null : index,
    }));
  };

  const today = new Date();

  const filterItems = (items: TodoItem[]) => {
    const current = new Date(today);
    current.setHours(0, 0, 0, 0);

    return items.reduce(
      (acc, item) => {
        const itemDate = new Date(item.date);
        const itemDateWithoutTime = new Date(itemDate.setHours(0, 0, 0, 0));

        if (itemDateWithoutTime < current) {
          acc.past.push(item);
        } else if (
          itemDateWithoutTime.toDateString() === current.toDateString()
        ) {
          acc.today.push(item);
        } else {
          acc.future.push(item);
        }
        return acc;
      },
      {
        past: [] as TodoItem[],
        today: [] as TodoItem[],
        future: [] as TodoItem[],
      },
    );
  };

  const {
    past: pastTodoItems,
    today: todayTodoItems,
    future: futureTodoItems,
  } = filterItems(todoItems);

  const {
    past: pastDoneItems,
    today: todayDoneItems,
    future: futureDoneItems,
  } = filterItems(doneItems);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Todo */}
        <div className="basis-1/2 rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="mb-4 text-lg font-bold">To do</h3>
            <div className="flex cursor-pointer items-center">
              <span className="text-blue-400">+ 할 일 추가</span>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-bold">오늘 할 일</h3>
          <GoalList
            items={todayTodoItems}
            onCheckboxClick={onCheckboxClick}
            listType="todo"
            toggleListMenu={(index) => toggleTodoListMenu(index, 'today')}
            listMenuRef={listMenuRefTodo}
            selectedIndex={selectedTodoItemIndex.today}
          />

          {/* 예정된 할 일 */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">예정된 할 일</h3>
              <FontAwesomeIcon
                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                  futureTodoCollapsed ? 'rotate-180' : 'rotate-0'
                }`}
                icon={faAngleDown}
                size="xl"
                onClick={() => setFutureTodoCollapsed(!futureTodoCollapsed)}
              />
            </div>
            {!futureTodoCollapsed && (
              <GoalList
                items={futureTodoItems}
                onCheckboxClick={onCheckboxClick}
                listType="todo"
                toggleListMenu={(index) => toggleTodoListMenu(index, 'future')}
                listMenuRef={listMenuRefTodo}
                selectedIndex={selectedTodoItemIndex.future}
              />
            )}
          </div>

          {/*지난 할일*/}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">지난 할 일</h3>
              <FontAwesomeIcon
                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                  pastTodoCollapsed ? 'rotate-180' : 'rotate-0'
                }`}
                icon={faAngleDown}
                size="xl"
                onClick={() => setPastTodoCollapsed(!pastTodoCollapsed)}
              />
            </div>
            {!pastTodoCollapsed && (
              <GoalList
                items={pastTodoItems}
                onCheckboxClick={onCheckboxClick}
                listType="todo"
                toggleListMenu={(index) => toggleTodoListMenu(index, 'past')}
                listMenuRef={listMenuRefTodo}
                selectedIndex={selectedTodoItemIndex.past}
              />
            )}
          </div>
        </div>

        {/* Done & 할 일 장바구니*/}
        <div className="basis-1/2 space-y-6">
          <div className="rounded-2xl bg-gray-200 p-6 shadow">
            <h3 className="mb-4 text-lg font-bold">Done</h3>
            <GoalList
              items={todayDoneItems}
              onCheckboxClick={onCheckboxClick}
              listType="done"
              toggleListMenu={(index) => toggleDoneListMenu(index, 'today')}
              listMenuRef={listMenuRefDone}
              selectedIndex={selectedDoneItemIndex.today}
            />
            <GoalList
              items={futureDoneItems}
              onCheckboxClick={onCheckboxClick}
              listType="done"
              toggleListMenu={(index) => toggleDoneListMenu(index, 'future')}
              listMenuRef={listMenuRefDone}
              selectedIndex={selectedDoneItemIndex.future}
            />
            <GoalList
              items={pastDoneItems}
              onCheckboxClick={onCheckboxClick}
              listType="done"
              toggleListMenu={(index) => toggleDoneListMenu(index, 'past')}
              listMenuRef={listMenuRefDone}
              selectedIndex={selectedDoneItemIndex.past}
            />
          </div>
          <div className="mt-6">
            <GoalBasket
              basketItems={baskets}
              setBasketItems={setBaskets}
              totalItems={todos}
              setTotalItems={setTodos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
