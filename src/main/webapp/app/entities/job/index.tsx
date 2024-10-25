import React, { useState } from 'react';
import { Route, useParams, useNavigate } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Job from './job';
import JobDetail from './job-detail';
import JobUpdate from './job-update';
import JobDeleteDialog from './job-delete-dialog';
import JobUsers from 'app/entities/job/job-users';
import { useAppSelector } from 'app/config/store';
import Donation from 'app/entities/donation/donation';
import Donationuser from 'app/entities/donation/donation-user';

const JobDeleteDialogWrapper = () => {
  const { id } = useParams(); // id is a string
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    navigate(-1); // Redirect back after closing
  };

  // Convert id to a number
  const jobId = Number(id);

  return <JobDeleteDialog isOpen={isOpen} jobId={jobId} onClose={handleClose} />;
};

const JobRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route
      index
      element={useAppSelector(state => state.authentication.account).authorities.includes('ROLE_ADMIN') ? <Job /> : <JobUsers />}
    />
    <Route path="users" element={<JobUsers />} />
    <Route path="new" element={<JobUpdate />} />
    <Route path=":id">
      <Route index element={<JobDetail />} />
      <Route path="edit" element={<JobUpdate />} />
      <Route path="delete" element={<JobDeleteDialogWrapper />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default JobRoutes;
