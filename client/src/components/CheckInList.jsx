import React from 'react';
import { Card, CardGroup, ListGroup, Badge, Col, Row } from 'react-bootstrap';

function CheckInList({ checkIns }) {

    // order the check-ins by date
    checkIns.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
    });

  return (
    <>
        <Row>
            {checkIns.map((checkIn) => (
                <Col md={6} key={checkIn._id}>
                    <Row className="g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <Col className="p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary-emphasis">{checkIn.venue.type}</strong>
                            <h3 className="mb-0">{checkIn.venue.name}</h3>
                            <div className="mb-1 text-body-secondary">{new Date(checkIn.created).toLocaleString()}</div>
                            <div>
                                {checkIn.tags.map((tag, index) => (
                                <Badge pill bg="secondary" className="ms-1" key={index}>
                                    {tag}
                                </Badge>
                                ))}
                            </div>
                            <a href="#" className="icon-link mt-3">
                                View
                            </a>
                        </Col>
                        <Col className={checkIn.open ? "col-auto d-none d-lg-block bg-success" : "col-auto d-none d-lg-block bg-accent2"}>
                            <div className="check-in-status">
                            </div>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
        
    </>
  );
}

export default CheckInList;
