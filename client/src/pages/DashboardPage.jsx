import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import BoardCard from '../components/BoardCard.jsx';
import api from '../api/axios.js';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';

export default function DashboardPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await api.get('/boards');
      setBoards(data);
    } catch {
      toast.error('Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post('/boards', form);
      setBoards((prev) => [data, ...prev]);
      setForm({ title: '', description: '' });
      setShowForm(false);
      toast.success('Board created!');
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to create board');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this board and all its tasks? This cannot be undone.')) return;
    try {
      await api.delete(`/boards/${id}`);
      setBoards((prev) => prev.filter((b) => b._id !== id));
      toast.success('Board deleted');
    } catch {
      toast.error('Failed to delete board');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Boards</h1>
          <Button onClick={() => setShowForm((v) => !v)}>+ New Board</Button>
        </div>

        {/* Create board form */}
        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 flex flex-col gap-3"
          >
            <Input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              placeholder="Board title *"
              autoFocus
            />
            <Input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Description (optional)"
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={creating}>
                {creating ? 'Creating…' : 'Create Board'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Board grid */}
        {loading ? (
          <div className="text-center py-24 text-gray-400">Loading boards…</div>
        ) : boards.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg mb-1">No boards yet</p>
            <p className="text-gray-400 text-sm">Click &ldquo;New Board&rdquo; to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((board) => (
              <BoardCard key={board._id} board={board} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
