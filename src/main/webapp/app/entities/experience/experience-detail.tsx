import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExperienceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExperienceDetail extends React.Component<IExperienceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { experienceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cvServiceApp.experience.detail.title">Experience</Translate> [<b>{experienceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="cvServiceApp.experience.title">Title</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.title}</dd>
            <dt>
              <span id="location">
                <Translate contentKey="cvServiceApp.experience.location">Location</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.location}</dd>
            <dt>
              <span id="fromDate">
                <Translate contentKey="cvServiceApp.experience.fromDate">From Date</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.fromDate}</dd>
            <dt>
              <span id="toDate">
                <Translate contentKey="cvServiceApp.experience.toDate">To Date</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.toDate}</dd>
            <dt>
              <span id="client">
                <Translate contentKey="cvServiceApp.experience.client">Client</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.client}</dd>
            <dt>
              <span id="envTechnique">
                <Translate contentKey="cvServiceApp.experience.envTechnique">Env Technique</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.envTechnique}</dd>
            <dt>
              <span id="detail">
                <Translate contentKey="cvServiceApp.experience.detail">Detail</Translate>
              </span>
            </dt>
            <dd>{experienceEntity.detail}</dd>
            <dt>
              <Translate contentKey="cvServiceApp.experience.person">Person</Translate>
            </dt>
            <dd>{experienceEntity.person ? experienceEntity.person.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/experience" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/experience/${experienceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ experience }: IRootState) => ({
  experienceEntity: experience.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceDetail);
