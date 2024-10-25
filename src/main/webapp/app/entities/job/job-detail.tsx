import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from 'app/entities/job/job.reducer';

export const JobDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const jobEntity = useAppSelector(state => state.job.entity);
  const loading = useAppSelector(state => state.job.loading);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="flex justify-center py-8">
        <h1 className="text-3xl font-bold text-gray-900"> Alumni Jobs</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-extrabold text-white mb-4">{jobEntity.jobName}</h2>

            <ul role="list" className="text-white mb-8 space-y-4 text-left text-lg">
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Company Name: &nbsp;</b> {jobEntity.companyName}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Location: &nbsp;</b> {jobEntity.location}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Salary Details: &nbsp;</b>$ {jobEntity.salaryDetails}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Job Description: &nbsp;</b> {jobEntity.jobDescription}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Expire Date: &nbsp;</b>
                {new Date(jobEntity.expireDate)
                  .toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Job Apply Method: &nbsp;</b> {jobEntity.jobApplyMethod}
              </li>
            </ul>

            <div className="mt-6 flex justify-between">
              <Button
                tag={Link}
                to="/job"
                replace
                color="light"
                className="bg-white text-blue-500 hover:bg-gray-200"
                data-cy="entityDetailsBackButton"
              >
                <FontAwesomeIcon icon="arrow-left" className="mr-2" /> Back
              </Button>
              {account.authorities.includes('ROLE_ADMIN') ? (
                <Button
                  tag={Link}
                  to={`/job/${jobEntity.id}/edit`}
                  replace
                  color="light"
                  className="bg-white text-green-500 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon="pencil-alt" className="mr-2" /> Edit
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
