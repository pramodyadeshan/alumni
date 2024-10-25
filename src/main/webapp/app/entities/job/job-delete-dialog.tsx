import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './job.reducer';

// Define the props interface
interface JobDeleteDialogProps {
  isOpen: boolean;
  jobId: number | null;
  onClose: () => void;
}

export const JobDeleteDialog: React.FC<JobDeleteDialogProps> = ({ isOpen, jobId, onClose }) => {
  const dispatch = useAppDispatch();
  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    if (isOpen && jobId !== null) {
      dispatch(getEntity(jobId));
      setLoadModal(true);
    }
  }, [isOpen, jobId]);

  const jobEntity = useAppSelector(state => state.job.entity);
  const updateSuccess = useAppSelector(state => state.job.updateSuccess);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    if (jobEntity && jobEntity.id) {
      dispatch(deleteEntity(jobEntity.id));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="jobDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="alumniApp.job.delete.question">Are you sure you want to delete Job?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-job" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobDeleteDialog;
