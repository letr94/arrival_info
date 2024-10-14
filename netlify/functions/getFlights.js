import axios from 'axios';

exports.handler = async (event, context) => {
  const { arr_iata, airline_iata, flight_iata, date } = event.queryStringParameters;

  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.VITE_AVIATIONSTACK_API_KEY,
        arr_iata,
        airline_iata,
        flight_iata,
        date
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch flight data' })
    };
  }
};