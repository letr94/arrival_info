import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Flight } from '../types';

interface FlightSearchProps {
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ setFlights }) => {
  const [airport, setAirport] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlights([]);

    try {
      const response = await axios.get(`/api/getFlights`, {
        params: {
          arr_iata: airport,
          airline_iata: airline,
          flight_iata: airline + flightNumber,
          date: date.toISOString().split('T')[0],
        }
      });

      console.log('API Response:', response.data); // Log the entire response

      if (response.data && Array.isArray(response.data.data)) {
        setFlights(response.data.data);
        if (response.data.data.length === 0) {
          setError('No flights found for the given criteria. Please try different search parameters.');
        }
      } else if (response.data && typeof response.data === 'object') {
        setError('API returned an unexpected format. Please check the console for details.');
        console.error('Unexpected API response format:', response.data);
      } else {
        setError('Invalid API response. Please try again later.');
      }
    } catch (err) {
      setError('Failed to fetch flight data. Please try again.');
      console.error('Error fetching flight data:', err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            placeholder="Airport IATA (e.g., LAX)"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            placeholder="Airline IATA (e.g., AA)"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Flight Number (e.g., 1234)"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? 'Searching...' : (
            <>
              <Search size={24} className="mr-2" />
              Search Flights
            </>
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FlightSearch;