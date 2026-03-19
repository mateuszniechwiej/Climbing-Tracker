import { useState } from "react";

export default function AddSession({ onAdd }) {

  const [formData, setFormData] = useState({
    color: '',
    gradeDifficulty: '',
    count: '',
    date: '',
    durationHrs: '',
    durationMins: '',
    notes: ''       
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = `${formData.durationHrs || 0}h :${formData.durationMins || '00'}m`;
    onAdd({
        color: formData.color,
        count: parseInt(formData.count),
        date: formData.date,
        notes: formData.notes,
        gradeDifficulty: formData.gradeDifficulty,
        duration: duration
    });
    setFormData({ color: '', gradeDifficulty: '', count: '', date: '', durationHrs: '', durationMins: '', notes: '' });  // Reset
  };

  const gradeColors = [
    'Murple', 'Flags', 'Pink', 'Black', 'Blue', 'Red', 'Yellow'

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
          <select
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Color</option>
            {gradeColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
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
            required
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
            required
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
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="flex gap-2">
            <select
              value={formData.durationHrs}
              onChange={(e) => setFormData({ ...formData, durationHrs: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              required
            >
              <option value="">0h</option>
              {[1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h}h</option>)}
            </select>
            <select
              value={formData.durationMins}
              onChange={(e) => setFormData({ ...formData, durationMins: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              required
            >
              <option value="">0m</option>
              {[5,15,30,45].map(m => <option key={m} value={m.toString().padStart(2, '0')}>{m}m</option>)}
            </select>
          </div>
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

