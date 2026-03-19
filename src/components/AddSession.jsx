import { useState } from "react";

export default function AddSession({ onAdd }) {
  const [formData, setFormData] = useState({
    climbs: [{ color: '', gradeDifficulty: '', count: '' }],
    date: '',
    durationHrs: '',
    durationMins: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = `${formData.durationHrs || 0}h :${formData.durationMins || '00'}m`;
    onAdd({
      climbs: formData.climbs.filter(climb => climb.color && climb.gradeDifficulty && climb.count),
      date: formData.date,
      duration: duration,
      notes: formData.notes
    });
    setFormData({
      climbs: [{ color: '', gradeDifficulty: '', count: '' }],
      date: '',
      durationHrs: '',
      durationMins: '',
      notes: ''
    });
  };

  const addClimb = () => {
    setFormData({
      ...formData,
      climbs: [...formData.climbs, { color: '', gradeDifficulty: '', count: '' }]
    });
  };

  const updateClimb = (index, field, value) => {
    const newClimbs = [...formData.climbs];
    newClimbs[index][field] = value;
    setFormData({ ...formData, climbs: newClimbs });
  };

  const removeClimb = (index) => {
    setFormData({
      ...formData,
      climbs: formData.climbs.filter((_, i) => i !== index)
    });
  };

  const gradeColors = ['Murple', 'Flags', 'Pink', 'Black', 'Blue', 'Red', 'Yellow'];
  const gradeDifficulties = ['Easy', 'Medium', 'Hard', 'Very Hard'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Climbs
        </label>
        {formData.climbs.map((climb, index) => (
          <div key={index} className="flex gap-2 mb-2 items-end">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Color</label>
              <select
                value={climb.color}
                onChange={(e) => updateClimb(index, 'color', e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                required
              >
                <option value="">Select Color</option>
                {gradeColors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Difficulty</label>
              <select
                value={climb.gradeDifficulty}
                onChange={(e) => updateClimb(index, 'gradeDifficulty', e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                required
              >
                <option value="">Select Difficulty</option>
                {gradeDifficulties.map((diff) => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Count</label>
              <input
                type="number"
                value={climb.count}
                onChange={(e) => updateClimb(index, 'count', e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                required
              />
            </div>
            {formData.climbs.length > 1 && (
              <button
                type="button"
                onClick={() => removeClimb(index)}
                className="px-2 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addClimb}
          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
        >
          + Add Climb
        </button>
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
            <option value="">--</option>
            {[0,1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h}h</option>)}
          </select>
          <select
            value={formData.durationMins}
            onChange={(e) => setFormData({ ...formData, durationMins: e.target.value })}
            className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            required
          >
            <option value="">--</option>
            {[0,15,30,45].map(m => <option key={m} value={m.toString().padStart(2, '0')}>{m}m</option>)}
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
  );
}


