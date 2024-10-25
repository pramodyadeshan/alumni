import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Event from './event';
import EventDetail from './event-detail';
import EventUpdate from './event-update';
import EventDeleteDialog from './event-delete-dialog';
import {useAppSelector} from "app/config/store";
import UserEvent from "app/entities/event/user-event";

const EventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route
      index
      element={useAppSelector(state => state.authentication.account).authorities.includes('ROLE_ADMIN') ? <Event /> : <UserEvent />}
    />
    <Route path="new" element={<EventUpdate />} />
    <Route path=":id">
      <Route index element={<EventDetail />} />
      <Route path="edit" element={<EventUpdate />} />
      <Route path="delete" element={<EventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EventRoutes;
