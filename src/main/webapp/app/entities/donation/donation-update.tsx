import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntity, getEntity, reset, updateEntity } from './donation.reducer';

export const DonationUpdate = () => {
  const dispatch = useAppDispatch();
  const [bgImg, setbgImg] = useState('./content/images/alu7.jpg');
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const donationEntity = useAppSelector(state => state.donation.entity);
  const loading = useAppSelector(state => state.donation.loading);
  const updating = useAppSelector(state => state.donation.updating);
  const updateSuccess = useAppSelector(state => state.donation.updateSuccess);

  const handleClose = () => {
    navigate('/donation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, [dispatch, id, isNew]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    // Ensure that the id is a number if it exists
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    // Merge the current entity with the new values from the form
    const entity = {
      ...donationEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity)); // Create a new donation entity
    } else {
      dispatch(updateEntity(entity)); // Update an existing donation entity
    }
  };

  const defaultValues = () =>
    isNew
      ? {
        // Default values for a new entity can be added here
      }
      : {
        ...donationEntity,
      };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container pt-2 pb-10">
        <h1 className="text-center text-3xl font-bold mb-4 mt-8 text-pink-500">{isNew ? 'Create' : 'Edit'} Donation</h1>
        <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <ValidatedField
                label="Donation Name"
                id="donation-donationName"
                name="donationName"
                data-cy="donationName"
                type="text"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Contact Details"
                class="w-full px-3 py-2 border rounded-lg text-gray-700"
                id="donation-contactDetails"
                name="contactDetails"
                data-cy="contactDetails"
                type="text"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Billing Address"
                class="w-full px-3 py-2 border rounded-lg text-gray-700"
                id="donation-billingAddress"
                name="billingAddress"
                data-cy="billingAddress"
                type="text"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Donation Amount (LKR)"
                class="w-full px-3 py-2 border rounded-lg text-gray-700"
                id="donation-amount"
                name="amount"
                data-cy="amount"
                type="number"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Email Address"
                class="w-full px-3 py-2 border rounded-lg text-gray-700"
                id="donation-email"
                name="email"
                data-cy="email"
                type="email"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Description"
                class="w-full px-3 py-2 border rounded-lg text-gray-700"
                id="donation-description"
                name="description"
                data-cy="description"
                type="textarea"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />

              <ValidatedField
                label="Donation Type"
                id="donation-donationType"
                name="donationType"
                data-cy="donationType"
                type="select"
                class="w-full px-3 py-2 rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
              >
                <option value="">Select Donation Type</option>
                <option value="ONLINE">Online</option>
                <option value="MATERIAL">Material</option>
                <option value="CASH">Cash</option>
                <option value="CHEQUE">Cheque</option>
              </ValidatedField>

              <Button
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
                className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 border-none"
              >
                Submit Donation
              </Button>
            </ValidatedForm>
          )}
        </div>

        <div className="flex justify-center mt-4 md:mb-4">
          <button
            onClick={() => navigate('/donation')}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationUpdate;
