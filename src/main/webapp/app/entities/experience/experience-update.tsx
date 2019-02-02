import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { getEntity, updateEntity, createEntity, reset } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExperienceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExperienceUpdateState {
  isNew: boolean;
  personId: string;
}

export class ExperienceUpdate extends React.Component<IExperienceUpdateProps, IExperienceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      personId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPeople();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { experienceEntity } = this.props;
      const entity = {
        ...experienceEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/experience');
  };

  render() {
    const { experienceEntity, people, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cvServiceApp.experience.home.createOrEditLabel">
              <Translate contentKey="cvServiceApp.experience.home.createOrEditLabel">Create or edit a Experience</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : experienceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="experience-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="cvServiceApp.experience.title">Title</Translate>
                  </Label>
                  <AvField id="experience-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="locationLabel" for="location">
                    <Translate contentKey="cvServiceApp.experience.location">Location</Translate>
                  </Label>
                  <AvField id="experience-location" type="text" name="location" />
                </AvGroup>
                <AvGroup>
                  <Label id="fromDateLabel" for="fromDate">
                    <Translate contentKey="cvServiceApp.experience.fromDate">From Date</Translate>
                  </Label>
                  <AvField id="experience-fromDate" type="text" name="fromDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="toDateLabel" for="toDate">
                    <Translate contentKey="cvServiceApp.experience.toDate">To Date</Translate>
                  </Label>
                  <AvField id="experience-toDate" type="text" name="toDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="clientLabel" for="client">
                    <Translate contentKey="cvServiceApp.experience.client">Client</Translate>
                  </Label>
                  <AvField id="experience-client" type="text" name="client" />
                </AvGroup>
                <AvGroup>
                  <Label id="envTechniqueLabel" for="envTechnique">
                    <Translate contentKey="cvServiceApp.experience.envTechnique">Env Technique</Translate>
                  </Label>
                  <AvField id="experience-envTechnique" type="text" name="envTechnique" />
                </AvGroup>
                <AvGroup>
                  <Label id="detailLabel" for="detail">
                    <Translate contentKey="cvServiceApp.experience.detail">Detail</Translate>
                  </Label>
                  <AvField id="experience-detail" type="text" name="detail" />
                </AvGroup>
                <AvGroup>
                  <Label for="person.id">
                    <Translate contentKey="cvServiceApp.experience.person">Person</Translate>
                  </Label>
                  <AvInput id="experience-person" type="select" className="form-control" name="person.id">
                    <option value="" key="0" />
                    {people
                      ? people.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/experience" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  people: storeState.person.entities,
  experienceEntity: storeState.experience.entity,
  loading: storeState.experience.loading,
  updating: storeState.experience.updating,
  updateSuccess: storeState.experience.updateSuccess
});

const mapDispatchToProps = {
  getPeople,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceUpdate);
