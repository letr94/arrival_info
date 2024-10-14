import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import { Flight } from './types';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center justify-center">
          <Plane className="text-blue-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Flight Info</h1>
        </header>
        <main>
          <FlightSearch setFlights={setFlights} />
          <FlightList flights={flights} />
        </main>
      </div>
    </div>
  );
}

export default App;