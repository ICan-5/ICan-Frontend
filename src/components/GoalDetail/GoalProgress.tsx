interface GoalProgressProps {
  doneItems: string[];
  todoItems: string[];
}
//목표 진행 그래프
export default function GoalProgress({
  doneItems,
  todoItems,
}: GoalProgressProps) {
  return (
    <div className="mt-6">
      <h3>Progress</h3>
      <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full bg-blue-300"
          style={{
            width: `${(doneItems.length / (todoItems.length + doneItems.length)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
