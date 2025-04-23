import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
     
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-purple-800 bg-opacity-10 p-8 rounded-xl backdrop-blur-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account ✨</h2>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-white p-3 rounded-lg mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-20 
                focus:border-white focus:outline-none text-white placeholder-gray-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-20 
                focus:border-white focus:outline-none text-white placeholder-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-20 
                focus:border-white focus:outline-none text-white placeholder-gray-300"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-20 
                focus:border-white focus:outline-none text-white placeholder-gray-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold
              hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-white text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:text-pink-200 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
