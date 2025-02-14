import { motion } from 'framer-motion';

interface GoalProgressProps {
  doneItems: { task: string; date: string }[];
  todoItems: { task: string; date: string }[];
}

// 목표 진행 그래프
export default function GoalProgress({
  doneItems,
  todoItems,
}: GoalProgressProps) {
  const progress =
    (doneItems.length / (todoItems.length + doneItems.length)) * 100;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3>Progress</h3>
        <h3>{progress.toFixed(0)}%</h3>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-3 rounded-full bg-blue-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        ></motion.div>
      </div>
    </div>
  );
}
