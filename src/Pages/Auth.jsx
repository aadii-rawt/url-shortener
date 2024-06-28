// src/components/AuthForm.js
import React, { useState } from 'react';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle login/sign up 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const user = res.user
        console.log(user);
        navigate('/')
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      }
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        const user = res.user
        console.log(user);
        navigate('/')
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-slate-800 text-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-white">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent outline-none border-gray-300 rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-transparent outline-none border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-transparent outline-none border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            className="text-blue-500 hover:underline ml-1"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setFormData({
                username: '',
                email: '',
                password: ''
              })
            }}>
            {isSignUp ? 'Login' : 'Sign Up'} 
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
