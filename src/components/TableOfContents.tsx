import { ListTree, Terminal, Cpu, CheckSquare, Sparkles, BookOpen } from 'lucide-react';
import { TABLE_OF_CONTENTS } from '../data/bookContent';

interface TableOfContentsProps {
  activeSection?: string;
}

export default function TableOfContents({ activeSection }: TableOfContentsProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav aria-label="Sumário técnico" className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
        <ListTree className="w-4 h-4 text-blue-600" />
        <span>Sumário Técnico</span>
      </div>

      <ul className="mt-3 space-y-1 text-xs">
        {TABLE_OF_CONTENTS.map((item) => {
          const isScript = item.title.includes('Script');
          const isPrompt = item.title.includes('Prompt');
          const isChecklist = item.title.includes('Checklist');

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left py-1.5 px-2 rounded-md transition-colors flex items-center justify-between group ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="truncate pr-2">{item.title}</span>
                {isScript && (
                  <Terminal className="w-3 h-3 text-blue-500 opacity-60 group-hover:opacity-100 shrink-0" />
                )}
                {isPrompt && (
                  <Sparkles className="w-3 h-3 text-purple-500 opacity-60 group-hover:opacity-100 shrink-0" />
                )}
                {isChecklist && (
                  <CheckSquare className="w-3 h-3 text-emerald-500 opacity-60 group-hover:opacity-100 shrink-0" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
