import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './event.reducer';

export const UserEvent = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const [bgImg, setbgImg] = useState('./content/images/alu3.jpg');
  const eventList = useAppSelector(state => state.event.entities);
  const loading = useAppSelector(state => state.event.loading);
  const totalItems = useAppSelector(state => state.event.totalItems);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const account = useAppSelector(state => state.authentication.account);

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

  const openDeleteModal = eventId => {
    setSelectedEventId(eventId);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container pt-2">
        <div className="d-flex justify-content-end pt-4">
          <Link to="/event/new" className="btn btn-success jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Event
          </Link>
        </div>

        <h1 className="text-center text-3xl font-bold mb-5 mt-2 text-amber-300">List of Event</h1>
        <div className="table-responsive">
          {eventList && eventList.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-purple-100 text-black">
              <tr>
                <th className="px-2 py-3 text-center cursor-pointer" onClick={sort('id')}>
                  # <FontAwesomeIcon icon={getSortIconByFieldName('id')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventName')}>
                  Event Name <FontAwesomeIcon icon={getSortIconByFieldName('eventName')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('dateAndTime')}>
                  Date And Time <FontAwesomeIcon icon={getSortIconByFieldName('dateAndTime')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('location')}>
                  Location <FontAwesomeIcon icon={getSortIconByFieldName('location')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventType')}>
                  Event Type <FontAwesomeIcon icon={getSortIconByFieldName('eventType')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('targetAudience')}>
                  Target Audience <FontAwesomeIcon icon={getSortIconByFieldName('targetAudience')}/>
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('eventCoordinator')}>
                  Event Coordinator <FontAwesomeIcon icon={getSortIconByFieldName('eventCoordinator')}/>
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon={getSortIconByFieldName('status')}/>
                </th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              {eventList.map((event, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable" className="even:bg-gray-100">
                    <td className="px-2 py-3 text-center">
                      <Button tag={Link} to={`/event/${event.id}`} color="link" size="sm">
                        {event.id}
                      </Button>
                    </td>
                    <td className="px-2 py-3">{event.eventName}</td>
                    <td className="px-2 py-3">
                      {new Date(event.dateAndTime)
                        .toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
                    </td>
                    <td className="px-2 py-3">{event.location}</td>
                    <td className="px-2 py-3">{event.eventType}</td>
                    <td className="px-2 py-3">{event.description}</td>
                    <td className="px-2 py-3">{event.targetAudience}</td>
                    <td className="px-2 py-3">{event.eventCoordinator}</td>
                    <td className="px-2 py-3">{event.status == '1' ? <label className="bg-success text-white p-1 w-full text-center">Approved</label> : <label className="bg-danger text-white p-1 w-full text-center">Rejected</label>}</td>
                  <td className="py-2 px-3 text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/event/${event.id}`}
                          color="info"
                          size="sm"
                          data-cy="entityDetailsButton"
                          className="text-white"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>

                        <Button
                          tag={Link}
                          to={`/event/${event.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          onClick={() =>
                            (window.location.href = `/event/${event.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                          }
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && <div className="alert alert-warning">No Events found</div>
          )}
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
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-gray-500 text-white p-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
          onClick={() => navigate('/')} // Redirect to home page
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default UserEvent;
