import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';

const PRIORITY = {
  low: { label: 'Low', cls: 'bg-green-100 text-green-700' },
  medium: { label: 'Medium', cls: 'bg-yellow-100 text-yellow-700' },
  high: { label: 'High', cls: 'bg-red-100 text-red-700' },
};

export default function TaskCard({ task, index, onEdit, onDelete }) {
  const priority = PRIORITY[task.priority] ?? PRIORITY.medium;

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={[
            'bg-white rounded-lg border border-gray-100 p-3 flex flex-col gap-2 select-none',
            snapshot.isDragging
              ? 'shadow-xl rotate-1 opacity-95 border-indigo-300'
              : 'shadow-sm hover:shadow-md',
            'transition-shadow',
          ].join(' ')}
        >
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-gray-800 text-sm leading-snug">{task.title}</p>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-300 hover:text-indigo-500 transition text-sm"
                title="Edit task"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-gray-300 hover:text-red-500 transition text-sm"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-400 text-xs line-clamp-2">{task.description}</p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priority.cls}`}>
              {priority.label}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-400">
                {format(new Date(task.dueDate), 'MMM d')}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
