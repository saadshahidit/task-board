import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard.jsx';

const COLUMN = {
  todo: { label: 'To Do', headerCls: 'bg-slate-100', dotCls: 'bg-slate-400' },
  inprogress: { label: 'In Progress', headerCls: 'bg-blue-100', dotCls: 'bg-blue-400' },
  done: { label: 'Done', headerCls: 'bg-green-100', dotCls: 'bg-green-400' },
};

export default function KanbanColumn({ status, tasks, onEdit, onDelete, onAddTask }) {
  const col = COLUMN[status];

  return (
    <div className="flex flex-col gap-3 w-72 shrink-0">
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${col.headerCls}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${col.dotCls}`} />
          <span className="font-semibold text-gray-700 text-sm">{col.label}</span>
          <span className="text-xs text-gray-500 bg-white/70 px-1.5 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="text-gray-500 hover:text-indigo-600 text-xl font-bold leading-none transition"
          title={`Add task to ${col.label}`}
          aria-label={`Add task to ${col.label}`}
        >
          +
        </button>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={[
              'flex flex-col gap-2 min-h-32 rounded-lg p-2 transition-colors',
              snapshot.isDraggingOver
                ? 'bg-indigo-50 border-2 border-dashed border-indigo-300'
                : 'bg-gray-50/80',
            ].join(' ')}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
