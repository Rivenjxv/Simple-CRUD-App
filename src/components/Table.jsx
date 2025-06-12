import React, { useState, useEffect } from 'react';
import Form from './Form.jsx';
import { useToast } from './Toast.jsx';

export default function Table() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('crud_data');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const saveData = newData => {
    setData(newData);
    localStorage.setItem('crud_data', JSON.stringify(newData));
  };

  const handleSave = item => {
    let newData;
    if (item.id) {
      newData = data.map(d => (d.id === item.id ? item : d));
    } else {
      newData = [...data, { ...item, id: Date.now() }];
    }
    saveData(newData);
    setEditing(null);
  };

  const handleDelete = id => {
    if (confirm('Delete this item?')) {
      const newData = data.filter(d => d.id !== id);
      saveData(newData);
      toast('Item deleted', 'info');
    }
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <Form onSave={handleSave} item={editing} />
      <div className="py-3 border-t border-gray-300"></div>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full overflow-hidden text-sm border-collapse rounded-lg">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-500 to-purple-500">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id} className="transition border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3 space-x-2 text-center">
                  <button onClick={() => setEditing(item)} className="px-3 py-1 text-white transition bg-yellow-400 rounded-lg hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {!filteredData.length && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredData.map(item => (
          <div key={item.id} className="p-4 bg-gray-100 border rounded-lg shadow">
            <div className="mb-2">
              <strong>Name:</strong> {item.name}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {item.description}
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditing(item)} className="px-3 py-1 text-white transition bg-yellow-400 rounded-lg hover:bg-yellow-500">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}

        {!filteredData.length && (
          <div className="py-4 text-center text-gray-500">No items found.</div>
        )}
      </div>
    </div>
  );
}
