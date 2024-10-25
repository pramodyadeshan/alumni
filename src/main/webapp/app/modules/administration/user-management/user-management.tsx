import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = user => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      }),
    );
  };

  const account = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative py-4">
      <div className="container pt-2">
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Create a new user
          </Link>
        </div>
        <h1 className="text-center text-3xl font-bold mb-3 mt-4 text-fuchsia-500">List of Users</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-[14px]">
          <thead className="bg-purple-100 text-black">
            <tr>
              <th className="px-2 py-3 text-center" onClick={sort('id')}>
                ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('login')}>
                Login <FontAwesomeIcon icon={getSortIconByFieldName('login')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('email')}>
                Email <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
              </th>
              <th className="py-2 px-3 cursor-pointer">Status</th>
              <th className="py-2 px-3 cursor-pointer">Profiles</th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('createdDate')}>
                Created date <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('lastModifiedBy')}>
                Modified by <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedBy')} />
              </th>
              <th className="py-2 px-3 cursor-pointer" onClick={sort('lastModifiedDate')}>
                Modified date <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
              </th>
              <th className="py-2 px-3 text-center space-x-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr id={user.login} key={`user-${i}`} className="even:bg-gray-100">
                <td className="px-2 py-3 text-center">
                  <Button tag={Link} to={user.login} color="link" size="sm">
                    {user.id}
                  </Button>
                </td>
                <td className="px-2 py-3">{user.login}</td>
                <td className="px-2 py-3">{user.email}</td>
                <td className="px-2 py-3">
                  {user.activated ? (
                    <Button color="success" onClick={toggleActive(user)} className="text-white py-1 px-1 rounded ml-2">
                      Activated
                    </Button>
                  ) : (
                    <Button color="danger" onClick={toggleActive(user)} className="text-white py-1 px-1 rounded ml-2">
                      Deactivated
                    </Button>
                  )}
                </td>
                <td className="px-2 py-3">
                  {user.authorities
                    ? user.authorities.map((authority, j) => (
                        <div key={`user-auth-${i}-${j}`}>
                          <Badge color="info">{authority}</Badge>
                        </div>
                      ))
                    : null}
                </td>
                <td className="px-2 py-3">
                  {user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
                </td>
                <td className="px-2 py-3">{user.lastModifiedBy}</td>
                <td className="px-2 py-3">
                  {user.lastModifiedDate ? (
                    <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                  ) : null}
                </td>
                <td className="py-2 px-3 text-center text-end">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={user.login} color="info" size="sm" className="py-2 px-2 mr-2 rounded text-white">
                      <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                    </Button>
                    <Button tag={Link} to={`${user.login}/edit`} color="primary" size="sm" className="py-2 px-2 mr-2 rounded ml-2">
                      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${user.login}/delete`}
                      color="danger"
                      size="sm"
                      className="py-2 px-2 rounded ml-2"
                      disabled={account.login === user.login}
                    >
                      <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalItems ? (
          <div className={users?.length > 0 ? '' : 'd-none'}>
            <div className="justify-content-center d-flex mt-4">
              <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} />
            </div>
            <div className="justify-content-center d-flex">
              <JhiPagination
                activePage={pagination.activePage}
                onSelect={handlePagination}
                maxButtons={5}
                itemsPerPage={pagination.itemsPerPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default UserManagement;
