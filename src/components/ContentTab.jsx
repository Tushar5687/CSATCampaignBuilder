import React, { useState } from 'react';
import { Plus, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ContentTab({ config, updateConfig }) {
  const [newOption, setNewOption] = useState('');

  const handleTextChange = (field, value) => {
    updateConfig('content', { [field]: value });
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    const updatedOptions = [...(config.content.options || []), newOption.trim()];
    updateConfig('content', { options: updatedOptions });
    setNewOption('');
  };

  const handleDeleteOption = (indexToRemove) => {
    const updatedOptions = (config.content.options || []).filter((_, idx) => idx !== indexToRemove);
    updateConfig('content', { options: updatedOptions });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      updateConfig('content', { thankYouMedia: mediaUrl });
    }
  };

  const handleRemoveMedia = () => {
    updateConfig('content', { thankYouMedia: '' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Initial Feedback Section */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 text-base border-b pb-2">Initial Feedback Details</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Survey Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. How satisfied are you with our service?"
            value={config.content.title}
            onChange={(e) => handleTextChange('title', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Survey Subtitle</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Please take a moment to rate your experience."
            value={config.content.subtitle}
            onChange={(e) => handleTextChange('subtitle', e.target.value)}
          />
        </div>
      </div>

      {/* Feedback Page Section */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 text-base border-b pb-2">Feedback Page Options</h3>

        {/* Rating Type Toggle */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Rating Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded text-sm font-medium border ${
                config.content.ratingType === 'stars'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handleTextChange('ratingType', 'stars')}
            >
              ★ Stars (1-5)
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded text-sm font-medium border ${
                config.content.ratingType === 'numbers'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handleTextChange('ratingType', 'numbers')}
            >
              123 Numbers (1-5)
            </button>
          </div>
        </div>

        {/* Dynamic Option List Builder */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Feedback Category Chips / Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="e.g. Customer Support, Speed, Quality"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddOption();
                }
              }}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1"
              onClick={handleAddOption}
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {/* Option list */}
          <div className="flex flex-col gap-2 mt-1">
            {config.content.options && config.content.options.length > 0 ? (
              config.content.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm"
                >
                  <span className="text-gray-700">{opt}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete option"
                    onClick={() => handleDeleteOption(idx)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No feedback options added yet.</p>
            )}
          </div>
        </div>

        {/* Checkbox for enableComment */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="enableComment"
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            checked={!!config.content.enableComment}
            onChange={(e) => handleTextChange('enableComment', e.target.checked)}
          />
          <label htmlFor="enableComment" className="text-sm font-medium text-gray-700 cursor-pointer">
            Enable additional text comment box
          </label>
        </div>

        {/* Submit Button Text */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Submit Button Label</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Submit Feedback"
            value={config.content.submitText}
            onChange={(e) => handleTextChange('submitText', e.target.value)}
          />
        </div>
      </div>

      {/* Thank You Page Section */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 text-base border-b pb-2">Thank You Page Details</h3>

        {/* Media Upload */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Thank You Image / Banner</label>
          {config.content.thankYouMedia ? (
            <div className="relative border border-gray-300 rounded p-2 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <img
                  src={config.content.thankYouMedia}
                  alt="Thank you preview"
                  className="w-12 h-12 object-cover rounded border"
                />
                <span className="text-xs text-gray-600 font-medium truncate max-w-[200px]">Uploaded Media</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveMedia}
                className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50"
                title="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition">
              <div className="flex flex-col items-center gap-1">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-600">Click to upload image</span>
                <span className="text-[11px] text-gray-400">PNG, JPG, GIF or SVG</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Thank You Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Thank you for your feedback!"
            value={config.content.thankYouTitle}
            onChange={(e) => handleTextChange('thankYouTitle', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Thank You Subtitle</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. We truly appreciate you taking the time to help us grow."
            value={config.content.thankYouSubtitle}
            onChange={(e) => handleTextChange('thankYouSubtitle', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Thank You Action Button Text</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Done / Close"
            value={config.content.thankYouButtonText}
            onChange={(e) => handleTextChange('thankYouButtonText', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

