import React, { useState } from 'react';
import { Star, CheckCircle, RotateCcw, } from 'lucide-react';

export default function MobilePreview({ config }) {
  // Screen 1 = 'survey', Screen 2 = 'thankYou'
  const [screen, setScreen] = useState('survey');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [comment, setComment] = useState('');

  const { content, styling } = config;

  const handleRatingClick = (ratingValue) => {
    setSelectedRating(ratingValue);
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setScreen('thankYou');
  };

  const handleReset = () => {
    setScreen('survey');
    setSelectedRating(0);
    setSelectedOptions([]);
    setComment('');
  };

  return (
    <div className="flex flex-col items-center">
      {/* Phone Header Indicator & Controls */}
      <div className="flex items-center justify-between w-full max-w-[320px] mb-3 text-xs text-gray-500">
        <span className="font-semibold uppercase tracking-wider text-gray-600">Mobile Preview</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScreen(screen === 'survey' ? 'thankYou' : 'survey')}
            className="text-blue-600 hover:text-blue-800 underline text-xs"
            type="button"
          >
            {screen === 'survey' ? 'View Thank You Screen' : 'View Survey Screen'}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded hover:bg-gray-200 text-gray-600"
            title="Reset interactive preview"
            type="button"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Mobile Device Mockup Frame */}
      <div className="w-[320px] h-[600px] bg-gray-900 rounded-[38px] p-3 shadow-2xl border-4 border-gray-800 relative flex flex-col">
        {/* Device Notch / Speaker */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-full z-20 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-900 rounded-full mr-2"></div>
          <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="w-full h-full bg-gray-100 rounded-[28px] overflow-hidden flex flex-col justify-start pt-8 pb-4 px-3 relative">
          
          {/* Simulated App Background Content behind widget */}
          <div className="absolute inset-0 pt-10 px-4 flex flex-col gap-3 opacity-30 pointer-events-none">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>

          {/* CSAT Interactive Card Component */}
          <div
            className="relative z-10 w-full shadow-lg border border-gray-200/50 p-4 transition-all duration-200 overflow-y-auto max-h-[490px]"
            style={{
              backgroundColor: styling.backgroundColor,
              borderRadius: `${styling.borderRadius}px`,
              fontSize: `${styling.fontSize}px`,
              fontWeight: styling.fontWeight,
            }}
          >
            {screen === 'survey' ? (
              /* SCREEN 1: SURVEY PAGE */
              <div className="flex flex-col gap-3.5">
                {/* Title & Subtitle */}
                <div className="text-center flex flex-col gap-1">
                  <h4
                    className="font-bold leading-tight"
                    style={{
                      color: styling.titleColor,
                      fontSize: `${styling.fontSize * 1.15}px`,
                    }}
                  >
                    {content.title || 'How was your experience?'}
                  </h4>
                  <p
                    className="leading-snug"
                    style={{
                      color: styling.subtitleColor,
                      fontSize: `${styling.fontSize * 0.85}px`,
                    }}
                  >
                    {content.subtitle || 'Please rate our service below.'}
                  </p>
                </div>

                {/* Rating UI (Stars or Numbers) */}
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {content.ratingType === 'stars' ? (
                    [1, 2, 3, 4, 5].map((starVal) => {
                      const isSelected = starVal <= selectedRating;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => handleRatingClick(starVal)}
                          className="p-1 transition-transform hover:scale-110 active:scale-95"
                          title={`Rate ${starVal} star${starVal > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={28}
                            style={{
                              fill: isSelected ? styling.ratingSelectedColor : 'transparent',
                              color: isSelected
                                ? styling.ratingSelectedColor
                                : styling.ratingUnselectedColor,
                            }}
                          />
                        </button>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5].map((numVal) => {
                      const isSelected = numVal === selectedRating;
                      return (
                        <button
                          key={numVal}
                          type="button"
                          onClick={() => handleRatingClick(numVal)}
                          className="w-9 h-9 rounded-full font-bold flex items-center justify-center border transition"
                          style={{
                            backgroundColor: isSelected
                              ? styling.ratingSelectedColor
                              : styling.ratingUnselectedColor,
                            color: isSelected ? '#ffffff' : '#374151',
                            borderColor: isSelected ? styling.ratingSelectedColor : '#d1d5db',
                            fontSize: `${styling.fontSize}px`,
                          }}
                        >
                          {numVal}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Feedback Options / Category Chips */}
                {content.options && content.options.length > 0 && (
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
                    <span
                      className="font-medium text-xs"
                      style={{ color: styling.subtitleColor }}
                    >
                      Feedback options:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {content.options.map((opt, idx) => {
                        const isChipSelected = selectedOptions.includes(opt);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleOptionToggle(opt)}
                            className="px-2.5 py-1 text-xs rounded-full border transition"
                            style={{
                              backgroundColor: isChipSelected ? styling.buttonColor : '#f3f4f6',
                              color: isChipSelected ? styling.buttonTextColor : '#374151',
                              borderColor: isChipSelected ? styling.buttonColor : '#e5e7eb',
                              borderRadius: `${styling.borderRadius}px`,
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Enable Comment Box */}
                {content.enableComment && (
                  <div className="flex flex-col gap-1 pt-1">
                    <label
                      className="text-xs font-medium"
                      style={{ color: styling.subtitleColor }}
                    >
                      Additional Comments:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us more about your feedback..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-blue-500 bg-white shadow-xs"
                      style={{
                        borderRadius: `${Math.max(4, styling.borderRadius / 2)}px`,
                        color: styling.titleColor,
                      }}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="font-medium flex items-center justify-center transition hover:opacity-90 active:scale-95 shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: styling.buttonColor,
                      color: styling.buttonTextColor,
                      borderRadius: `${styling.borderRadius}px`,
                      width: `${styling.buttonWidth}px`,
                      height: `${styling.buttonHeight}px`,
                      fontSize: `${styling.fontSize}px`,
                      fontWeight: styling.fontWeight,
                    }}
                  >
                    {content.submitText || 'Submit'}
                  </button>
                </div>
              </div>
            ) : (
              /* SCREEN 2: THANK YOU PAGE */
              <div className="flex flex-col items-center text-center gap-3 py-2">
                {/* Media or Friendly Icon */}
                {content.thankYouMedia ? (
                  <img
                    src={content.thankYouMedia}
                    alt="Thank You Media"
                    className="max-h-24 w-auto object-contain rounded mb-1"
                    style={{ borderRadius: `${styling.borderRadius}px` }}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                    style={{
                      backgroundColor: `${styling.buttonColor}20`,
                      color: styling.buttonColor,
                    }}
                  >
                    <CheckCircle size={32} />
                  </div>
                )}

                {/* Thank You Title & Subtitle */}
                <h4
                  className="font-bold leading-tight"
                  style={{
                    color: styling.titleColor,
                    fontSize: `${styling.fontSize * 1.15}px`,
                  }}
                >
                  {content.thankYouTitle || 'Thank you for your feedback!'}
                </h4>
                <p
                  className="leading-snug"
                  style={{
                    color: styling.subtitleColor,
                    fontSize: `${styling.fontSize * 0.85}px`,
                  }}
                >
                  {content.thankYouSubtitle || 'Your response has been recorded successfully.'}
                </p>

                {/* Reset / Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-medium flex items-center justify-center transition hover:opacity-90 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: styling.buttonColor,
                      color: styling.buttonTextColor,
                      borderRadius: `${styling.borderRadius}px`,
                      width: `${styling.buttonWidth}px`,
                      height: `${styling.buttonHeight}px`,
                      fontSize: `${styling.fontSize}px`,
                      fontWeight: styling.fontWeight,
                    }}
                  >
                    {content.thankYouButtonText || 'Close'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Home indicator bar */}
          <div className="w-24 h-1 bg-gray-400 rounded-full mx-auto mt-auto pt-0.5"></div>
        </div>
      </div>
    </div>
  );
}

