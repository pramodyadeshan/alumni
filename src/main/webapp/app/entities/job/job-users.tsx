import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, NavbarProps } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/job/job.reducer';

export const JobUsers: React.FC<NavbarProps> = ({ username }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const jobList = useAppSelector(state => state.job.entities);
  const [bgImg, setbgImg] = useState('./content/images/alu8.png');

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, []);

  const closeModal = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container mx-auto pt-2">
        <h1 className="text-center text-3xl font-bold mb-4 mt-12 text-slate-950 pt-2">Available Jobs</h1>
        {jobList.length === 0 ? (
          <div className="flex justify-center items-center text-center">
            <div
              className="flex items-center justify-center p-4 mb-4 text-md text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Job alert!</span> Sorry, no data found.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobList.map((job, i) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer border-4 border-yellow-500"
                onClick={() => {
                  setSelectedJob(job);
                  setOpen(true);
                }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{job.jobName}</h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Company:</strong> {job.companyName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {job.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home Page Button */}
        <div className="flex justify-center mt-4 pb-16">
          <button
            className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => navigate('/')} // Navigate to Home Page
          >
            Back to Home Page
          </button>
        </div>
      </div>

      {/*Job Detail Modal */}
      {selectedJob && (
        <Modal isOpen={open} toggle={closeModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedJob.jobName}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Company : </strong> {selectedJob.companyName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location : </strong> {selectedJob.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Salary : </strong> ${Number(selectedJob.salaryDetails).toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description : </strong> {selectedJob.jobDescription}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Expire Date : </strong>{' '}
              {new Date(selectedJob.expireDate)
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
            <p className="text-gray-700 mb-4">
              <strong>Apply Method : </strong> {selectedJob.jobApplyMethod}
            </p>
            {/*{selectedJob.poster && (
                <img src={`/src/img/${selectedJob.poster}`} alt={`${selectedJob.jobName} Poster`} className="w-full h-48 object-cover mb-4" />
              )}*/}
            <div className="flex justify-between">
              <a href={`mailto:${selectedJob.email}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Apply
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobUsers;
