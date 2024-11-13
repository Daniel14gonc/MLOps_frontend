import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: "url('/assets/running.jpg')",
      }}
    >
      {/* Header */}
      <div className="w-full py-10 px-8 flex flex-row justify-between fixed top-0 z-50">
        <div className="text-white font-bold text-2xl">Workout Tracker</div>
        <div className='flex flex-row px-4'>
          <div
            onClick={handleLogin}
            className="mr-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-700 transition cursor-pointer"
          >
            Login
          </div>
          <div
            onClick={handleRegister}
            className="bg-white text-orange-500 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300 transition cursor-pointer"
          >
            Register
          </div>
        </div>
      </div>
      <div className="landing-overlay">

        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-5xl font-bold mb-6 text-center text-white">Bienvenido a Workout Tracker</h1>
          <p className="text-lg mb-8 text-center max-w-lg text-white">
          ¡Registra tus entrenamientos y mejora tu rendimiento! Mantente motivado y alcanza tus objetivos con nuestro rastreador fácil de usar.
          </p>
          <div className="space-x-4 flex">
            <button
              onClick={handleRegister}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              Empecemos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;