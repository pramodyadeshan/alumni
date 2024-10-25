import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, updateEntity, createEntity, reset, getEntities } from './news.reducer';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const NewsUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNewParam = id === undefined;

  const newsEntities = useAppSelector(state => state.news.entities) || [];
  const loading = useAppSelector(state => state.news.loading);
  const updating = useAppSelector(state => state.news.updating);
  const updateSuccess = useAppSelector(state => state.news.updateSuccess);
  const [isNew, setIsNew] = useState(isNewParam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNews, setEditNews] = useState(null);

  const handleClose = () => {
    navigate('/news' + location.search);
  };

  useEffect(() => {
    if (isNewParam) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getEntities({ sort: 'id,desc' })); // This will always fetch the entities in descending order
  }, [dispatch, id, isNewParam]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...editNews,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity)).then(() => {
        dispatch(getEntities({ sort: 'id,desc' })); // Re-fetch entities after creation
      });
    } else {
      dispatch(updateEntity(entity)).then(() => {
        dispatch(getEntities({ sort: 'id,desc' })); // Re-fetch entities after update
      });
    }
    setIsModalOpen(false);
  };

  const defaultValues = () => (isNew ? {} : { ...editNews });

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="p-4 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-fuchsia-700">Alumni News Updates</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {/* Add News Button */}
          <div
            onClick={() => {
              setIsModalOpen(true);
              setIsNew(true);
              setEditNews(null);
            }}
            className="cursor-pointer flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 sm:p-6 shadow-lg transition-colors"
          >
            <AiOutlinePlus size={40} />
          </div>

          {/* Ensure newsEntities is an array before mapping */}
          {Array.isArray(newsEntities) &&
            newsEntities.map((news, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                <p className="text-sm text-gray-600 mb-1">By: {news.authorName}</p>
                <p className="text-sm text-gray-600 mb-1">Published Date: {new Date(news.publishDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mb-1">Group: {news.group}</p>
                <p className="text-sm text-gray-600 mb-1">Cover Area: {news.coverArea}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Expires on:{' '}
                  {new Date(news.expireDate)
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

                <p className="text-sm">{news.description}</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditNews(news);
                      setIsNew(false);
                    }}
                  >
                    <AiOutlineEdit size={24} />
                  </button>

                  <button className="text-red-500 hover:text-red-700" onClick={() => (window.location.href = `/news/${news.id}/delete`)}>
                    <AiOutlineDelete size={24} />
                  </button>
                </div>
              </div>
            ))}

          {/* Modal for creating/editing news */}
          <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} centered>
            <ModalHeader toggle={() => setIsModalOpen(false)} className="px-6">
              <strong>{isNew ? 'Create News' : 'Edit News'}</strong>
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                  {!isNew ? <ValidatedField name="id" required readOnly id="news-id" label="ID" validate={{ required: true }} /> : null}
                  <ValidatedField
                    label="Author Name"
                    placeholder="Author Name"
                    id="news-authorName"
                    name="authorName"
                    data-cy="authorName"
                    type="text"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField
                    label="Title"
                    placeholder="Title"
                    id="news-title"
                    name="title"
                    data-cy="title"
                    type="text"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField
                    label="Publish Date"
                    id="news-publishDate"
                    name="publishDate"
                    data-cy="publishDate"
                    type="datetime-local"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField
                    label="Cover Area"
                    placeholder="Cover Area"
                    id="news-coverArea"
                    name="coverArea"
                    data-cy="coverArea"
                    type="text"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField
                    label="Group"
                    placeholder="Group"
                    id="news-group"
                    name="group"
                    data-cy="group"
                    type="text"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField
                    label="Expire Date"
                    id="news-expireDate"
                    name="expireDate"
                    data-cy="expireDate"
                    type="datetime-local"
                    validate={{ required: { value: true, message: 'This field is required' } }}
                  />
                  <ValidatedField label="Upload Media" accept="image/*,video/*" name="" type="file" />
                  <Button
                    color="primary"
                    id="save-entity"
                    data-cy="entityCreateSaveButton"
                    type="submit"
                    disabled={updating}
                    className="bg-blue-500 text-white w-full p-2 sm:p-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </Button>
                </ValidatedForm>
              )}
              <Button
                className="bg-red-600 text-white w-full p-2 sm:p-3 rounded-lg hover:bg-red-600 transition-colors mt-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </ModalBody>
          </Modal>
        </div>

        <div className="flex justify-center mt-8 mb-10">
          <button
            className="bg-gray-500 text-white font-bold p-2 sm:p-3 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => (window.location.href = '/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsUpdate;
