export const formatTemperature = (temp, unit = 'metric') => {
  if (unit === 'metric') {
    return `${Math.round(temp)}°C`;
  }
  return `${Math.round(temp * 9/5 + 32)}°F`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const formatHour = (dateString) => {
  const date = new Date(dateString);
  return `${date.getHours()}:00`;
};

export const getWindDirection = (degree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

export const getUVLevel = (uvIndex) => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};