import { useState } from 'react';
import { newJournalAdd } from '../Connection/connection';
const AddJournalModal = ({ onClose, onAdd ,id}) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    let result = await newJournalAdd(id,title,imageUrl)
    console.log(result);
    if(result){
      onAdd({ _id : result._id,title, image: imageUrl ,});
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Journal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {imageUrl && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Image Preview</p>
              <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-md" 
                   onError={(e) => e.target.src = "/api/placeholder/400/300"} />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Add Journal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournalModal;