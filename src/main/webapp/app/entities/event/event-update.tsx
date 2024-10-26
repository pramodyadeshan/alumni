import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntity, updateEntity, createEntity, reset } from './event.reducer';

export const EventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const eventEntity = useAppSelector(state => state.event.entity);
  const loading = useAppSelector(state => state.event.loading);
  const updating = useAppSelector(state => state.event.updating);
  const updateSuccess = useAppSelector(state => state.event.updateSuccess);

  const [bgImg, setbgImg] = useState('./content/images/alu4.jpg');
  const handleClose = () => {
    navigate('/event' + location.search);
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
      ...eventEntity,
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
          ...eventEntity,
        };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container pt-2">
        <h2 className="text-center text-3xl font-bold mb-4 mt-3">{isNew ? 'Create' : 'Edit'} Event</h2>
        <div className="max-w-lg mx-auto bg-amber-100 p-6 shadow-md rounded-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="event-id"
                  label="ID"
                  validate={{ required: true }}
                  class="w-full px-3 py-1 border rounded-lg text-gray-700"
                />
              ) : null}
              <ValidatedField
                label="Event Name"
                id="event-eventName"
                name="eventName"
                data-cy="eventName"
                type="text"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
                placeholder="Enter Event Name"
              />
              <ValidatedField
                label="Date And Time"
                id="event-dateAndTime"
                name="dateAndTime"
                data-cy="dateAndTime"
                type="datetime-local"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
              />
              <ValidatedField
                label="Location"
                id="event-location"
                name="location"
                data-cy="location"
                type="text"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
                placeholder="Enter Location"
              />
              <ValidatedField
                label="Event Type"
                id="event-eventType"
                name="eventType"
                data-cy="eventType"
                type="select"
                class="w-full px-3 py-2 rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
              >
                <option value="">Select Event Type</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Meetup">Meetup</option>
              </ValidatedField>

              <ValidatedField
                label="Description"
                id="event-description"
                name="description"
                data-cy="description"
                type="textarea"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
                placeholder="Enter Description"
              />

              <ValidatedField
                label="Target Audience"
                id="event-targetAudience"
                name="targetAudience"
                data-cy="targetAudience"
                type="select"
                class="w-full px-3 py-2 rounded-lg text-gray-700"
                validate={{ required: { value: true, message: 'This field is required' } }}
              >
                <option value="">Select Target Audience</option>
                <option value="Students">Students</option>
                <option value="Faculty">Faculty</option>
                <option value="Alumni">Alumni</option>
                <option value="Public">Public</option>
              </ValidatedField>

              <ValidatedField
                label="Event Coordinator"
                id="event-eventCoordinator"
                name="eventCoordinator"
                data-cy="eventCoordinator"
                type="text"
                class="w-full px-3 py-1 border rounded-lg text-gray-700"
                validate={{
                  required: { value: true, message: 'This field is required' },
                  pattern: { value: /^[A-Za-z\s.]+$/, message: 'Name can only contain letters, spaces, and pull stop.' },
                }}
                placeholder="Enter Event Coordinator"
              />

              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {isNew ? 'Add' : 'Update'} Event
              </Button>
            </ValidatedForm>
          )}
        </div>

        <div className="flex justify-center mt-4 md:mb-4">
          <button
            className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors mb-6"
            onClick={() => navigate('/event')} // Redirect to User Events page
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventUpdate;
