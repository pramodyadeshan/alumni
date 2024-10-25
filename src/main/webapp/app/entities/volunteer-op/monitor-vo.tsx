import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Modal } from 'reactstrap';
import volunteerOP, { getEntities } from 'app/entities/volunteer-op/volunteer-op.reducer';

// Define the Vo interface
interface Vo {
  id: number;
  volunteerName: string;
  dateAndTime: string;
  location: string;
  timeDuration: string;
  description: string;
  member: string;
  volunteerOpCoordinator: string;
}

const UpcomingVOPage: React.FC = () => {
  const voList = useAppSelector(state => state.volunteerOP.entities);
  const dispatch = useAppDispatch();
  const [selectedVo, setSelectedVo] = useState<Vo | null>(null);
  const [open, setOpen] = useState(false);

  const handleVoCardClick = (vo: Vo) => {
    setOpen(true);
    setSelectedVo(vo);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedVo(null);
  };

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' })); // Dispatch action to fetch entities
  }, [dispatch]);

  return (
    <div>
      {/* Centered Heading */}
      <div className="flex flex-wrap -mx-4">
        {voList.map((vo: Vo) => (
          <div key={vo.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
              <span className="float-end bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                Volunteer OP
              </span>
              <h2 className="text-2xl font-bold text-gray-900 pb-3 text-capitalize">{vo.volunteerName}</h2>
              <p className="text-gray-600">
                <strong>Location : </strong> {vo.location}
              </p>
              <p className="text-gray-600">
                <strong>Date : </strong>{' '}
                {new Date(vo.dateAndTime)
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleVoCardClick(vo)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected Volunteer Opportunity details */}
      {selectedVo && (
        <Modal isOpen={open} toggle={closeModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-capitalize">{selectedVo.volunteerName} Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Location : </strong> {selectedVo.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date : </strong>{' '}
              {new Date(selectedVo.dateAndTime)
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
              <strong>Time Duration : </strong> {selectedVo.timeDuration}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description : </strong> {selectedVo.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Member : </strong> {selectedVo.member}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Volunteer Op Coordinator : </strong> {selectedVo.volunteerOpCoordinator}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingVOPage;
