import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';
import { useNavigate } from 'react-router-dom';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(state => state.password.loading);

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="container pt-2">
        <h1 className="text-center text-3xl font-bold mb-4 mt-8 text-pink-500">Change Password</h1>
        <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
              <ValidatedField
                label="Current Password"
                name="currentPassword"
                placeholder="Current password"
                type="password"
                validate={{
                  required: { value: true, message: 'Your password is required.' },
                }}
                data-cy="currentPassword"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
              />

              <ValidatedField
                label="New Password"
                name="newPassword"
                placeholder="New password"
                type="password"
                validate={{
                  required: { value: true, message: 'Your password is required.' },
                  minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
                  maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
                }}
                onChange={updatePassword}
                data-cy="newPassword"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
              />

              <PasswordStrengthBar password={password} />

              <ValidatedField
                label="New password confirmation"
                name="confirmPassword"
                placeholder="Confirm the new password"
                type="password"
                validate={{
                  required: { value: true, message: 'Your confirmation password is required.' },
                  minLength: {
                    value: 4,
                    message: 'Your confirmation password is required to be at least 4 characters.',
                  },
                  maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
                  validate: v => v === password || 'The password and its confirmation do not match!',
                }}
                data-cy="confirmPassword"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
              />

              <Button
                color="success"
                type="submit"
                data-cy="submit"
                className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 border-none"
              >
                Save
              </Button>
            </ValidatedForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
