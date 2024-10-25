import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/donation/donation.reducer';

// Define the Donation interface
interface Donation {
  id: number;
  donationName: string;
  contactDetails: string;
  billingAddress: string;
  amount: number;
  description: string;
  donationType: string;
}

// Define the DonationList component
const DonationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const donationList = useAppSelector(state => state.donation.entities);
  const loading = useAppSelector(state => state.donation.loading);
  const totalItems = useAppSelector(state => state.donation.totalItems);

  useEffect(() => {
    getAllEntities();
  }, []);
  const getAllEntities = () => {
    dispatch(getEntities({}));
  };

  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  //const donationList = useAppSelector((state) => state.donation.entities);
  const handleDonationSelect = (donation: Donation) => {
    setSelectedDonation(donation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDonation(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Centered Heading */}
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alumni Donations</h1>
      </div>

      {donationList.length === 0 ? (
        <div className="flex justify-center items-center text-center">
          <div
            className="flex items-center justify-center p-4 mb-4 text-md text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Donation alert!</span> Sorry, no data found.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {donationList.map((donation, i) => (
            <div key={donation.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <h2 className="text-lg font-bold text-gray-900 px-1 pb-2">{donation.donationName}</h2>
                <table className="text-gray-500">
                  <tr>
                    <td className="w-2/5 px-1">
                      <strong>Contact</strong>
                    </td>
                    <td> :</td>
                    <td className="px-1">{donation.contactDetails}</td>
                  </tr>
                  <tr>
                    <td className="w-2/5 px-1">
                      <strong>Billing Address</strong>
                    </td>
                    <td> :</td>
                    <td className="px-1">{donation.billingAddress}</td>
                  </tr>
                  <tr>
                    <td className="w-2/5 px-1">
                      <strong>Amount</strong>
                    </td>
                    <td> :</td>
                    <td className="px-1">${donation.amount}</td>
                  </tr>
                  <tr>
                    <td className="w-2/5 px-1">
                      <strong>Donation Type</strong>
                    </td>
                    <td> :</td>
                    <td className="px-1">{donation.donationType}</td>
                  </tr>
                  <tr>
                    <td className="w-2/5 px-1">
                      <strong>Description</strong>
                    </td>
                    <td> :</td>
                    <td className="px-1">{donation.description}</td>
                  </tr>
                </table>

                <div className="mt-4 flex space-x-4 px-1">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDonationSelect(donation)}
                  >
                    View Details
                  </button>

                  <button
                    className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    /*onClick={() => {
                      handleDonationSelect(donation);
                      window.open('./payhere.html'); // Opens in a new tab
                    }}*/
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal} className="px-6">
          <strong>{selectedDonation?.donationName} Details</strong>
        </ModalHeader>
        <ModalBody>
          {selectedDonation && (
            <div className="mb-4">
              <table>
                <tr>
                  <td className="w-2/5 px-2">
                    <strong>Contact</strong>
                  </td>
                  <td> :</td>
                  <td className="px-2">{selectedDonation.contactDetails}</td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2">
                    <strong>Billing Address</strong>
                  </td>
                  <td> :</td>
                  <td className="px-2">{selectedDonation.billingAddress}</td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2">
                    <strong>Amount</strong>
                  </td>
                  <td> :</td>
                  <td className="px-2">${selectedDonation.amount}</td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2">
                    <strong>Description</strong>
                  </td>
                  <td> :</td>
                  <td className="px-2">{selectedDonation.description}</td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2">
                    <strong>Donation Type</strong>
                  </td>
                  <td> :</td>
                  <td className="px-2">{selectedDonation.donationType}</td>
                </tr>
              </table>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

// Define the Donationuser component
const Donationuser: React.FC = () => {
  const handleBackToHome = () => {
    // Logic to redirect to the home page
    window.location.href = '/'; // Example: Replace with your actual home page path
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with centered title */}

      {/* Main container for the form */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <DonationList />

        <div className="flex justify-center mt-8">
          <button
            className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={handleBackToHome} // Redirect to home page
          >
            Back to Home Page
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 bg-opacity-100 p-4 text-center text-white mt-8">
        <p>&copy; 2024 Alumni Management with Event Management.</p>
      </footer>
    </div>
  );
};

export default Donationuser;
