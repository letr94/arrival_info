import React from 'react';
import { Flight } from '../types';
import { MapPin, Clock, Plane } from 'lucide-react';

interface FlightListProps {
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  if (flights.length === 0) {
    return <p className="text-center text-gray-500">No flights found. Try adjusting your search criteria.</p>;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const getAirlineLogo = (iataCode: string) => {
    return `https://content.airhex.com/content/logos/airlines_${iataCode}_50_50_t.png`;
  };

  return (
    <div className="space-y-6">
      {flights.map((flight) => (
        <div key={`${flight.flight.iata}-${flight.departure.scheduled}`} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={getAirlineLogo(flight.airline.iata)}
                  alt={`${flight.airline.name} logo`}
                  className="w-8 h-8 mr-2 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=Logo';
                  }}
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {flight.airline.name} - Flight {flight.flight.iata}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(flight.flight_status)}`}>
                {flight.flight_status}
              </span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Departure</h4>
                <p className="text-gray-800">{flight.departure.airport} ({flight.departure.iata})</p>
                <p className="text-sm text-gray-600">{formatDate(flight.departure.scheduled)}</p>
                <p className="text-sm text-gray-600">Terminal: {flight.departure.terminal || 'N/A'}</p>
                <p className="text-sm text-gray-600">Gate: {flight.departure.gate || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Arrival</h4>
                <p className="text-gray-800">{flight.arrival.airport} ({flight.arrival.iata})</p>
                <p className="text-sm text-gray-600">{formatDate(flight.arrival.estimated)}</p>
                <p className="text-sm text-gray-600">Terminal: {flight.arrival.terminal || 'N/A'}</p>
                <p className="text-sm text-gray-600">Gate: {flight.arrival.gate || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">
                  {flight.arrival.delay ? `Delayed by ${flight.arrival.delay} minutes` : 'On time'}
                </span>
              </div>
              <button
                onClick={() => {
                  // Here you would implement the logic to show directions
                  alert(`Directions to Gate ${flight.arrival.gate} at ${flight.arrival.airport}`);
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;