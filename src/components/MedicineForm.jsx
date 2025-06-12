import React, { useState, useEffect } from 'react';

export default function MedicineForm({ onSave, item }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setType(item.type);
      setQuantity(item.quantity);
    } else {
      setName('');
      setType('');
      setQuantity('');
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: item?.id, name, type, quantity });
    setName('');
    setType('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 space-y-4 bg-white shadow-lg rounded-xl">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Medicine Name</label>
        <input
          type="text"
          placeholder="Enter medicine name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          placeholder="Enter medicine type"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          placeholder="Enter quantity"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {item ? 'Update Medicine' : 'Save Medicine'}
      </button>
    </form>
  );
}
