import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExperienceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Experience extends React.Component<IExperienceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { experienceList, match } = this.props;
    return (
      <div>
        <h2 id="experience-heading">
          <Translate contentKey="cvServiceApp.experience.home.title">Experiences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cvServiceApp.experience.home.createLabel">Create new Experience</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.fromDate">From Date</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.toDate">To Date</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.client">Client</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.envTechnique">Env Technique</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.detail">Detail</Translate>
                </th>
                <th>
                  <Translate contentKey="cvServiceApp.experience.person">Person</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {experienceList.map((experience, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${experience.id}`} color="link" size="sm">
                      {experience.id}
                    </Button>
                  </td>
                  <td>{experience.title}</td>
                  <td>{experience.location}</td>
                  <td>{experience.fromDate}</td>
                  <td>{experience.toDate}</td>
                  <td>{experience.client}</td>
                  <td>{experience.envTechnique}</td>
                  <td>{experience.detail}</td>
                  <td>{experience.person ? <Link to={`person/${experience.person.id}`}>{experience.person.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${experience.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${experience.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${experience.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ experience }: IRootState) => ({
  experienceList: experience.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);
