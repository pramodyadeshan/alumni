import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/news/news.reducer';

export const UserNews: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNews, setSelectedNews] = useState<any>(null);
  const newsList = useAppSelector(state => state.news.entities);

  useEffect(() => {
    dispatch(getEntities({ sort: 'publishDate,desc' }));
  }, []);

  const handleBackToHome = () => {
    // Redirect to home page
    window.location.href = '/'; // Update with your home page route if needed
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="p-8">
        {/* Conditional rendering based on whether a news item is selected */}
        {selectedNews ? (
          // Detailed view of the selected news item
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-2">{selectedNews.title}</h2>
            <p className="text-sm text-gray-600 mb-1">By: {selectedNews.authorName}</p>
            <p className="text-sm text-gray-600 mb-1">Publish Date: {selectedNews.publishDate}</p>
            <p className="text-sm text-gray-600 mb-1">Group: {selectedNews.group}</p>
            <p className="text-sm text-gray-600 mb-1">Cover Area: {selectedNews.coverArea}</p>
            <p className="text-sm text-gray-600 mb-4">Expires on: {selectedNews.expireDate}</p>
            <p className="text-sm mb-4">{selectedNews.description}</p>

            <img src={'./content/images/alu7.jpg'} alt="News media" className="w-full h-64 object-cover rounded-lg mb-4" />
            {/* Display media based on type */}
            {/*{selectedNews.mediaType === 'image' && (
              <img src={selectedNews.mediaUrl} alt="News media" className="w-full h-64 object-cover rounded-lg mb-4"/>
            )}*/}
            {selectedNews.mediaType === 'video' && (
              <video controls className="w-full h-64 rounded-lg mb-4">
                <source src={selectedNews.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Button to go back to the news list */}
            <div className="flex justify-center mt-8">
              <button
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedNews(null)} // Reset selectedNews to null to go back to the news list
              >
                Back to News List
              </button>
            </div>
          </div>
        ) : // News Grid view when no specific news item is selected
        newsList.length === 0 ? (
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
                <span className="font-medium">News alert!</span> Sorry, no data found.
              </div>
            </div>
          </div>
        ) : (
          newsList.map((news, index) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedNews(news)} // Set the clicked news item as selected
              >
                <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                <p className="text-sm text-gray-600 mb-1">By: {news.authorName}</p>
                <p className="text-sm text-gray-600 mb-1">Publish Date: {news.publishDate}</p>
                <p className="text-sm text-gray-600 mb-1">Group: {news.group}</p>
                <p className="text-sm text-gray-600 mb-1">Cover Area: {news.coverArea}</p>
                <p className="text-sm text-gray-600 mb-4">Expires on: {news.expireDate}</p>
                <p className="text-sm">{news.description}</p>

                <img src={'./content/images/alu7.jpg'} alt="News media" className="w-full h-64 object-cover rounded-lg mt-4" />

                {/*{news.mediaType === 'image' && (
                  <img src={news.mediaUrl} alt="News media" className="w-full h-64 object-cover rounded-lg mt-4"/>

                )}*/}
                {news.mediaType === 'video' && (
                  <video controls className="w-full h-64 rounded-lg mt-4">
                    <source src={news.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ))
        )}

        {/* Back to Home Page button at the bottom */}
        <div className="flex justify-center mt-8 mb-10">
          <button
            className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={handleBackToHome} // Redirect to home page
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNews;
