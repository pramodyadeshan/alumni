import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { createEntity, getEntities, partialUpdateEntity, updateEntity } from './event.reducer';
import { updateUser } from 'app/modules/administration/user-management/user-management.reducer';

export const Event = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const [bgImg, setbgImg] = useState('./content/images/alu5.jpg');

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const eventList = useAppSelector(state => state.event.entities);
  const loading = useAppSelector(state => state.event.loading);
  const totalItems = useAppSelector(state => state.event.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
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

  const toggleActive = event => () => {
    dispatch(
      updateEntity({
        ...event,
        status: !event.status,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container pt-2">
        <h1 className="text-center text-3xl font-bold mb-5 mt-6 text-red-600">List of Event</h1>
        <div className="table-responsive">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-100 text-black">
              <tr>
                <th className="px-2 py-3 text-center" onClick={sort('id')}>
                  # <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventName')}>
                  Event Name <FontAwesomeIcon icon={getSortIconByFieldName('eventName')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('dateAndTime')}>
                  Date And Time <FontAwesomeIcon icon={getSortIconByFieldName('dateAndTime')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('location')}>
                  Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventType')}>
                  Event Type <FontAwesomeIcon icon={getSortIconByFieldName('eventType')} />
                </th>
                <th className="py-2 px-3" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('targetAudience')}>
                  Target Audience <FontAwesomeIcon icon={getSortIconByFieldName('targetAudience')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventCoordinator')}>
                  Event Coordinator <FontAwesomeIcon icon={getSortIconByFieldName('eventCoordinator')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="py-2 px-3 text-center cursor-pointer">Action</th>
              </tr>
            </thead>
            <tbody>
              {eventList && eventList.length > 0
                ? eventList.map((event, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable" className="even:bg-gray-100">
                      <td className="px-2 py-3 text-center">
                        <Button tag={Link} to={`/event/${event.id}`} color="link" size="sm">
                          {event.id}
                        </Button>
                      </td>
                      <td className="px-2 py-3">{event.eventName}</td>
                      <td className="px-2 py-3">{event.dateAndTime}</td>
                      <td className="px-2 py-3">{event.location}</td>
                      <td className="px-2 py-3">{event.eventType}</td>
                      <td className="px-2 py-3">{event.description}</td>
                      <td className="px-2 py-3">{event.targetAudience}</td>
                      <td className="px-2 py-3">{event.eventCoordinator}</td>
                      <td>{event.status ? 'Approved' : 'Rejected'}</td>
                      <td className="py-2 px-3 text-end">
                        <div className="btn-group flex-btn-group-container">
                          <Button
                            tag={Link}
                            to={`/event/${event.id}`}
                            color="primary"
                            size="sm"
                            data-cy="entityDetailsButton"
                            className="text-white"
                          >
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                          </Button>

                          {event.status ? (
                            <Button
                              color="success"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to reject this event?')) {
                                  toggleActive(event)();
                                }
                              }}
                              className="text-white py-1 px-1 rounded ml-2"
                            >
                              Approve
                            </Button>
                          ) : (
                            <Button
                              color="danger"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to approve this event?')) {
                                  toggleActive(event)();
                                }
                              }}
                              className="text-white py-1 px-1 rounded ml-2"
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td colSpan={10} className="text-center font-semibold py-4">
                        No Events found
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        {totalItems ? (
          <div className={eventList && eventList.length > 0 ? '' : 'd-none'}>
            <div className="justify-content-center d-flex text-white">
              <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
            </div>
            <div className="justify-content-center d-flex">
              <JhiPagination
                activePage={paginationState.activePage}
                onSelect={handlePagination}
                maxButtons={5}
                itemsPerPage={paginationState.itemsPerPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="flex justify-center mt-4 mb-4">
          <button
            className="bg-gray-500 text-white p-3 rounded-lg font-bold hover:bg-gray-600 transition-colors mb-10"
            onClick={() => navigate('/')} // Redirect to home page
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
