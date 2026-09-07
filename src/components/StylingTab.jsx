import React from 'react';

export default function StylingTab({ config, updateConfig }) {
  const handleStyleChange = (field, value) => {
    updateConfig('styling', { [field]: value });
  };

  const colors = [
    { label: 'Card Background', key: 'backgroundColor' },
    { label: 'Title Color', key: 'titleColor' },
    { label: 'Subtitle Color', key: 'subtitleColor' },
    { label: 'Button Background', key: 'buttonColor' },
    { label: 'Button Text Color', key: 'buttonTextColor' },
    { label: 'Rating Selected Color', key: 'ratingSelectedColor' },
    { label: 'Rating Unselected Color', key: 'ratingUnselectedColor' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Color Customization */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 text-base border-b pb-2">Color Palette</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colors.map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between p-2 border border-gray-100 rounded bg-gray-50">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5"
                  value={config.styling[key] || '#000000'}
                  onChange={(e) => handleStyleChange(key, e.target.value)}
                />
                <span className="text-xs font-mono text-gray-500 uppercase w-16">
                  {config.styling[key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography & Sizing */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 text-base border-b pb-2">Typography & Geometry</h3>

        {/* Font Size */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <label className="font-medium text-gray-700">Base Font Size (px)</label>
            <span className="text-gray-500 font-mono">{config.styling.fontSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="22"
            step="1"
            className="w-full cursor-pointer accent-blue-600"
            value={config.styling.fontSize || 14}
            onChange={(e) => handleStyleChange('fontSize', Number(e.target.value))}
          />
        </div>

        {/* Font Weight */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <label className="font-medium text-gray-700">Font Weight</label>
            <span className="text-gray-500 font-mono">{config.styling.fontWeight}</span>
          </div>
          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
            value={config.styling.fontWeight || 400}
            onChange={(e) => handleStyleChange('fontWeight', Number(e.target.value))}
          >
            <option value={300}>300 - Light</option>
            <option value={400}>400 - Normal</option>
            <option value={500}>500 - Medium</option>
            <option value={600}>600 - Semi Bold</option>
            <option value={700}>700 - Bold</option>
          </select>
        </div>

        {/* Border Radius */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <label className="font-medium text-gray-700">Border Radius (px)</label>
            <span className="text-gray-500 font-mono">{config.styling.borderRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="28"
            step="2"
            className="w-full cursor-pointer accent-blue-600"
            value={config.styling.borderRadius || 8}
            onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
          />
        </div>

        {/* Button Width */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <label className="font-medium text-gray-700">Button Width (px)</label>
            <span className="text-gray-500 font-mono">{config.styling.buttonWidth}px</span>
          </div>
          <input
            type="range"
            min="80"
            max="260"
            step="5"
            className="w-full cursor-pointer accent-blue-600"
            value={config.styling.buttonWidth || 100}
            onChange={(e) => handleStyleChange('buttonWidth', Number(e.target.value))}
          />
        </div>

        {/* Button Height */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <label className="font-medium text-gray-700">Button Height (px)</label>
            <span className="text-gray-500 font-mono">{config.styling.buttonHeight}px</span>
          </div>
          <input
            type="range"
            min="32"
            max="60"
            step="2"
            className="w-full cursor-pointer accent-blue-600"
            value={config.styling.buttonHeight || 40}
            onChange={(e) => handleStyleChange('buttonHeight', Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

