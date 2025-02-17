type Props = {
  basketList: { id: number; title: string }[];
  onDeleteBasketTodo: (id: number) => void;
  onDeleteAllBasket: () => void;
};

export default function TodoBasket({
  basketList,
  onDeleteBasketTodo,
  onDeleteAllBasket,
}: Props) {
  return (
    <div className="p-3">
      <div className="mb-3 flex items-center gap-4">
        <span className="text-lg font-semibold">할 일 장바구니</span>
        <button
          type="button"
          className="rounded-lg border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-100"
        >
          생성
        </button>
        <button
          type="button"
          className="rounded-lg border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-100"
          onClick={() => onDeleteAllBasket()}
        >
          모두 삭제
        </button>
      </div>
      <div className="flex max-h-40 flex-wrap gap-3 overflow-y-auto">
        {basketList.map((todo) => (
          <div
            key={todo.id}
            className="flex w-[150px] items-center justify-between gap-3 rounded-lg border p-3 shadow-sm"
          >
            <span>{todo.title}</span>
            <button
              type="button"
              className="text-gray-500"
              onClick={() => onDeleteBasketTodo(todo.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
