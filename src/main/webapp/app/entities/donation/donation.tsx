import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './donation.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import account from 'app/modules/account';

export const Donation = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const donationList = useAppSelector(state => state.donation.entities);
  const loading = useAppSelector(state => state.donation.loading);
  const totalItems = useAppSelector(state => state.donation.totalItems);
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

  return (
    <div className="pb-6">
      <div className="container mx-auto mt-12 px-5 flex-grow pb-10">
        {account.authorities.includes('ROLE_ADMIN') ? (
          <div id="donation-heading" data-cy="DonationHeading">
            <div className="d-flex justify-content-end">
              <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
                <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
              </Button>
              <Link to="/donation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Create a new Donation
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}

        <h1 className="text-center text-4xl font-bold mb-10 text-indigo-600">
          {account.authorities.includes('ROLE_ADMIN') ? 'Available' : 'Alumni'} Donations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donationList.map((donation, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow ease-in-out duration-200">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{donation.donationName}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Contact:</span> {donation.contactDetails}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Billing Address:</span> {donation.billingAddress}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Amount:</span> LKR {Number(donation.amount).toFixed(2)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Donation Type:</span> {donation.donationType}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Description:</span> {donation.description}
              </p>

              <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
                <Link
                  to={`/donation/${donation.id}/edit`}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 transition ease-in-out duration-200 py-2 px-4 md:py-3 md:px-6 rounded-lg w-full sm:w-auto"
                >
                  Edit
                </Link>
                <div className="flex flex-wrap justify-end gap-2">
                  <Link
                    to={`/donation/${donation.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-200 w-full sm:w-auto"
                  >
                    View
                  </Link>

                  <a
                    href={`mailto:${donation.email}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-200 w-full sm:w-auto"
                  >
                    Email
                  </a>

                  <Link
                    to={`/donation/${donation.id}/delete`}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-200 w-full sm:w-auto"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 md:mb-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 font-bold text-white py-2 px-6 rounded-lg transition duration-200"
            onClick={() => navigate('/')} // Navigate to Home Page
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
