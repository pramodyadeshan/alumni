import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Modal } from 'reactstrap';
import { getEntities } from 'app/entities/event/event.reducer';
import UpcomingJobPage from 'app/entities/job/monitor-job';
import UpcomingNEWSPage from 'app/entities/news/monitor-news';
import UpcomingVOPage from 'app/entities/volunteer-op/monitor-vo';
import UpcomingDonationPage from 'app/entities/donation/monitor-donation';

// Define the Event interface
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: boolean;
}

// Define the UpcomingEventPage component
const UpcomingEventPage: React.FC = () => {
  const eventList = useAppSelector(state => state.event.entities);

  const dispatch = useAppDispatch();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const handleCardClick = (event: Event) => {
    setOpen(true);
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, []);

  return (
    <div>
      {/* Centered Heading */}
      <div className="flex flex-wrap -mx-4">
        {eventList.map(event => (
          <div key={event.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
              <span className="float-end bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Event
              </span>
              <h2 className="text-2xl font-bold text-gray-900 pb-3 text-capitalize">{event.eventName}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-600">
                <strong>Date : </strong>{' '}
                {new Date(event.dateAndTime)
                  .toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}{' '}
                | <strong>Location : </strong> {event.location}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleCardClick(event)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <Modal isOpen={open} toggle={closeModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-capitalize">{selectedEvent.eventName} Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Description : </strong> {selectedEvent.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date : </strong>{' '}
              {new Date(selectedEvent.dateAndTime)
                .toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location : </strong> {selectedEvent.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Target Audience : </strong> {selectedEvent.targetAudience}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Coordinator : </strong> {selectedEvent.eventCoordinator}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const Monitor = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col">
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upcoming Programme</h1>
          </div>
          <UpcomingEventPage />
          <UpcomingJobPage />
          <UpcomingNEWSPage />
          <UpcomingVOPage />
          <UpcomingDonationPage />

          <div className="flex justify-center mt-4 mb-4">
            <button
              className="bg-gray-500 text-white p-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              onClick={() => navigate('/')} // Redirect to home page
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
