import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Modal } from 'reactstrap';
import { getEntities } from './news.reducer';

interface News {
  id: number;
  title: string;
  authorName: string;
  publishDate: string;
  coverArea: string;
  group: string;
  expireDate: string;
}
const UpcomingNEWSPage: React.FC = () => {
  const newsList = useAppSelector(state => state.news.entities);
  const dispatch = useAppDispatch();
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [open, setOpen] = useState(false);

  const handleNEWSCardClick = (news: News) => {
    setOpen(true);
    setSelectedNews(news);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  useEffect(() => {
    dispatch(getEntities({ sort: 'id,desc' }));
  }, [dispatch]);

  return (
    <div>
      {/* Centered Heading */}
      <div className="flex flex-wrap -mx-4">
        {newsList.map((news: News) => (
          <div key={news.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
              <span className="float-end bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                NEWS
              </span>
              <h2 className="text-2xl font-bold text-gray-900 pb-3 text-capitalize">{news.title}</h2>
              <p className="text-gray-600">{news.authorName}</p>
              <p className="text-gray-600">
                <strong>Publish Date : </strong>{' '}
                {new Date(news.publishDate)
                  .toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleNEWSCardClick(news)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedNews && (
        <Modal isOpen={open} toggle={closeModal} centered>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-capitalize">{selectedNews.title} Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 font-bold text-4xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Author Name : </strong> {selectedNews.authorName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Cover Area : </strong> {selectedNews.coverArea}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Group : </strong> {selectedNews.group}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Expire Date : </strong>{' '}
              {new Date(selectedNews.expireDate)
                .toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingNEWSPage;
