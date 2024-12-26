import React, { useState } from 'react';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

interface DataItem {
  id: string;
  field: string;
  created_at: string;
}

export default function DataExample() {
  const [newField, setNewField] = useState('');
  const { data, loading, error, insert, update, remove } = useSupabaseData<DataItem>('your_table');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField.trim()) return;

    try {
      await insert({ field: newField });
      setNewField('');
    } catch (err) {
      console.error('Error adding data:', err);
    }
  };

  const handleUpdate = async (id: string, newValue: string) => {
    try {
      await update(id, { field: newValue });
    } catch (err) {
      console.error('Error updating data:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white">Data Operations Example</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="flex gap-4">
        <input
          type="text"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white"
          placeholder="Enter value..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </form>

      {/* Data List */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-xl"
          >
            <span className="text-white">{item.field}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newValue = prompt('Enter new value:', item.field);
                  if (newValue) handleUpdate(item.id, newValue);
                }}
                className="p-2 text-accent hover:text-accent-hover transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-white/60 py-8">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}