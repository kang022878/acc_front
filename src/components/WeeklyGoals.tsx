import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function WeeklyGoals() {
  const [goals, setGoals] = useState([
    { id: 1, text: '쿠팡 비밀번호 변경', completed: true },
    { id: 2, text: 'G마켓 탈퇴', completed: false },
    { id: 3, text: '무신사 약관 확인', completed: false },
  ]);
  const [newGoal, setNewGoal] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const completedCount = goals.filter(g => g.completed).length;
  const progress = (completedCount / goals.length) * 100;

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
      setIsAdding(false);
    }
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">이번 주 목표</h3>
        <div className="text-blue-400 font-mono">
          {completedCount} / {goals.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3 mb-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg group"
          >
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoal(goal.id)}
              className="w-5 h-5 rounded border-2 border-blue-500 bg-transparent checked:bg-blue-500 cursor-pointer"
            />
            <span className={`flex-1 ${goal.completed ? 'line-through text-slate-500' : ''}`}>
              {goal.text}
            </span>
            <button
              onClick={() => removeGoal(goal.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Goal */}
      {isAdding ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            placeholder="새 목표 입력..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            추가
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-2 border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-lg text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>목표 추가</span>
        </button>
      )}
    </div>
  );
}
