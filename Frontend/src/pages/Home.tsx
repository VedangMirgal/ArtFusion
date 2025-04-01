import { useState } from 'react';
// import Navbar from '../components/Navbar';

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showLoginForm) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/design';
  };

  const handleSignUp = () => {
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/design';
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-fixed">
      {/* <Navbar /> */}

      <div className="container mx-auto px-6 py-10 md:py-16 flex items-center justify-between">
        <div className="text-left w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
            ArtFusion -<br /><span className="text-indigo-300">2D and 3D</span> Style Synthesis
          </h1>
          <p className="text-gray-200 leading-relaxed mb-8 text-lg md:text-xl max-w-xl">
            ArtFusion is an innovative blend of 2D and 3D art styles that combines the timeless 
            appeal of flat visuals with the immersive qualities of depth.
          </p>
          <button
            onClick={() => setShowLoginForm(true)}
            className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-full font-semibold text-lg 
              transition duration-300 transform hover:scale-105 hover:bg-white hover:text-indigo-600"
          >
            JOIN US
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          {showLoginForm ? (
            <div className="bg-white bg-opacity-60 backdrop-blur-md p-6 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Login Here</h2>
              {errorMessage && <p className="text-red-600 mb-3">{errorMessage}</p>}
              <input
                type="email"
                name="email"
                placeholder="Enter Email Here"
                value={loginData.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password Here"
                value={loginData.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Login
              </button>
              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setShowLoginForm(false);
                    setErrorMessage('');
                  }}
                  className="text-indigo-700 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            <div className="bg-white bg-opacity-60 backdrop-blur-md p-6 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Sign Up Here</h2>
              {errorMessage && <p className="text-red-600 mb-3">{errorMessage}</p>}
              <input
                type="text"
                name="name"
                placeholder="Enter Name Here"
                value={signUpData.name}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email Here"
                value={signUpData.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password Here"
                value={signUpData.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSignUp}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Sign up
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setShowLoginForm(true);
                    setErrorMessage('');
                  }}
                  className="text-indigo-700 font-semibold"
                >
                  Log in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
