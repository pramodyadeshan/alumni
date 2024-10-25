import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Modal } from 'reactstrap';
import { getEntities } from 'app/entities/donation/donation.reducer';

interface Donation {
  id: number;
  donationName: string;
  contactDetails: string;
  billingAddress: string;
  amount: number;
  description: string;
  donationType: string;
  email: string;
}
const UpcomingDonationPage: React.FC = () => {
  const donationList = useAppSelector(state => state.donation.entities);
  const dispatch = useAppDispatch();
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleNEWSCardClick = (donation: Donation) => {
    setOpen(true);
    setSelectedDonation(donation);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedDonation(null);
  };

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, [dispatch]);

  return (
    <div>
      {/* Centered Heading */}
      <div className="flex flex-wrap -mx-4">
        {donationList.map((donation: Donation) => (
          <div key={donation.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
              <span className="float-end bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                Donation
              </span>
              <h2 className="text-2xl font-bold text-gray-900 pb-3 text-capitalize">{donation.donationName}</h2>
              <p className="text-gray-600">{donation.contactDetails}</p>
              <p className="text-gray-600">
                <strong>Billing Address : </strong> {donation.billingAddress}
              </p>

              <p className="text-gray-600">
                <strong>Amount : </strong> {donation.amount}
              </p>

              <p className="text-gray-600">
                <strong>Donation Type : </strong> {donation.donationType}
              </p>

              <p className="text-gray-600">
                <strong>Description : </strong> {donation.description}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleNEWSCardClick(donation)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDonation && (
        <Modal isOpen={open} toggle={closeModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-capitalize">{selectedDonation.donationName} Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Contact Details : </strong> {selectedDonation.contactDetails}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Billing Address : </strong> {selectedDonation.billingAddress}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Amount : </strong> {selectedDonation.amount}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Donation Type : </strong> {selectedDonation.donationType}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description : </strong> {selectedDonation.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingDonationPage;
