import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, loginUser, resetMessage } from './store/contentSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [toggle, settoggle] = useState(false);

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

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({email})).then(() => {
      navigate('/app'); 
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
    <>
 {toggle?((
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
        <h5 className='mt-4'>create an account?<span className='cursor-pointer text-blue-400' onClick={()=>{settoggle(!toggle)}}>Login</span> </h5>
      </form>
      {message && <p className="mt-4 text-center text-green-700">{message}</p>}
      {error && <p className="mt-4 text-center text-red-700">{error}</p>}
    </div>
  )):(<div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form onSubmit={handleLogin}>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input type="email"
                id="email"
                value={email}
                onChange={(e) =>{ 
                  setEmail(e.target.value);
                  
                }}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"         
    />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Log in'}
      </button>
      <h5 className='mt-4'>create an account?<span className='cursor-pointer text-blue-400 ' onClick={()=>{settoggle(!toggle)}}>SignUp</span> </h5>
    </form>
    {message && <p className="mt-4 text-center text-green-700">{message}</p>}
    {error && <p className="mt-4 text-center text-red-700">{error}</p>}
    </div> )
    
  }
    </>
   
    
   
  );
};

export default SignupPage;







{/* <div className="h-full w-full bg-white">
<div class="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <image class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
        
          <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
</div> */}