import _ from "lodash";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { fetchCompanies } from "../services/companyService";
import { fetchFactors } from "../services/factorService";

import CompanyTable from "./common/companyTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Company extends Component {
    state = {
        currentCompany: {},
        similarCompanies: [],
        factors: [],
        itemsCount: 0,
        currentPage: 1,
        pageSize: 10,
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
        let companies = await fetchCompanies();
        let currentCompany = companies.find(
            (c) => c.ticker === this.props.match.params.ticker
        );
        this.setState({ currentCompany });

        await this.getFactors(currentCompany.cluster);
    }

    async getFactors(cluster) {
        let factors = await fetchFactors();
        this.setState({ factors: factors[cluster] });
    }

    async getSimilarCompanies() {
        let companies = await fetchCompanies();
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
        let {
            currentCompany,
            itemsCount,
            currentPage,
            pageSize,
            factors,
        } = this.state;
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
                                {factors.map((factor) => (
                                    <li key={factor}>{factor}</li>
                                ))}
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
