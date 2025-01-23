import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetMessage } from '../src/store/contentSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.content);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', image);
    
    dispatch(createUser(formData)).then(() => {
      navigate('/app'); // Redirect after successful signup
    });
  };

  useEffect(() => {
    if (message || error) {
      // Reset message or error after 5 seconds
      const timeout = setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message, error, dispatch]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Signup'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-700">{message}</p>}
      {error && <p className="mt-4 text-center text-red-700">{error}</p>}
    </div>
  );
};

export default SignupPage;