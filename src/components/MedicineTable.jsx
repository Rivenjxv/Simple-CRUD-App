import React, { useState, useEffect } from 'react';
import MedicineForm from './MedicineForm';
import { useToast } from './Toast';

export default function MedicineTable() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('medicines');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('medicines', JSON.stringify(newData));
  };

  const handleSave = (item) => {
    let newData;
    if (item.id) {
      newData = data.map((d) => (d.id === item.id ? item : d));
      toast('Medicine updated', 'success');
    } else {
      newData = [...data, { ...item, id: Date.now() }];
      toast('Medicine added', 'success');
    }
    saveData(newData);
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this medicine?')) {
      const newData = data.filter((d) => d.id !== id);
      saveData(newData);
      toast('Medicine deleted', 'info');
    }
  };

  // Apply search filter
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <MedicineForm onSave={handleSave} item={editing} />
      <div className="py-3 border-t border-gray-300"></div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full overflow-hidden text-sm border-collapse rounded-lg">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-500 to-purple-500">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="transition border-b hover:bg-gray-50">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.type}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4 space-x-2 text-center">
                  <button onClick={() => setEditing(item)}
                    className="px-4 py-2 text-sm font-medium text-white transition bg-yellow-400 rounded hover:bg-yellow-500">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!filteredData.length && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">No medicines found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredData.map((item) => (
          <div key={item.id} className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="mb-2"><strong>Name:</strong> {item.name}</div>
            <div className="mb-2"><strong>Type:</strong> {item.type}</div>
            <div className="mb-2"><strong>Quantity:</strong> {item.quantity}</div>
            <div className="flex justify-end mt-3 space-x-2">
              <button onClick={() => setEditing(item)}
                className="px-3 py-1 text-sm text-white transition bg-yellow-400 rounded hover:bg-yellow-500">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)}
                className="px-3 py-1 text-sm text-white transition bg-red-500 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {!filteredData.length && (
          <div className="p-4 text-center text-gray-400">No medicines found.</div>
        )}
      </div>
    </div>
  );
}
