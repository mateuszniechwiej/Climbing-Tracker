import { useState } from "react";

export default function AddSession({ onAdd }) {
  const [formData, setFormData] = useState({
    color: '',
    gradeDifficulty: '',
    count: '',
    date: '',
    notes: ''       
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
        color: formData.color,
        count: parseInt(formData.count),
        date: formData.date,
        notes: formData.notes
    });
    setFormData({ color: '', gradeDifficulty: '', count: '', date: '', notes: '' });  // Reset
  };

  const gradeColors = [


  ]

  const gradeDifficulty = [
    'Easy', 'Medium', 'Hard', 'Very Hard'
  ];

  return (
    <><form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="gradeDifficulty" className="block text-sm font-medium text-gray-700">
            Grade Difficulty
          </label>
          <select
            id="gradeDifficulty"
            value={formData.gradeDifficulty}
            onChange={(e) => setFormData({ ...formData, gradeDifficulty: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Difficulty</option>
            {gradeDifficulty.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700">
            Count
          </label>
          <input
            type="number"
            id="count"
            value={formData.count}
            onChange={(e) => setFormData({ ...formData, count: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
      >
        Add Session
      </button> 
      </form>
    </>
  );
}

