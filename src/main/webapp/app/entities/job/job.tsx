import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './job.reducer';

export const Job = () => {
  const dispatch = useAppDispatch();

  const [bgImg, setbgImg] = useState('./content/images/alu8.png');
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const jobList = useAppSelector(state => state.job.entities);
  const loading = useAppSelector(state => state.job.loading);
  const totalItems = useAppSelector(state => state.job.totalItems);

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
    <div className="min-h-screen bg-cover bg-center relative pb-16" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container pt-2">
        <div className="container-fluid mx-auto mt-4">
          <div id="donation-heading" data-cy="DonationHeading">
            <div className="container d-flex justify-content-end">
              <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
                <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
              </Button>
              <Link to="/job/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Create a new Job
              </Link>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold mb-3 mt-4 text-fuchsia-500">List of Jobs</h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-[14px]">
            <thead className="bg-purple-100 text-black">
              <tr>
                <th className="px-2 py-3 text-center">#</th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('jobName')}>
                  Job Name <FontAwesomeIcon icon={getSortIconByFieldName('jobName')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('companyName')}>
                  Company Name <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('location')}>
                  Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
                </th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('salaryDetails')}>
                  Salary Details <FontAwesomeIcon icon={getSortIconByFieldName('salaryDetails')} />
                </th>
                <th className="py-2 px-3">Job Description</th>
                <th className="py-2 px-3 cursor-pointer" onClick={sort('expireDate')}>
                  Expire Date <FontAwesomeIcon icon={getSortIconByFieldName('expireDate')} />
                </th>
                <th className="py-2 px-3">Job Apply Method</th>
                <th className="py-2 px-3 text-center space-x-2 w-60">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobList.map((job, i) => (
                <tr key={job.id} className="even:bg-gray-100">
                  <td className="px-2 py-3 text-center">
                    <Button tag={Link} to={`/job/${job.id}`} color="link" size="sm">
                      {job.id}
                    </Button>
                  </td>
                  <td className="px-2 py-3">{job.jobName}</td>
                  <td className="py-2 px-3">{job.companyName}</td>
                  <td className="py-2 px-3">{job.location}</td>
                  <td className="py-2 px-3">{job.salaryDetails}</td>
                  <td className="py-2 px-3">{job.jobDescription}</td>
                  <td className="py-2 px-3">
                    {new Date(job.expireDate)
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
                  <td className="py-2 px-3">{job.jobApplyMethod}</td>
                  <td className="py-2 px-3 text-center space-x-2">
                    <Link
                      to={`/job/${job.id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 ml-2 text-sm sm:text-base sm:py-2 sm:px-4"
                    >
                      View
                    </Link>

                    <Link
                      to={`/job/${job.id}/edit`}
                      className="border border-blue-500 text-blue-500 py-1 px-2 rounded hover:bg-blue-500 hover:text-white text-sm sm:text-base sm:py-2 sm:px-4"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/job/${job.id}/delete`}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-4 mt-2 text-sm sm:text-base sm:py-2 sm:px-4"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalItems ? (
            <div className={jobList && jobList.length > 0 ? '' : 'd-none'}>
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

        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => navigate('/')} // Navigate to Home Page
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>

    // <div>
    //   <h2 id="job-heading" data-cy="JobHeading">
    //     Jobs
    //     <div className="d-flex justify-content-end">
    //       <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
    //         <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
    //       </Button>
    //       <Link to="/job/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
    //         <FontAwesomeIcon icon="plus" />
    //         &nbsp; Create a new Job
    //       </Link>
    //     </div>
    //   </h2>
    //   <div className="table-responsive">
    //     {jobList && jobList.length > 0 ? (
    //       <Table responsive>
    //         <thead>
    //           <tr>
    //             <th className="hand" onClick={sort('id')}>
    //               ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
    //             </th>
    //             <th className="hand" onClick={sort('jobName')}>
    //               Job Name <FontAwesomeIcon icon={getSortIconByFieldName('jobName')} />
    //             </th>
    //             <th className="hand" onClick={sort('companyName')}>
    //               Company Name <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
    //             </th>
    //             <th className="hand" onClick={sort('location')}>
    //               Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
    //             </th>
    //             <th className="hand" onClick={sort('salaryDetails')}>
    //               Salary Details <FontAwesomeIcon icon={getSortIconByFieldName('salaryDetails')} />
    //             </th>
    //             <th className="hand" onClick={sort('jobDescription')}>
    //               Job Description <FontAwesomeIcon icon={getSortIconByFieldName('jobDescription')} />
    //             </th>
    //             <th className="hand" onClick={sort('expireDate')}>
    //               Expire Date <FontAwesomeIcon icon={getSortIconByFieldName('expireDate')} />
    //             </th>
    //             <th className="hand" onClick={sort('jobApplyMethod')}>
    //               Job Apply Method <FontAwesomeIcon icon={getSortIconByFieldName('jobApplyMethod')} />
    //             </th>
    //             <th />
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {jobList.map((job, i) => (
    //             <tr key={`entity-${i}`} data-cy="entityTable">
    //               <td>
    //                 <Button tag={Link} to={`/job/${job.id}`} color="link" size="sm">
    //                   {job.id}
    //                 </Button>
    //               </td>
    //               <td>{job.jobName}</td>
    //               <td>{job.companyName}</td>
    //               <td>{job.location}</td>
    //               <td>{job.salaryDetails}</td>
    //               <td>{job.jobDescription}</td>
    //               <td>{job.expireDate}</td>
    //               <td>{job.jobApplyMethod}</td>
    //               <td className="text-end">
    //                 <div className="btn-group flex-btn-group-container">
    //                   <Button tag={Link} to={`/job/${job.id}`} color="info" size="sm" data-cy="entityDetailsButton">
    //                     <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
    //                   </Button>
    //                   <Button
    //                     tag={Link}
    //                     to={`/job/${job.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
    //                     color="primary"
    //                     size="sm"
    //                     data-cy="entityEditButton"
    //                   >
    //                     <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
    //                   </Button>
    //                   <Button
    //                     onClick={() =>
    //                       (window.location.href = `/job/${job.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
    //                     }
    //                     color="danger"
    //                     size="sm"
    //                     data-cy="entityDeleteButton"
    //                   >
    //                     <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
    //                   </Button>
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     ) : (
    //       !loading && <div className="alert alert-warning">No Jobs found</div>
    //     )}
    //   </div>
    //
    // </div>
  );
};

export default Job;
