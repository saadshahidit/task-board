import { useNavigate } from 'react-router-dom';

export default function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight truncate">
          {board.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(board._id);
          }}
          className="text-gray-300 hover:text-red-500 transition shrink-0 text-lg leading-none"
          title="Delete board"
          aria-label="Delete board"
        >
          ✕
        </button>
      </div>

      {board.description && (
        <p className="text-gray-500 text-sm line-clamp-2">{board.description}</p>
      )}

      <button
        onClick={() => navigate(`/board/${board._id}`)}
        className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg py-2 transition font-medium"
      >
        Open Board
      </button>
    </div>
  );
}
