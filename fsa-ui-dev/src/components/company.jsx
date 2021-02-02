import _ from "lodash";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { fetchFakeCompanies } from "../services/fakeCompanyService";

import CompanyTable from "./common/companyTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Company extends Component {
    state = {
        currentCompany: {},
        similarCompanies: [],
        itemsCount: 0,
        currentPage: 1,
        pageSize: 5,
    };

    componentDidUpdate() {
        this.getCurrentCompany();
        this.getSimilarCompanies();
    }

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
        this.setState({
            itemsCount: companies.length,
            similarCompanies: companies,
        });
    }

    getSortedData = () => {
        const sorted = _.orderBy(
            this.state.similarCompanies,
            ["ticker"],
            "asc"
        );
        const paginated = paginate(
            sorted,
            this.state.currentPage,
            this.state.pageSize
        );
        return paginated;
    };

    handleCompanyClick = (ticker) => {
        this.props.history.push("/company/" + ticker);
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render() {
        let ticker = this.props.match.params.ticker;
        let { currentCompany, itemsCount, currentPage, pageSize } = this.state;
        return (
            <React.Fragment>
                <h1>
                    {ticker}: {currentCompany.name}
                </h1>
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
                                companies={this.getSortedData()}
                                onClick={this.handleCompanyClick}
                                exclude={{ cluster: true }}
                            />
                            <Pagination
                                onPageChange={this.handlePageChange}
                                itemsCount={itemsCount}
                                currentPage={currentPage}
                                pageSize={pageSize}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Company;
