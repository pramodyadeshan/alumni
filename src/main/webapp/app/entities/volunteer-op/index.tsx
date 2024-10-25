import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import VolunteerOPDeleteDialog from './volunteer-op-delete-dialog';
import { useAppSelector } from 'app/config/store';
import VolunteerOPUsers from 'app/entities/volunteer-op/volunteer-op-users';
import VolunteerOPUpdate from 'app/entities/volunteer-op/volunteer-op-update';
import VolunteerOP from 'app/entities/volunteer-op/volunteer-op';
import VolunteerOPDetail from 'app/entities/volunteer-op/volunteer-op-detail';

const VolunteerOPRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route
      index
      element={
        useAppSelector(state => state.authentication.account).authorities.includes('ROLE_ADMIN') ? <VolunteerOP /> : <VolunteerOPUsers />
      }
    />
    <Route path="new" element={<VolunteerOPUpdate />} />
    <Route path=":id">
      <Route index element={<VolunteerOPDetail />} />
      <Route path="edit" element={<VolunteerOPUpdate />} />
      <Route path="delete" element={<VolunteerOPDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VolunteerOPRoutes;
