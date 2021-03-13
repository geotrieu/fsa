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
                <h6 className="aboutUsIntro">
                    This projected was developed in 2020-2021 by Queen's
                    University QMIND's FSA team.
                    <br />
                    Director of Design: Willem Atack (not pictured)
                    <br />
                    Team Lead: George Trieu
                </h6>
            </Row>
            <Row className="justify-content-md-center">
                {profiles.map((profile) => (
                    <Col key={profile.name + "_col"} sm={2}>
                        <Profile
                            key={profile.name + "_profile"}
                            data={profile}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AboutUs;
