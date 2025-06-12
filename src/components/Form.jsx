import React, { useState, useEffect } from 'react';
import { useToast } from './Toast.jsx';

export default function Form({ onSave, item }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setErrors({});
    } else {
      setName('');
      setDescription('');
      setErrors({});
    }
  }, [item]);

  // Real-time validation while typing
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    if (field === 'name') {
      if (!value.trim()) newErrors.name = 'Name is required';
      else delete newErrors.name;
    }
    if (field === 'description') {
      if (!value.trim()) newErrors.description = 'Description is required';
      else if (value.length < 5)
        newErrors.description = 'Description must be at least 5 characters';
      else delete newErrors.description;
    }
    setErrors(newErrors);
  };

  const validateAll = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    else if (description.trim().length < 5)
      newErrors.description = 'Description must be at least 5 characters';
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formErrors = validateAll();
    if (Object.keys(formErrors).length > 0) {
      toast('Please fix form errors before submitting.', 'error');
      return;
    }

    onSave({ id: item?.id, name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 space-y-4 bg-white shadow-md rounded-xl">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => {
            setName(e.target.value);
            validateField('name', e.target.value);
          }}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={e => {
            setDescription(e.target.value);
            validateField('description', e.target.value);
          }}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {item ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
