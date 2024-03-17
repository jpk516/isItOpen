import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import VenueList from '../components/VenueList';
import ManageTags from '../components/ManageTags';

function Admin() {
    return (
        <div className="admin-panel">
            <Tabs defaultActiveKey="venues" id="admin-panel-tabs" className="mb-3">
                <Tab eventKey="venues" title="Venues">
                    <Row className="mb-3">
                        <Col>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <NavLink to="/venues/manage" className="btn btn-primary me-md-2" role="button">Add Venue</NavLink>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <VenueList />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="tags" title="Tags">
                    <ManageTags />
                </Tab>
                <Tab eventKey="users" title="Users">
                    {/* Placeholder for the Users form component */}
                    <p>Users form will be here</p>
                </Tab>
                {/* Add more tabs as needed for different forms */}
            </Tabs>
        </div>
    );
}

export default Admin;
