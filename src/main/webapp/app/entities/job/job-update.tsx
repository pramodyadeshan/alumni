import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntity, getEntity, reset, updateEntity } from './job.reducer';

export const JobUpdate = () => {
  const dispatch = useAppDispatch();
  const [bgImg, setbgImg] = useState('./content/images/alu9.png');
  const [file, setFile] = useState(null); // State for file upload
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sampleData = {
    jobName: 'Frontend Developer',
    companyName: 'Tech Solutions Inc.',
    location: 'New York, NY',
    salaryDetails: 70000,
    email: 'hr@techsolutions.com',
    jobDescription: 'Develop and maintain the frontend of our web applications.',
    expireDate: '2024-12-31',
    jobApplyMethod: 'Email',
  };

  const jobEntity = useAppSelector(state => state.job.entity);
  const loading = useAppSelector(state => state.job.loading);
  const updating = useAppSelector(state => state.job.updating);
  const updateSuccess = useAppSelector(state => state.job.updateSuccess);

  const handleClose = () => {
    navigate('/job' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // Handle file selection
  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const saveEntity = values => {
    const formData = new FormData();
    formData.append('id', values.id);
    formData.append('jobName', values.jobName);
    formData.append('companyName', values.companyName);
    formData.append('location', values.location);
    formData.append('salaryDetails', values.salaryDetails);
    formData.append('email', values.email);
    formData.append('jobDescription', values.jobDescription);
    formData.append('expireDate', values.expireDate);
    formData.append('jobApplyMethod', values.jobApplyMethod);

    if (file) {
      formData.append('fileUpload', file);
    }

    // eslint-disable-next-line complexity
    // const saveEntity = values => {
    //   if (values.id !== undefined && typeof values.id !== 'number') {
    //     values.id = Number(values.id);
    //   }

    const entity = {
      ...jobEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? { ...sampleData } // Use sample data when creating a new job
      : { ...jobEntity };

  return (
    <div>
      <div className="bg-cover bg-center min-h-screen flex flex-col" style={{ backgroundImage: `url(${bgImg})` }}>
        {/* Main container for the form */}
        <div className="flex-grow container max-w-lg mx-auto p-2">
          <h2 className="text-center text-3xl font-bold mb-3 text-white pt-2">{isNew ? 'Create' : 'Edit'} Post a Job</h2> {/* Page title */}
          {/* Form container with a background color and shadow */}
          <div className="bg-amber-100 shadow-md rounded-lg p-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                {!isNew ? <ValidatedField name="id" required readOnly id="job-id" label="ID" validate={{ required: true }} /> : null}
                <ValidatedField
                  label="Job Name"
                  id="job-jobName"
                  name="jobName"
                  data-cy="jobName"
                  type="text"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Job Name"
                />
                <ValidatedField
                  label="Company Name"
                  id="job-companyName"
                  name="companyName"
                  data-cy="companyName"
                  type="text"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Company Name"
                />
                <ValidatedField
                  label="Location"
                  id="job-location"
                  name="location"
                  data-cy="location"
                  type="text"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Location"
                />
                <ValidatedField
                  label="Salary Details"
                  id="job-salaryDetails"
                  name="salaryDetails"
                  data-cy="salaryDetails"
                  type="number"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Salary Details"
                />
                <ValidatedField
                  label="Email Address"
                  id="job-email"
                  name="email"
                  data-cy="email"
                  type="email"
                  validate={{
                    required: { value: true, message: 'This field is required' },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
                  }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Email"
                />
                {/*<ValidatedField*/}
                {/*  label="Email Address"*/}
                {/*  id="job-email"*/}
                {/*  name="email"*/}
                {/*  data-cy="email"*/}
                {/*  type="email"*/}
                {/*  validate={{ required: { value: true, message: 'This field is required' } }}*/}
                {/*  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"*/}
                {/*/>*/}
                <ValidatedField
                  label="Job Description"
                  id="job-jobDescription"
                  name="jobDescription"
                  data-cy="jobDescription"
                  type="textarea"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Job Description"
                />
                <ValidatedField
                  label="Expire Date"
                  id="job-expireDate"
                  name="expireDate"
                  data-cy="expireDate"
                  type="date"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ValidatedField
                  label="Job Apply Method"
                  id="job-jobApplyMethod"
                  name="jobApplyMethod"
                  data-cy="jobApplyMethod"
                  type="select"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  class="w-full px-3 py-2 rounded-lg text-gray-700"
                >
                  <option value="">Select Apply Method</option>
                  <option value="Email">Email</option>
                  <option value="Phonecalls">Phonecalls</option>
                  <option value="DirectContact">Direct Contact</option>
                </ValidatedField>

                {/*<ValidatedField
                  label="Upload Job Poster"
                  id="job-jobPoster"
                  name="fileUpload"
                  data-cy="fileUpload"
                  type="file"
                  validate={{ required: { value: true, message: 'This field is required' } }}
                  className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                />*/}

                <Button
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  type="submit"
                  disabled={updating}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {isNew ? 'Create' : 'Edit'} Post
                </Button>
              </ValidatedForm>
            )}
          </div>
          <div className="flex justify-center mt-4 mb-10">
            <button
              className="bg-gray-500 text-white font-bold p-3 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => navigate('/job')} // Navigate to Home Page
            >
              Back to Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobUpdate;
