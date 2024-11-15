import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [heartrate, setHeartrate] = useState('');
  const [calories, setCalories] = useState('');
  const [performanceScore, setPerformanceScore] = useState(null);
  const [marathonTime, setMarathonTime] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getMarathonandEffortScore = async () => {
    try {
      const response = await axios.get('http://143.198.146.147:8000/api/users/details/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPerformanceScore(response.data.effort_score);
      if (response.data.marathon_time === null) {
        setMarathonTime('No disponible');
        return;
      }
      setMarathonTime(response.data.marathon_time);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const getWorkouts = async () => {
    try {
      const response = await axios.get('http://143.198.146.147:8000/api/workouts/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://143.198.146.147:8000/api/workouts/',
        {
          distance,
          time,
          heartrate,
          calories,
          date: new Date().toISOString().split('T')[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Clear form and refresh workouts after successful submission
      setDistance('');
      setTime('');
      setHeartrate('');
      setCalories('');
      getWorkouts();
    } catch (error) {
      console.error('Error submitting workout:', error);
    }
  };

  useEffect(() => {
    getMarathonandEffortScore();
    getWorkouts();
  }, []);

  // Format duration string to HH:MM:SS
  const formatDuration = (duration) => {
    try {
      const [hours, minutes, seconds] = duration.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    } catch (error) {
      return duration;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header with Logout Button */}
          <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Panel de Entrenamiento</h2>
              <p className="text-orange-100 mt-1">Registra tu actividad física diaria</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-orange-600 rounded-md hover:bg-orange-50 font-medium transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleWorkoutSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distancia
                  </label>
                  <input
                    type="number"
                    placeholder="Kilómetros"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiempo
                  </label>
                  <input
                    type="text"
                    placeholder="HH:MM:SS"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ritmo Cardíaco
                  </label>
                  <input
                    type="number"
                    placeholder="Pulsaciones por minuto"
                    value={heartrate}
                    onChange={(e) => setHeartrate(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calorías
                  </label>
                  <input
                    type="number"
                    placeholder="kcal"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Registrar Entrenamiento
                </button>
              </div>
            </form>

            {performanceScore != null && (
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Score de Rendimiento
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-black">
                        {performanceScore}
                      </dd>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Tiempo Estimado de Maratón
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-black">
                        {marathonTime}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workout History Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Entrenamientos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distancia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiempo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ritmo Cardíaco
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calorías
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workouts.map((workout, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(workout.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {workout.distance} km
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(workout.time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {workout.heartrate} bpm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {workout.calories} kcal
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;