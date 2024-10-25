import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [bgImg, setbgImg] = useState('./content/images/alu2.jpg');
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirects to the login page
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen p-0 m-0">
      {/* Left Side: Background Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgImg})` }}></div>

      {/* Right Side: Registration Form */}
      <div className="flex flex-col items-center justify-center w-full bg-orange-200 lg:w-1/2 px-4 py-10 pb-20 lg:px-0 lg:py-0 sm:pb-40 lg:pb-28">
        <div className="mt-10 mb-10 lg:mt-20 lg:mb-16">
          {/* Title of the application */}
          <h1 className="text-3xl lg:text-5xl font-bold text-center text-black">Alumni Management with Event Management</h1>
        </div>

        <div className="relative w-full h-auto sm:w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[70%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-4 pb-7 gap-8 pt-10 lg:pt-7 bg-white">
          {/* Card container for the registration form */}

          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-3xl font-bold text-black p-2 rounded-md">Alumni Management Register</span>
          </div>

          {/* Welcome Message */}
          <span className="text-lg lg:text-xl font-semibold">Hello, 👋 Welcome AMSEM!</span>

          {/* Registration Form */}
          <div className="flex flex-col items-stretch w-full gap-3">
            <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
              {/* Username Input with Icon */}
              <ValidatedField
                label="Username"
                name="username"
                placeholder="Your username"
                validate={{
                  required: { value: true, message: 'Your username is required.' },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Your username is invalid.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Your username is required to be at least 1 character.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Your username cannot be longer than 50 characters.',
                  },
                }}
                data-cy="username"
                className="w-full h-auto min-h-[40px] text-base lg:text-lg rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
              />

              <ValidatedField
                label="Email"
                name="email"
                placeholder="Your email"
                type="email"
                validate={{
                  required: { value: true, message: 'Your email is required.' },
                  minLength: {
                    value: 5,
                    message: 'Your email is required to be at least 5 characters.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Your email cannot be longer than 50 characters.',
                  },
                  validate: v => isEmail(v) || 'Your email is invalid.',
                }}
                className="w-full h-auto min-h-[40px] text-base lg:text-lg rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                data-cy="email"
              />

              <ValidatedField
                label="Password"
                name="firstPassword"
                placeholder="Your password"
                type="password"
                onChange={updatePassword}
                validate={{
                  required: { value: true, message: 'Your password is required.' },
                  minLength: {
                    value: 4,
                    message: 'Your password is required to be at least 4 characters.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Your password cannot be longer than 50 characters.',
                  },
                }}
                data-cy="firstPassword"
                className="w-full h-auto min-h-[40px] text-base lg:text-lg rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
              />

              <Button
                id="register-submit"
                type="submit"
                data-cy="submit"
                className="mt-2 w-full btn btn-block btn-primary bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register
              </Button>

              {/* Login Redirect Link */}
              <div className="flex justify-center mt-4 text-blue-700 text-sm lg:text-md">
                Already have an account?{' '}
                <span className="ml-2">
                  <a
                    onClick={handleLoginRedirect}
                    className="flex justify-center text-purple-600 cursor-pointer hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-100 hover:underline"
                  >
                    Login instead
                  </a>
                </span>
              </div>
            </ValidatedForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
