import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './donation.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export const DonationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const donationEntity = useAppSelector(state => state.donation.entity);
  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="flex justify-center py-8">
        <h1 className="text-3xl font-bold text-gray-900"> Alumni Donations</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-extrabold text-white mb-4">{donationEntity.donationName}</h2>

            <ul role="list" className="text-white mb-8 space-y-4 text-left text-lg">
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Amount: &nbsp;</b> $ {Number(donationEntity.amount).toFixed(2)}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Billing Address: &nbsp;</b> {donationEntity.billingAddress}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Contact: &nbsp;</b> {donationEntity.contactDetails}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Donation Type: &nbsp;</b> {donationEntity.donationType}
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <b>Description: &nbsp;</b> {donationEntity.description}
              </li>
            </ul>

            <div className="mt-6 flex justify-between">
              <Button
                tag={Link}
                to="/donation"
                replace
                color="light"
                className="bg-white text-blue-500 hover:bg-gray-200"
                data-cy="entityDetailsBackButton"
              >
                <FontAwesomeIcon icon="arrow-left" className="mr-2" /> Back
              </Button>
              <Button
                tag={Link}
                to={`/donation/${donationEntity.id}/edit`}
                replace
                color="light"
                className="bg-white text-green-500 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon="pencil-alt" className="mr-2" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
