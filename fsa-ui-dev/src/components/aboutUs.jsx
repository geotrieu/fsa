import React from "react";
import { Row, Col } from "react-bootstrap";

const AboutUs = () => {
    return (
        <div>
            <h1 style={{ marginBottom: "25px" }}>About Us</h1>
            <Row className="justify-content-md-center">
                <Col sm={2}>
                    <img width="250px" src="/george.JPG"></img>
                    <p>George Trieu</p>
                    <p>2nd Year Computer Engineering Student</p>
                    <p>Queen's University</p>
                </Col>
                <Col sm={2}>
                    <img width="250px" src="/jackson.JPG"></img>
                    <p>Jackson Kehoe</p>
                    <p>3rd Year Computer Engineering Student</p>
                    <p>Queen's University</p>
                </Col>
                <Col sm={2}>
                    <img width="250px" src="/alexia.JPG"></img>
                    <p>Alexia Tecsa</p>
                    <p>3rd Year Commerce Student</p>
                    <p>Queen's University</p>
                </Col>
                <Col sm={2}>
                    <img width="250px" src="/raisa.JPG"></img>
                    <p>Raisa Sayed</p>
                    <p>4th Year Commerce Student</p>
                    <p>Queen's University</p>
                </Col>
                <Col sm={2}>
                    <img width="250px" src="/nicolas.JPG"></img>
                    <p>Nicolas Wills</p>
                    <p>3rd Year Computer Engineering Student</p>
                    <p>Queen's University</p>
                </Col>
            </Row>
        </div>
    );
};

export default AboutUs;
