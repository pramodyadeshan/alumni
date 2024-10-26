import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntity, getEntity, reset, updateEntity } from './volunteer-op.reducer';

export const VolunteerOPUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const volunteerOPEntity = useAppSelector(state => state.volunteerOP.entity);
  const loading = useAppSelector(state => state.volunteerOP.loading);
  const updating = useAppSelector(state => state.volunteerOP.updating);
  const updateSuccess = useAppSelector(state => state.volunteerOP.updateSuccess);
  const [bgImg, setbgImg] = useState('./content/images/alu11.png');
  const handleClose = () => {
    navigate('/volunteer-op' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...volunteerOPEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...volunteerOPEntity,
        };

  return (
    <div className="min-h-screen bg-cover bg-center relative mb-6 pt-10" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="w-full max-w-4xl bg-white p-6 rounded-md shadow-md mx-auto">
        {/* Form Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 pb-4">{isNew ? 'Create' : 'Edit'} Volunteer Opportunity</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isNew ? (
              <ValidatedField
                name="id"
                className="col-span-2"
                required
                readOnly
                id="volunteer-op-id"
                label="ID"
                validate={{ required: true }}
              />
            ) : null}

            <ValidatedField
              label="Volunteer Name"
              id="volunteer-op-volunteerName"
              name="volunteerName"
              data-cy="volunteerName"
              className="w-full rounded-md -mt-6"
              type="text"
              placeholder="Enter Volunteer Name"
              validate={{
                required: { value: true, message: 'This field is required' },
                pattern: { value: /^[A-Za-z\s.]+$/, message: 'Name can only contain letters, spaces, and pull stop.' },
              }}
            />

            <ValidatedField
              label="Date And Time"
              id="volunteer-op-dateAndTime"
              name="dateAndTime"
              data-cy="dateAndTime"
              type="datetime-local"
              className="w-full rounded-md -mt-6"
              validate={{ required: { value: true, message: 'This field is required' } }}
            />

            <ValidatedField
              label="Location"
              id="volunteer-op-location"
              name="location"
              data-cy="location"
              className="w-full rounded-md -mt-6"
              placeholder="Enter Location"
              type="text"
              validate={{ required: { value: true, message: 'This field is required' } }}
            />

            <ValidatedField
              label="Time Duration"
              id="volunteer-op-timeDuration"
              name="timeDuration"
              data-cy="timeDuration"
              type="number"
              className="w-full rounded-md -mt-6"
              placeholder="Enter Duration"
              validate={{ required: { value: true, message: 'This field is required' } }}
            />

            <ValidatedField
              label="Description"
              id="volunteer-op-description"
              name="description"
              data-cy="description"
              className="w-full rounded-md -mt-6 col-span-2"
              type="textarea"
              placeholder="Enter Description"
              rows="4"
              validate={{ required: { value: true, message: 'This field is required' } }}
            />

            <ValidatedField
              label="Member"
              id="volunteer-op-member"
              name="member"
              data-cy="member"
              className="w-full rounded-md -mt-6"
              type="number"
              placeholder="Enter Number of Members"
              validate={{ required: { value: true, message: 'This field is required' } }}
            />

            <ValidatedField
              label="Volunteer Op Coordinator"
              id="volunteer-op-volunteerOpCoordinator"
              name="volunteerOpCoordinator"
              data-cy="volunteerOpCoordinator"
              className="w-full rounded-md -mt-6"
              type="text"
              placeholder="Enter Coordinator Name"
              validate={{
                required: { value: true, message: 'This field is required' },
                pattern: { value: /^[A-Za-z\s.]+$/, message: 'Name can only contain letters, spaces, and pull stop.' },
              }}
            />

            <div className="col-span-2 flex justify-center mt-2 space-x-4">
              <Button
                className="bg-indigo-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
                {isNew ? 'Create' : 'Edit'} Opportunity
              </Button>

              {/* Cancel Button */}
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/volunteer-op"
                replace
                className="bg-red-500 text-white px-6 py-2 border-none rounded-md font-semibold hover:bg-red-600 transition duration-200"
              >
                Cancel
              </Button>

              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600 transition duration-200"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </ValidatedForm>
        )}
      </div>
    </div>
  );
};

export default VolunteerOPUpdate;
