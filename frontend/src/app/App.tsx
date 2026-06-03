import { useEffect, useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/trash';

interface TrashLog {
  _id: string;
  name: string;
  type: string;
  weight: number;
  createdAt: string;
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Plastic',
    weight: ''
  });

  const [trashLogs, setTrashLogs] = useState<TrashLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (value: string) => {
    return new Date(value).toISOString().split('T')[0];
  };

  const fetchTrashLogs = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE);
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || 'Gagal mengambil data');
      }

      setTrashLogs(body.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashLogs();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          weight: parseFloat(formData.weight)
        })
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || 'Gagal menyimpan data');
      }

      setTrashLogs([body.data, ...trashLogs]);
      setFormData({ name: '', type: 'Plastic', weight: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleDelete = async (id: string) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || 'Gagal menghapus data');
      }

      setTrashLogs(trashLogs.filter((log) => log._id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="mb-8 text-center">Smart Trash Log - Local Cloud Demo</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-6">Add New Entry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Citizen Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter citizen name"
                />
              </div>

              <div>
                <label htmlFor="type" className="block mb-2">
                  Trash Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper</option>
                  <option value="Metal">Metal</option>
                  <option value="Cardboard">Cardboard</option>
                </select>
              </div>

              <div>
                <label htmlFor="weight" className="block mb-2">
                  Weight in Kg
                </label>
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter weight"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors duration-200"
              >
                Submit Log
              </button>
            </form>
          </div>

          {/* Data Table Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-6">Trash Logs</h2>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2">No</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Type</th>
                    <th className="text-left py-3 px-2">Weight (Kg)</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Loading data...
                      </td>
                    </tr>
                  ) : trashLogs.length > 0 ? (
                    trashLogs.map((log, index) => (
                      <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">{index + 1}</td>
                        <td className="py-3 px-2">{log.name}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-1 rounded text-sm ${
                            log.type === 'Plastic' ? 'bg-blue-100 text-blue-700' :
                            log.type === 'Paper' ? 'bg-yellow-100 text-yellow-700' :
                            log.type === 'Metal' ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="py-3 px-2">{log.weight}</td>
                        <td className="py-3 px-2">{formatDate(log.createdAt)}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleDelete(log._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors duration-200"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No trash logs yet. Add your first entry!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}