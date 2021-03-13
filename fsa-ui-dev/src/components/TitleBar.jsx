import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const TitleBar = ({ searchTerm, onChange }) => {
    const history = useHistory();

    function handleSearchClick(e) {
        e.preventDefault();
        history.push("/clusters");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>QMIND FSA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/clusters">
                        Company Clusters
                    </Nav.Link>
                    <Nav.Link as={Link} to="/aboutus">
                        About Us
                    </Nav.Link>
                </Nav>
                <Form onSubmit={handleSearchClick} inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        value={searchTerm}
                        onChange={(e) => onChange(e.currentTarget.value)}
                    />
                    <Button
                        onClick={handleSearchClick}
                        variant="outline-success"
                    >
                        Search
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TitleBar;
