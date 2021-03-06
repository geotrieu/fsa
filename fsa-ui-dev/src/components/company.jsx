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
        companies: [],
        ticker: "XXXX",
        name: "XXXXXXX",
        cluster: -1,
        similarCompanies: [],
        factors: [],
        itemsCount: 0,
        currentPage: 1,
        pageSize: 10,
        maxPagesShow: 5,
    };

    componentDidMount() {
        this.getCurrentCompany();
        this.getSimilarCompanies();
    }

    async getCurrentCompany() {
        if (this.state.companies.length === 0) {
            let companies = await fetchCompanies();
            this.setState({ companies });
        }

        await this.getName(this.props.match.params.ticker);
    }

    async getName(ticker) {
        let currentCompany = this.state.companies.find(
            (c) => c.ticker === ticker
        );
        this.setState({
            ticker: ticker,
            name: currentCompany.name,
            cluster: currentCompany.cluster,
        });

        await this.getFactors(currentCompany.cluster);
    }

    async getFactors(cluster) {
        let factors = await fetchFactors();
        this.setState({ factors: factors[cluster] });
    }

    async getSimilarCompanies() {
        if (this.state.companies.length === 0) {
            let companies = await fetchCompanies();
            this.setState({ companies });
        }
        let companies = this.state.companies.filter(
            (c) => c.cluster === this.state.cluster
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
        this.getName(ticker);
        this.props.history.push("/company/" + ticker);
    };

    handlePageChange = (page) => {
        if (page.toString().trim() === "...") return;
        this.setState({ currentPage: page });
    };

    render() {
        let ticker = this.props.match.params.ticker;
        let {
            name,
            cluster,
            itemsCount,
            currentPage,
            pageSize,
            factors,
            maxPagesShow,
        } = this.state;
        return (
            <React.Fragment>
                <h1>
                    {ticker}: {name}
                </h1>
                <Container>
                    <Row>
                        <Col>
                            <h4>Current Cluster: {cluster}</h4>
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
                                maxPagesShow={maxPagesShow}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Company;
