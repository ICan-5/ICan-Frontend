type Props = {
  basketList: { id: number; title: string }[];
  onDeleteBasketTodo: (id: number) => void;
};

export default function TodoBasket({ basketList, onDeleteBasketTodo }: Props) {
  return (
    <div className="p-3">
      <div className="mb-3 text-lg font-semibold">할 일 장바구니</div>
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
