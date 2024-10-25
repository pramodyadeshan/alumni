import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPaginationState, JhiItemCount, JhiPagination } from 'react-jhipster';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './volunteer-op.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const VolunteerOP = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const volunteerOPList = useAppSelector(state => state.volunteerOP.entities);
  const loading = useAppSelector(state => state.volunteerOP.loading);
  const totalItems = useAppSelector(state => state.volunteerOP.totalItems);

  const [bgImg, setbgImg] = useState('./content/images/alu12.jpg');

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: 'id,desc',
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
  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  return (
    <div className="min-h-screen bg-cover bg-center relative pb-16" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container mx-auto pt-2">
        <div className="mt-5 float-end">
          <Link to="/volunteer-op/new" className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-500">
            Create Volunteer Opportunity
          </Link>
        </div>
        <br />
        <h1 className="text-center text-3xl font-bold mb-5 mt-12 text-pink-300">List of Volunteer Opportunities</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-[14px]">
          <thead className="bg-purple-50 text-black">
            <tr>
              <th className="px-2 py-3 text-center">#</th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('volunteerName')}>
                Volunteer Name <FontAwesomeIcon icon={getSortIconByFieldName('volunteerName')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('dateAndTime')}>
                Date & Time <FontAwesomeIcon icon={getSortIconByFieldName('dateAndTime')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('location')}>
                Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('timeDuration')}>
                Duration (hours) <FontAwesomeIcon icon={getSortIconByFieldName('timeDuration')} />
              </th>
              <th className="py-2 px-3">Description</th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('member')}>
                Members <FontAwesomeIcon icon={getSortIconByFieldName('member')} />
              </th>
              <th className="py-2 px-3" onClick={sort('volunteerOpCoordinator')}>
                Coordinator <FontAwesomeIcon icon={getSortIconByFieldName('volunteerOpCoordinator')} />
              </th>
              <th className="py-2 px-3 text-center space-x-2 w-60">Action</th>
            </tr>
          </thead>
          <tbody>
            {volunteerOPList && volunteerOPList.length > 0
              ? volunteerOPList.map((volunteerOP, i) => (
                  <tr key={volunteerOP.id} className="even:bg-gray-100">
                    <td className="px-2 py-3 text-center">{i + 1}</td>
                    <td className="px-2 py-3">{volunteerOP.volunteerName}</td>
                    <td className="px-2 py-3">
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
                    </td>
                    <td className="px-2 py-3">{volunteerOP.location}</td>
                    <td className="px-2 py-3">{volunteerOP.timeDuration}</td>
                    <td className="px-2 py-3">{volunteerOP.description}</td>
                    <td className="px-2 py-3">{volunteerOP.member}</td>
                    <td className="px-2 py-3">{volunteerOP.volunteerOpCoordinator}</td>
                    <td className="py-2 px-3 text-center space-x-4">
                      <Link
                        to={`/volunteer-op/${volunteerOP.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          (window.location.href = `/volunteer-op/${volunteerOP.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td colSpan={9} className="alert alert-warning text-center">
                      {' '}
                      Not found data
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
      {totalItems ? (
        <div className={volunteerOPList && volunteerOPList.length > 0 ? '' : 'd-none'}>
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

      <div className="mt-5 text-center">
        <Link to="/" className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-500">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default VolunteerOP;
