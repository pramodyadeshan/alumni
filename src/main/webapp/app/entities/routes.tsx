import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportPage from 'app/entities/report/report';
import Monitor from 'app/entities/monitor';
import VolunteerOP from "app/entities/volunteer-op/volunteer-op";
import News from "app/entities/news";
import Job from "app/entities/job";
import Donation from "app/entities/donation";
import Event from "app/entities/event/event";

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="event/*" element={<Event />} />
        <Route path="donation/*" element={<Donation />} />
        <Route path="monitor/*" element={<Monitor />} />
        <Route path="job/*" element={<Job />} />
        <Route path="news/*" element={<News />} />
        <Route path="volunteer-op/*" element={<VolunteerOP />} />
        <Route path="report/*" element={<ReportPage />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
