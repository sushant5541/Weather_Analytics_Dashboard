import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cloud, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard/Dashboard';
import SearchBar from './components/Search/SearchBar';
import SettingsModal from './components/Settings/SettingsModal';
import DetailedView from './components/DetailedView/DetailedView';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const selectedCity = useSelector((state) => state.weather.selectedCity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Weather Analytics
              </h1>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <SearchBar />
              <button
                onClick={() => setShowSettings(true)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <Dashboard />
      </main>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      
      {selectedCity && <DetailedView />}

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">
            Weather data provided by WeatherAPI.com | 
            Data refreshes automatically every 60 seconds
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;