import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import { Route } from 'react-router-dom';
import React from 'react';
import ReportPage from 'app/entities/report/report';

const ReportRoute = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportPage />} />
  </ErrorBoundaryRoutes>
);

export default ReportRoute;
