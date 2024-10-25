import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/event/event.reducer';

export const ReportPage = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [bgImg, setbgImg] = useState('./content/images/alu6.jpg');
  const [reportType, setReportType] = useState('');
  const [date, setDate] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);

  // Select data from the Redux store
  const eventEntities = useAppSelector(state => state.event.entities);

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, []);

  const handleSelect = e => {
    e.preventDefault();
    setShowReport(true);
    fetchReportData(reportType, date);
  };

  const fetchReportData = (type, selectedDate) => {
    // Filter or fetch data based on reportType and date
    const filteredData = eventEntities.filter(item => {
      const isTypeMatch = type ? item.type === type : true;
      const isDateMatch = selectedDate ? item.dateAndTime.startsWith(selectedDate) : true;
      return isTypeMatch && isDateMatch;
    });
    setReportData(filteredData);
  };

  return (
    <div>
      <div className="bg-cover bg-center h-screen flex flex-col" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="flex-grow bg-white bg-opacity-75 p-6">
          <div className="container max-w-lg mx-auto p-4 mt-4">
            <h2 className="text-center text-3xl font-bold mb-4">Report Category</h2>

            {!showReport ? (
              <div className="bg-amber-100 shadow-md rounded-lg p-6">
                <form onSubmit={handleSelect}>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="reportType">
                      Report Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      id="reportType"
                      value={reportType}
                      onChange={e => setReportType(e.target.value)}
                    >
                      <option value="">Select Report Type</option>
                      <option value="User">User Details</option>
                      <option value="Event">Event Details</option>
                      <option value="Donation">Donation Details</option>
                      <option value="Job">Job Details</option>
                      <option value="News">Alumni News Details</option>
                      <option value="VolunteerOP">Volunteer Opportunities</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dateTime">
                      Date
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      id="dateTime"
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 mb-2"
                  >
                    Select
                  </button>

                  <button
                    type="button"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => {
                      setReportType('');
                      setDate('');
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Report Results</h3>
                <p className="mb-4">Report Type: {reportType}</p>
                <p className="mb-4">Selected Date: {date}</p>
                <div className="overflow-auto">
                  <ul>
                    {reportData.map(item => (
                      <li key={item.id} className="border-b py-2">
                        {item.eventName} - {item.dateAndTime}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 mt-4"
                  onClick={() => setShowReport(false)}
                >
                  Back to Report Selection
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <button
              className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => navigate('/')}
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
