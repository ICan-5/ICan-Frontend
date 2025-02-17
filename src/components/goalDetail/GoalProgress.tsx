import { motion } from 'framer-motion';

interface GoalProgressProps {
  doneItems: number;
  todoItems: number;
}

// 목표 진행 그래프
export default function GoalProgress({
  doneItems,
  todoItems,
}: GoalProgressProps) {
  const progress = (doneItems / (todoItems + doneItems)) * 100;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3>Progress</h3>
        <h3>{progress.toFixed(0)}%</h3>
      </div>
      <div className="bg-gs200 mt-2 h-3 w-full overflow-hidden rounded-full">
        <motion.div
          className="bg-slate300 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        ></motion.div>
      </div>
    </div>
  );
}
