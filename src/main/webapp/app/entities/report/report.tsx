import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';

export const ReportPage = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [bgImg, setbgImg] = useState('./content/images/alu6.jpg');
  return (
    <div>
      <div className="bg-cover bg-center h-screen flex flex-col" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="flex-grow bg-white bg-opacity-75 p-6">
          {/* Main container for the form */}
          <div className="container max-w-lg mx-auto p-4 mt-4">
            <h2 className="text-center text-3xl font-bold mb-4">Report Category</h2>

            {/* Form container with a background color and shadow */}
            <div className="bg-amber-100 shadow-md rounded-lg p-6">
              <form>
                {/* Report Type combo box */}
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="reportType">
                    Report Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="reportType"
                  >
                    <option value="">Select Report Type</option>
                    <option value="">User Details</option>
                    <option value="Event">Event Details</option>
                    <option value="Donation">Donation Details</option>
                    <option value="Job">Job Details</option>
                    <option value="News">Alumni News Details</option>
                    <option value="VolunteerOP">Volunteer Opportunities</option>

                    {/* Add more report types as needed */}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dateTime">
                    Date & Time
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="dateTime"
                    type="datetime-local"
                  />
                </div>

                {/* Select button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 mb-2"
                >
                  Select
                </button>

                {/* Cancel button */}
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>

          {/* Back to Home Page Button */}
          <div className="flex justify-center mb-4">
            <button
              className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => navigate('/')} // Navigate to Home Page
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
