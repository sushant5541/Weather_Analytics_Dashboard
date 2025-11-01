import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCities, clearSearchResults, fetchCurrentWeather } from '../../redux/actions/weatherActions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.weather.searchResults);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    
    if (value.length > 1) {
      await dispatch(searchCities(value));
      setIsOpen(true);
    } else {
      dispatch(clearSearchResults());
      setIsOpen(false);
    }
  };

  const handleSelectCity = async (city) => {
    await dispatch(fetchCurrentWeather(city.name));
    setQuery('');
    dispatch(clearSearchResults());
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    dispatch(clearSearchResults());
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for cities..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto border border-gray-100">
          {searchResults.map((city, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectCity(city)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0 transition-colors"
            >
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-500">
                  {city.region && `${city.region}, `}{city.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query.length > 1 && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl z-50 p-4 text-center text-gray-500">
          No cities found
        </div>
      )}
    </div>
  );
};

export default SearchBar;