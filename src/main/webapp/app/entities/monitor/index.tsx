import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import { Route } from 'react-router-dom';
import React from 'react';
import Monitor from 'app/entities/monitor/monitor';

const MonitorRoute = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Monitor />} />
  </ErrorBoundaryRoutes>
);

export default MonitorRoute;
