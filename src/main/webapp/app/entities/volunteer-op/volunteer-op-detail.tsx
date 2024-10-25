import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './volunteer-op.reducer';

export const VolunteerOPDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const volunteerOPEntity = useAppSelector(state => state.volunteerOP.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="volunteerOPDetailsHeading">Volunteer OP</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{volunteerOPEntity.id}</dd>
          <dt>
            <span id="volunteerName">Volunteer Name</span>
          </dt>
          <dd>{volunteerOPEntity.volunteerName}</dd>
          <dt>
            <span id="dateAndTime">Date And Time</span>
          </dt>
          <dd>{volunteerOPEntity.dateAndTime}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{volunteerOPEntity.location}</dd>
          <dt>
            <span id="timeDuration">Time Duration</span>
          </dt>
          <dd>{volunteerOPEntity.timeDuration}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{volunteerOPEntity.description}</dd>
          <dt>
            <span id="member">Member</span>
          </dt>
          <dd>{volunteerOPEntity.member}</dd>
          <dt>
            <span id="volunteerOpCoordinator">Volunteer Op Coordinator</span>
          </dt>
          <dd>{volunteerOPEntity.volunteerOpCoordinator}</dd>
        </dl>
        <Button tag={Link} to="/volunteer-op" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/volunteer-op/${volunteerOPEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default VolunteerOPDetail;
