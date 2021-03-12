import React from "react";
import { Row, Col } from "react-bootstrap";
import Profile from "./common/profile";

const AboutUs = () => {
    const profiles = [
        {
            img: "/george.JPG",
            name: "George Trieu",
            program: "2nd Year Computer Engineering Student",
            organization: "Queen's University",
            faculty: "Faculty of Engineering and Applied Science",
        },
        {
            img: "/jackson.JPG",
            name: "Jackson Kehoe",
            program: "3rd Year Computer Engineering Student",
            organization: "Queen's University",
            faculty: "Faculty of Engineering and Applied Science",
        },
        {
            img: "/alexia.JPG",
            name: "Alexia Tecsa",
            program: "3rd Year Commerce Student",
            organization: "Queen's University",
            faculty: "Smith School of Business",
        },
        {
            img: "/raisa.jpg",
            name: "Raisa Sayed",
            program: "4th Year Commerce Student",
            organization: "Queen's University",
            faculty: "Smith School of Business",
        },
        {
            img: "/nicolas.jpg",
            name: "Nicolas Wills",
            program: "3rd Year Computer Engineering Student",
            organization: "Queen's University",
            faculty: "Faculty of Engineering and Applied Science",
        },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: "25px" }}>About Us</h1>
            <Row className="justify-content-md-center">
                {profiles.map((profile) => (
                    <Col sm={2}>
                        <Profile data={profile} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AboutUs;
