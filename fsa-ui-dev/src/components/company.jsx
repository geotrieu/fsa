import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import { fetchFakeCompanies } from "../services/fakeCompanyService";

import CompanyTable from "./common/companyTable";

class Company extends Component {
    state = {
        currentCompany: {},
        similarCompanies: [],
    };

    componentDidMount() {
        this.getCurrentCompany();
        this.getSimilarCompanies();
    }

    async getCurrentCompany() {
        let companies = await fetchFakeCompanies();
        let currentCompany = companies.find(
            (c) => c.ticker === this.props.match.params.ticker
        );
        this.setState({ currentCompany });
    }

    async getSimilarCompanies() {
        let companies = await fetchFakeCompanies();
        companies = companies.filter(
            (c) => c.cluster === this.state.currentCompany.cluster
        );
        this.setState({ similarCompanies: companies });
    }

    handleCompanyClick = (ticker) => {
        this.props.history.push("/company/" + ticker);
    };

    render() {
        let ticker = this.props.match.params.ticker;
        let { currentCompany, similarCompanies } = this.state;
        return (
            <React.Fragment>
                <h1>{ticker}</h1>
                <Container>
                    <Row>
                        <Col>
                            <h4>Current Cluster: {currentCompany.cluster}</h4>
                            <h5>Cluster Characteristics:</h5>
                            <ul>
                                <li>High Profit/Earnings Ratio</li>
                                <li>High Revenue</li>
                            </ul>
                        </Col>
                        <Col>
                            <h4>Similar Companies</h4>
                            <CompanyTable
                                companies={similarCompanies}
                                onClick={this.handleCompanyClick}
                                exclude={{ cluster: true }}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Company;
