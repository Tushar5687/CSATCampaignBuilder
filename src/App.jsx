import  { useState } from 'react';
import { Sliders, FileText, LayoutDashboard} from 'lucide-react';
import ContentTab from './components/ContentTab';
import StylingTab from './components/StylingTab';
import MobilePreview from './components/MobilePreview';

const initialConfig = {
  content: {
    title: 'How satisfied are you with our service?',
    subtitle: 'Your feedback helps us create a better experience for you.',
    ratingType: 'stars', // 'stars' | 'numbers'
    options: ['Quick Response', 'Helpful Agent', 'Problem Resolved', 'Easy Process'],
    enableComment: true,
    submitText: 'Submit Feedback',
    thankYouMedia: '',
    thankYouTitle: 'Thank you for your feedback!',
    thankYouSubtitle: 'We appreciate your time and review.',
    thankYouButtonText: 'Done',
  },
  styling: {
    backgroundColor: '#ffffff',
    titleColor: '#111827',
    subtitleColor: '#6b7280',
    buttonColor: '#2563eb',
    buttonTextColor: '#ffffff',
    ratingSelectedColor: '#fbbf24',
    ratingUnselectedColor: '#e5e7eb',
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 8,
    buttonWidth: 140,
    buttonHeight: 40,
  },
};

export default function App() {
  const [config, setConfig] = useState(initialConfig);
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'styling'

  // Single unified update handler to prevent prop drilling
  const updateConfig = (section, updates) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-none">CSAT Campaign Builder</h1>
            <span className="text-xs text-gray-500">Design, customize, and preview in real time</span>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel (60% width) - Configuration Dashboard */}
        <section className="w-full lg:w-[60%] flex flex-col gap-5">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-white rounded-t-lg px-2 pt-2 shadow-xs">
            <button
              type="button"
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'content'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('content')}
            >
              <FileText size={16} />
              Content
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'styling'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('styling')}
            >
              <Sliders size={16} />
              Styling
            </button>
          </div>

          {/* Active Tab Panel */}
          <div>
            {activeTab === 'content' ? (
              <ContentTab config={config} updateConfig={updateConfig} />
            ) : (
              <StylingTab config={config} updateConfig={updateConfig} />
            )}
          </div>
        </section>

        {/* Right Panel (40% width) - Sticky Mobile Device Mockup */}
        <section className="w-full lg:w-[40%] flex justify-center">
          <div className="sticky top-24 self-start w-full flex justify-center">
            <MobilePreview config={config} />
          </div>
        </section>

      </main>
    </div>
  );
}
