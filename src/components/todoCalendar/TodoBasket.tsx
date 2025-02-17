const basketList = [
  { id: 101, title: '코딩강의 듣기' },
  { id: 102, title: '할일 2' },
  { id: 103, title: '할일 2' },
  { id: 104, title: '할일 2' },
  { id: 105, title: '할일 2' },
  { id: 106, title: '할일 2' },
  { id: 107, title: '할일 2' },
  { id: 108, title: '할일 2' },
  { id: 109, title: '할일 2' },
  { id: 110, title: '할일 2' },
  { id: 111, title: '할일 2' },
  { id: 112, title: '할일 2' },
  { id: 113, title: '할일 2' },
  { id: 114, title: '할일 2' },
  { id: 115, title: '할일 2' },
  { id: 116, title: '할일 2' },
];

export default function TodoBasket() {
  return (
    <div className="p-3">
      <div className="mb-3 text-lg font-semibold">할 일 장바구니</div>
      <div className="flex max-h-44 flex-wrap gap-3 overflow-y-auto">
        {basketList.map((todo) => (
          <div
            key={todo.id}
            className="flex w-[150px] items-center justify-between gap-3 rounded-lg border p-3 shadow-sm"
          >
            <span>{todo.title}</span>
            <button type="button" className="text-gray-500">
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
