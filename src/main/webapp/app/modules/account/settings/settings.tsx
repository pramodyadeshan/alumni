import React, { useEffect, useState } from 'react';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { reset, saveAccountSettings } from './settings.reducer';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const accountFromStore = useAppSelector(state => state.authentication.account);
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [profilePic, setProfilePic] = useState('./content/images/profile_picture.jpg');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (accountFromStore) {
      setAccount({
        firstName: accountFromStore.firstName || '',
        lastName: accountFromStore.lastName || '',
        email: accountFromStore.email || '',
      });
    }
  }, [accountFromStore]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAccount(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleRedirect = () => {
    navigate('/'); // Redirects to the homepage
  };

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...accountFromStore,
        ...values,
      }),
    );
  };

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };
  const handleSave = () => {
    setEditMode(false);
    // Here you would normally handle saving the profile changes to a backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center md:px-6 md:py-10">
      {/* Main Profile Container */}
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-4xl mx-auto flex flex-col md:flex-row">
        <div className="flex flex-col items-center p-8 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl w-full md:w-1/3">
          <div className="w-32 h-32 rounded-full border-2 border-white overflow-hidden mb-6">
            <label className="cursor-pointer">
              <img
                src={profilePic}
                alt="Profile"
                className="object-cover w-full h-full"
                onClick={() => document.getElementById('profilePic')?.click()}
              />

              <input type="file" accept="image/*" onChange={handlePicUpload} className="mb-4 text-white hidden" id={profilePic} />
            </label>
          </div>
          <h4 className="text-2xl font-bold mb-2 bg-transparent border-b border-white text-center w-full">
            {' '}
            {account.firstName + ' ' + account.lastName}{' '}
          </h4>
          <h4 className="text-sm font-semibold mb-2 bg-transparent text-gray-400 border-white text-center w-full"> {account.email} </h4>
        </div>

        {/* Right Side: Profile Details */}
        <div className="flex flex-col justify-center p-8 w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Profile Details</h3>

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">First name</label>
                {editMode ? (
                  <ValidatedField
                    name="firstName"
                    className="mt-2 border border-gray-300 rounded"
                    id="firstName"
                    placeholder="Your First name"
                    value={account.firstName}
                    onChange={e => setAccount({ ...account, firstName: e.target.value })}
                    validate={{
                      required: { value: true, message: 'Your first name is required.' },
                      minLength: { value: 1, message: 'Your first name is required to be at least 1 character' },
                      maxLength: { value: 50, message: 'Your first name cannot be longer than 50 characters' },
                    }}
                    data-cy="firstname"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{account.firstName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Last name</label>
                {editMode ? (
                  <ValidatedField
                    name="lastName"
                    className="mt-2 border border-gray-300 rounded"
                    id="lastName"
                    placeholder="Your Last name"
                    value={account.lastName}
                    onChange={e => setAccount({ ...account, lastName: e.target.value })}
                    validate={{
                      required: { value: true, message: 'Your last name is required.' },
                      minLength: { value: 1, message: 'Your last name is required to be at least 1 character' },
                      maxLength: { value: 50, message: 'Your last name cannot be longer than 50 characters' },
                    }}
                    data-cy="lastname"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{account.lastName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Email Address</label>
                {editMode ? (
                  <ValidatedField
                    name="email"
                    className="mt-2 border border-gray-300 rounded"
                    placeholder="Your Email Address"
                    value={account.email}
                    onChange={e => setAccount({ ...account, email: e.target.value })}
                    type="email"
                    validate={{
                      required: { value: true, message: 'Your email is required.' },
                      minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
                      maxLength: { value: 254, message: 'Your email cannot be longer than 254 characters.' },
                      validate: v => isEmail(v) || 'Your email is invalid.',
                    }}
                    data-cy="email"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{account.email}</p>
                )}
              </div>
            </div>
            {editMode && (
              <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full" type="submit">
                Save Changes
              </button>
            )}
          </ValidatedForm>
        </div>
      </div>

      <div className="mt-10">
        <button className="bg-gray-500 text-white font-bold px-10 py-4 rounded-lg hover:bg-gray-600 transition" onClick={handleRedirect}>
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
