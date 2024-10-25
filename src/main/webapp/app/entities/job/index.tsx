import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Job from './job';
import JobDetail from './job-detail';
import JobUpdate from './job-update';
import JobDeleteDialog from './job-delete-dialog';
import JobUsers from 'app/entities/job/job-users';
import { useAppSelector } from 'app/config/store';

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
      <Route path="delete" element={<JobDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default JobRoutes;
