import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import News from './news';
import NewsDetail from './news-detail';
import NewsUpdate from './news-update';
import NewsDeleteDialog from './news-delete-dialog';
import { useAppSelector } from 'app/config/store';
import Donation from 'app/entities/donation/donation';
import Donationuser from 'app/entities/donation/donation-user';
import UserNews from 'app/entities/news/user-news';

const NewsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route
      index
      element={useAppSelector(state => state.authentication.account).authorities.includes('ROLE_ADMIN') ? <NewsUpdate /> : <UserNews />}
    />
    <Route path="new" element={<NewsUpdate />} />
    <Route path=":id">
      <Route index element={<NewsDetail />} />
      <Route path="edit" element={<NewsUpdate />} />
      <Route path="delete" element={<NewsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default NewsRoutes;
