import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import { getEntities as getEventEntities } from 'app/entities/event/event.reducer';
import { getEntities as getDonationEntities } from 'app/entities/donation/donation.reducer';
import { getEntities as getJobEntities } from 'app/entities/job/job.reducer';
import { getEntities as getNewsEntities } from 'app/entities/news/news.reducer';
import { getEntities as getVoEntities } from 'app/entities/volunteer-op/volunteer-op.reducer';
//import { getUsersAsAdmin } from 'app/modules/administration/user-management/user-management.reducer';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const ReportPage = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [bgImg, setbgImg] = useState('./content/images/alu6.jpg');
  const [reportType, setReportType] = useState('');
  const [date, setDate] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);

  const handleSelect = e => {
    e.preventDefault();
    setShowReport(true);
    fetchReportData(reportType, date);
  };

  const eventEntities = useAppSelector(state => state.event.entities);
  const donationEntities = useAppSelector(state => state.donation.entities);
  const jobEntities = useAppSelector(state => state.job.entities);
  const newsEntities = useAppSelector(state => state.news.entities);
  const voEntities = useAppSelector(state => state.volunteerOP.entities);
  /*const userEntities = useAppSelector(state => state.user.entities || []);*/

  useEffect(() => {
    dispatch(getEventEntities({}));
  }, [dispatch]);

  // Fetch donation entities
  useEffect(() => {
    dispatch(getDonationEntities({}));
  }, [dispatch]);

  // Fetch job entities
  useEffect(() => {
    dispatch(getJobEntities({}));
  }, [dispatch]);

  // Fetch news entities
  useEffect(() => {
    dispatch(getNewsEntities({}));
  }, [dispatch]);

  // Fetch vo entities
  useEffect(() => {
    dispatch(getVoEntities({}));
  }, [dispatch]);

 /* // Fetch user entities
  useEffect(() => {
    dispatch(getUsersAsAdmin({}));
  }, [dispatch]);*/

  const fetchReportData = (type, selectedDate) => {
    if (type === 'event') {
      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Ensure selectedDate is also in 'YYYY-MM-DD' format
      const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

      // Filter data between the current date and the selected date
      const filteredData = eventEntities.filter(item => {
        const eventDate = new Date(item.dateAndTime).toISOString().split('T')[0];

        // Check if the eventDate falls within the specified range
        return (
          (formattedSelectedDate > currentDate) ? (eventDate >= currentDate && eventDate <= formattedSelectedDate) : (eventDate <= currentDate && eventDate >= formattedSelectedDate)
        );
      });

      // Set the filtered report data
      setReportData(filteredData);
    }else
    if (type === 'donation') {
      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Ensure selectedDate is also in 'YYYY-MM-DD' format
      const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

      // Filter data between the current date and the selected date
      const filteredData = donationEntities.filter(item => {
        const donDate = new Date(item.dateAndTime).toISOString().split('T')[0];

        // Check if the eventDate falls within the specified range
        return (
          (formattedSelectedDate > currentDate) ? (donDate >= currentDate && donDate <= formattedSelectedDate) : (donDate <= currentDate && donDate >= formattedSelectedDate)
        );
      });

      // Set the filtered report data
      setReportData(filteredData);
    }else
    if (type === 'job') {
      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Ensure selectedDate is also in 'YYYY-MM-DD' format
      const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

      // Filter data between the current date and the selected date
      const filteredData = jobEntities.filter(item => {
        const jobDate = new Date(item.expireDate).toISOString().split('T')[0];

        // Check if the eventDate falls within the specified range
        return (
          (formattedSelectedDate > currentDate) ? (jobDate >= currentDate && jobDate <= formattedSelectedDate) : (jobDate <= currentDate && jobDate >= formattedSelectedDate)
        );
      });

      // Set the filtered report data
      setReportData(filteredData);
    }else
    if (type === 'news') {
      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Ensure selectedDate is also in 'YYYY-MM-DD' format
      const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

      // Filter data between the current date and the selected date
      const filteredData = newsEntities.filter(item => {
        const pubDate = new Date(item.publishDate).toISOString().split('T')[0];

        // Check if the eventDate falls within the specified range
        return (
          (formattedSelectedDate > currentDate) ? (pubDate >= currentDate && pubDate <= formattedSelectedDate) : (pubDate <= currentDate && pubDate >= formattedSelectedDate)
        );
      });

      // Set the filtered report data
      setReportData(filteredData);
    }else
    if (type === 'vo') {
      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Ensure selectedDate is also in 'YYYY-MM-DD' format
      const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

      // Filter data between the current date and the selected date
      const filteredData = voEntities.filter(item => {
        const voDate = new Date(item.dateAndTime).toISOString().split('T')[0];

        // Check if the eventDate falls within the specified range
        return (
          (formattedSelectedDate > currentDate) ? (voDate >= currentDate && voDate <= formattedSelectedDate) : (voDate <= currentDate && voDate >= formattedSelectedDate)
        );
      });

      // Set the filtered report data
      setReportData(filteredData);
    }/*else
    if (type === 'user') {
      const filteredData = userEntities.filter(item => {
        return item.activated == 1;
      });
      setReportData(filteredData);
    }*/
  };

  const exportToPDF = () => {
    const input = document.getElementById('exportReport');

    // Store original font sizes
    const originalTableFontSize = window.getComputedStyle(input.querySelector('table')).fontSize;
    const originalH3FontSize = window.getComputedStyle(input.querySelector('h3')).fontSize;

    // Set new font sizes for export
    input.querySelector('h3').style.fontSize = '30px'; // Set h3 font size to 30px
    input.querySelector('table').style.fontSize = '16px'; // Set table font size to 16px

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 20; // Start position with top padding
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 40; // Reduce height left for top and bottom padding

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 20; // Adjust for bottom padding
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${reportType}_report.pdf`);

      // Reset the original font sizes after export
      input.querySelector('h3').style.fontSize = originalH3FontSize;
      input.querySelector('table').style.fontSize = originalTableFontSize;
    });
  };

  // New function to export data as CSV
  /*const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Date and Time', 'Event Name', 'Location', 'Event Type', 'Description', 'Target Audience', 'Event Coordinator'];
    csvRows.push(headers.join(',')); // Add headers

    // Add data rows
    reportData.forEach(item => {
      const row = [
        new Date(item.dateAndTime).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2'),
        item.eventName,
        item.location,
        item.eventType,
        item.description,
        item.targetAudience,
        item.eventCoordinator,
      ];
      csvRows.push(row.join(','));
    });

    // Create a Blob from the CSV data
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the CSV file
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}_report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };*/

  return (
    <div>
      <div className="bg-cover bg-center h-screen flex flex-col" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="flex-grow bg-white bg-opacity-75 p-6">
          <div className="container mx-auto p-4 mt-4">
            <h2 className="text-center text-3xl font-bold mb-4">{!showReport ? 'Report Category' : ''}</h2>

            {!showReport ? (
            <div className="container max-w-lg">
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
                      required={true}
                    >
                      <option value="">Select Report Type</option>
                      {/*<option value="user">User Details</option>*/}
                      <option value="event">Event Details</option>
                      <option value="donation">Donation Details</option>
                      <option value="job">Job Details</option>
                      <option value="news">Alumni News Details</option>
                      <option value="vo">Volunteer Opportunities</option>
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
                      required={true}
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
            </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 mx-auto" style={{width: '100%'}}>
                <div id="exportReport">
                  <h3 className="text-2xl font-semibold mb-4 text-capitalize">{reportType} Report Results</h3>
                  <p className="mb-2">Report Type: <strong className="text-capitalize px-3">{reportType}</strong></p>
                  <p className="mb-4">From Current Date: <strong
                    className="px-3">{new Date().toISOString().split('T')[0]}</strong> To Selected Date: <strong
                    className="px-3">{date}</strong></p>
                  <table className="min-w-full divide-y divide-gray-200 text-xl">
                    <thead className="bg-gray-50">
                    {(reportType === 'event') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Date and Time
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Event Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Event Type
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Target Audience
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Event Coordinator
                        </th>
                      </tr>
                    ) : (reportType === 'donation') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Date and Time
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Donation Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Contact Details
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Billing Address
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Amount($)
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Donation Type
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    ) : (reportType === 'job') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Expire Date
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Job Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Company Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Salary Details($)
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Job Description
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Job Apply Method
                        </th>
                      </tr>
                    ) : (reportType === 'news') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Publish Date
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Author Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Cover Area
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Group
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Expire Date
                        </th>
                      </tr>
                    ): (reportType === 'vo') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Volunteer Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Time Duration(h)
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Member(s)
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Volunteer Coordinator
                        </th>
                      </tr>
                    ) : (reportType === 'user') ? (
                      <tr>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          First Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Last Name
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col"
                            className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    ) : null}
                    </thead>
                    <tbody>
                    {reportType === 'event' ? (
                      reportData.length === 0 ? (
                        <tr>
                        <td colSpan={7} className="text-center"> No event data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.dateAndTime)
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
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.eventName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.location}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.eventType}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.targetAudience}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.eventCoordinator}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (reportType === 'donation') ? (
                      reportData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center"> No donation data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.dateAndTime)
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
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.donationName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.contactDetails}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.billingAddress}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.email}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.amount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.donationType}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (reportType === 'job') ? (
                      reportData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center"> No job data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.expireDate)
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
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.jobName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.companyName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.location}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.email}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {Number(item.salaryDetails).toFixed(2)}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.jobDescription}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.jobApplyMethod}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (reportType === 'news') ? (
                      reportData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center"> No news data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.publishDate)
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
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.title}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.authorName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.coverArea}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.group}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.expireDate)
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
                          </tr>
                        ))
                      )
                    ) : (reportType === 'vo') ? (
                      reportData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center"> No volunteer oppertunity data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(item.dateAndTime)
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
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.volunteerName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.location}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.timeDuration}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.member}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.volunteerOpCoordinator}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (reportType === 'user') ? (
                      reportData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center"> No user data found</td>
                        </tr>
                      ) : (
                        reportData.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.firstName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.lastName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.email}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.activated == 1 ? 'Active' : 'Inactive'}
                            </td>
                          </tr>
                        ))
                      )
                    ) : null}
                    </tbody>
                  </table>
                </div>


                <div className="flex justify-between mt-4">
                  <button
                    className="bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 px-2"
                    onClick={() => setShowReport(false)}
                  >
                    Back to Report Selection
                  </button>

                  <div className="flex space-x-2">
                    {/*<button
                      className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 px-2"
                      onClick={exportToCSV}
                    >
                      Export to CSV
                    </button>*/}

                    <button
                      className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-600 px-2"
                      onClick={exportToPDF}
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>


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
