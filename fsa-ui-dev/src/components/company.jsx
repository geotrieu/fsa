import _ from "lodash";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { fetchCompanies } from "../services/companyService";
import { fetchFactors } from "../services/factorService";

import CompanyTable from "./common/companyTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
        maxPagesShow: 3,
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

    getFactorClassName = (status) => {
        if (status === "High") return "badge rounded-pill bg-success";
        return "badge rounded-pill bg-danger";
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
                <Container>
                    <Row className="companyTitle">
                        <Col>
                            <span className="companyName">{name}</span>
                        </Col>
                        <Col>
                            <span className="companyTicker">{ticker}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4 className="inCluster">
                                In Cluster{" "}
                                <span
                                    className="badge rounded-pill bg-primary"
                                    key={cluster}
                                >
                                    {cluster}
                                </span>
                            </h4>
                            <h5>
                                Cluster Characteristics{" "}
                                <span
                                    className="badge rounded-pill bg-warning"
                                    key={cluster + "_charlength"}
                                >
                                    {factors.length}
                                </span>
                            </h5>
                            {factors.map((factor) => (
                                <div
                                    key={factor[0] + "_div"}
                                    className="factorDiv"
                                >
                                    <span
                                        className={this.getFactorClassName(
                                            factor[1]
                                        )}
                                        key={factor[0]}
                                    >
                                        {factor[1] === "High" ? (
                                            <FontAwesomeIcon icon={faArrowUp} />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faArrowDown}
                                            />
                                        )}
                                        {" " + factor[1] + " " + factor[0]}
                                    </span>
                                </div>
                            ))}
                            <h5>Shapley Values Plot for Cluster {cluster}</h5>
                            <img
                                src={
                                    "/shap_plots/shapcluster" + cluster + ".png"
                                }
                                alt="Shapley Value Plot"
                                style={{ maxWidth: "100%" }}
                            ></img>
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
