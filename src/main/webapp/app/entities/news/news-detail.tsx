import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './news.reducer';

export const NewsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const newsEntity = useAppSelector(state => state.news.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="newsDetailsHeading">News</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{newsEntity.id}</dd>
          <dt>
            <span id="authorName">Author Name</span>
          </dt>
          <dd>{newsEntity.authorName}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{newsEntity.title}</dd>
          <dt>
            <span id="publishDate">Publish Date</span>
          </dt>
          <dd>{newsEntity.publishDate}</dd>
          <dt>
            <span id="coverArea">Cover Area</span>
          </dt>
          <dd>{newsEntity.coverArea}</dd>
          <dt>
            <span id="group">Group</span>
          </dt>
          <dd>{newsEntity.group}</dd>
          <dt>
            <span id="expireDate">Expire Date</span>
          </dt>
          <dd>{newsEntity.expireDate}</dd>
        </dl>
        <Button tag={Link} to="/news" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/news/${newsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NewsDetail;
