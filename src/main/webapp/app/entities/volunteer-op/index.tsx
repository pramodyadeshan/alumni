import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import VolunteerOP from './volunteer-op';
import VolunteerOPDetail from './volunteer-op-detail';
import VolunteerOPUpdate from './volunteer-op-update';
import VolunteerOPDeleteDialog from './volunteer-op-delete-dialog';
import { useAppSelector } from 'app/config/store';
import Donation from 'app/entities/donation/donation';
import Donationuser from 'app/entities/donation/donation-user';
import VolunteerOPUsers from 'app/entities/volunteer-op/volunteer-op-users';

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
