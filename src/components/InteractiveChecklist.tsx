import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, RotateCcw, Award } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/bookContent';

export default function InteractiveChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('automacao_checklist_progress');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (index: number) => {
    const updated = { ...checkedItems, [index]: !checkedItems[index] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('automacao_checklist_progress', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const resetAll = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem('automacao_checklist_progress');
    } catch {
      // ignore
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="border border-gray-300 rounded-lg p-5 bg-white my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-lg">Checklist de Implementação da Equipe</h3>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-700 border border-blue-200">
              {completedCount}/{totalCount} concluídos ({progressPercent}%)
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Marque cada etapa conforme você configura e valida os scripts e prompts na sua máquina de desenvolvimento.
          </p>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="print-hide text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 self-start sm:self-auto px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          title="Reiniciar checklist"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetar</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 my-4 overflow-hidden border border-gray-200">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {progressPercent === 100 && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-emerald-800 text-xs font-medium">
          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Parabéns! Todos os 12 passos do Kit Prático de Automação foram concluídos e validados pela equipe.</span>
        </div>
      )}

      {/* Checklist items */}
      <div className="space-y-2 font-mono text-xs">
        {CHECKLIST_ITEMS.map((text, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <label
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-start gap-3 p-2 rounded-md cursor-pointer border transition-colors ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-200 text-gray-900'
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </div>
              <span className={`flex-1 select-none ${isChecked ? 'line-through text-gray-400' : ''}`}>
                {text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
