import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPaginationState } from 'react-jhipster';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './volunteer-op.reducer';

export const VolunteerOPUsers = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const volunteerOPList = useAppSelector(state => state.volunteerOP.entities);
  const loading = useAppSelector(state => state.volunteerOP.loading);
  const totalItems = useAppSelector(state => state.volunteerOP.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  const handleBackHome = () => {
    navigate('/'); // Navigate back to home page
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-white">
      <div className="container mx-auto pt-4">
        <h2 className="text-center text-3xl font-bold my-4 pb-6 text-yellow-500">Available Volunteer Opportunities</h2>

        {volunteerOPList && volunteerOPList.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerOPList.map((volunteerOP, i) => (
              <div
                key={volunteerOP.id}
                className="bg-white rounded-lg drop-shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 text-capitalize">{volunteerOP.volunteerName}</h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {new Date(volunteerOP.dateAndTime)
                    .toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                    .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Location:</span> {volunteerOP.location}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Duration:</span> {volunteerOP.timeDuration} hours
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Description:</span> {volunteerOP.description}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Members:</span> {volunteerOP.member <= 9 ? '0' + volunteerOP.member : volunteerOP.member}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Coordinator:</span> {volunteerOP.volunteerOpCoordinator}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center col-span-full text-gray-500">No volunteer opportunities available at the moment.</p>
        )}
      </div>
      <div className="flex justify-center mt-10 mb-20">
        <Link to="/" className="bg-gray-500 text-white p-3 rounded-lg font-bold hover:bg-gray-600 transition-colors">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default VolunteerOPUsers;
