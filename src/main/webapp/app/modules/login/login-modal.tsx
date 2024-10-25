import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Alert, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
// import ChangeThemes from '../components/ChangeThemes';
// import { DiReact } from 'react-icons/di';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError } = props;

  const handleLoginSubmit = e => {
    handleSubmit(login)(e);
  };

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen p-0 m-0">
      {/* Left Side: Background Image */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url(/content/images/alu1.jpg)' }}
      ></div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center w-full bg-amber-100 lg:w-1/2 px-4 py-20 lg:px-0 lg:py-0 sm:pb-40 lg:pb-28">
        <div className="mt-10 mb-10 lg:mt-20 lg:mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-center text-black">Alumni Management with Event Management</h1>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLoginSubmit}
          className="relative w-full h-auto sm:w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[70%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-4 pb-7 gap-8 pt-10 lg:pt-7 bg-white"
        >
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-3xl font-bold text-black p-2 rounded-md">Alumni Management Login</span>
          </div>

          {/* Welcome Message */}
          <span className="text-lg lg:text-xl font-semibold">Hello, 👋 Welcome AMSEM!</span>

          {/* Login Form Inputs */}
          <div className="flex flex-col items-stretch w-full gap-3 bg">
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
            </Col>

            <ValidatedField
              name="username"
              label="Username"
              placeholder="Your username"
              required
              autoFocus
              data-cy="username"
              validate={{ required: 'Username cannot be empty!' }}
              register={register}
              error={errors.username as FieldError}
              isTouched={touchedFields.username}
              className="-mt-4 lg:-mt-8"
            />

            <ValidatedField
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              required
              data-cy="password"
              validate={{ required: 'Password cannot be empty!' }}
              register={register}
              error={errors.password as FieldError}
              isTouched={touchedFields.password}
              className="-mt-2"
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer label">
                  <input type="checkbox" className="w-4 h-4 rounded-md checkbox checkbox-primary" />
                  <span className="text-xs label-text">Remember me</span>
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-block btn-primary bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>

            {/* Redirect to Registration */}
            <div className="flex justify-center mt-2 text-blue-700 text-sm lg:text-md">
              Don't you have an account?{' '}
              <span className="ml-2">
                <Link
                  to="/account/register"
                  className="flex justify-center text-purple-600 cursor-pointer hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-100 hover:underline"
                >
                  Register here
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
