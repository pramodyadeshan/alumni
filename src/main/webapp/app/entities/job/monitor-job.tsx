import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Modal } from 'reactstrap';
import { getEntities } from 'app/entities/job/job.reducer';

interface Job {
  id: number;
  jobName: string;
  companyName: string;
  location: string;
  salaryDetails: number;
  jobDescription: string;
  expireDate: string;
  jobApplyMethod: string;
  fileUpload: string;
  email: string;
}
const UpcomingJobPage: React.FC = () => {
  const jobList = useAppSelector(state => state.job.entities);
  const dispatch = useAppDispatch();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const handleJobCardClick = (job: Job) => {
    setOpen(true);
    setSelectedJob(job);
  };

  const closeJobModal = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, [dispatch]);

  return (
    <div>
      {/* Centered Heading */}
      <div className="flex flex-wrap -mx-4">
        {jobList.map(job => (
          <div key={job.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
              <span className="float-end bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                Job
              </span>
              <h2 className="text-2xl font-bold text-gray-900 pb-3 text-capitalize">{job.jobName}</h2>
              <p className="text-gray-600">{job.companyName}</p>
              <p className="text-gray-600">
                <strong>Expire Date : </strong>{' '}
                {new Date(job.expireDate)
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
                onClick={() => handleJobCardClick(job)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <Modal isOpen={open} toggle={closeJobModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-capitalize">{selectedJob.jobName} Details</h2>
              <button onClick={closeJobModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
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
              <strong>Salary : </strong>${Number(selectedJob.salaryDetails).toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description : </strong> {selectedJob.jobDescription}
            </p>
            <p className="text-gray-700 mb-2">
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
            <p className="text-gray-700 mb-2">
              <strong>Apply Method : </strong> {selectedJob.jobApplyMethod}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingJobPage;
