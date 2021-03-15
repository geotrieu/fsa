import _ from "lodash";
import React, { Component } from "react";

import { fetchCompanies } from "../services/companyService";
import CompanyTable from "./common/companyTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import DownloadFile from "./common/downloadFile";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

class Clusters extends Component {
    state = {
        companies: [],
        pageSize: 13,
        maxPagesShow: 3,
    };

    componentDidMount() {
        this.getCompanies();
    }

    async getCompanies() {
        const companies = await fetchCompanies();
        this.setState({ companies: companies });
    }

    getSortedData = () => {
        if (!this.state.companies) return;
        const filtered = this.state.companies.filter(
            (item) =>
                item.name
                    .toUpperCase()
                    .startsWith(this.props.searchTerm.toUpperCase()) ||
                item.ticker.startsWith(this.props.searchTerm.toUpperCase())
        );
        const sorted = _.orderBy(filtered, ["ticker"], "asc");
        const paginated = paginate(
            sorted,
            this.props.currentPage,
            this.state.pageSize
        );
        return { count: sorted.length, data: paginated };
    };

    handleCompanyClick = (ticker) => {
        this.props.history.push("/company/" + ticker);
    };

    handlePageChange = (page) => {
        if (page.toString().trim() === "...") return;
        this.props.setCurrentPage(page);
    };

    render() {
        let { pageSize, maxPagesShow } = this.state;
        let { currentPage, searchTerm } = this.props;

        const { count: itemsCount, data: pageCompanies } = this.getSortedData();
        return (
            <React.Fragment>
                <div className="companyTableProperties">
                    <span className="companyCount badge rounded-pill bg-primary">
                        {itemsCount + " Companies Found"}
                    </span>
                    {searchTerm ? (
                        <span className="searchTerm badge rounded-pill bg-success">
                            {"Search Term: " + searchTerm}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <CompanyTable
                    companies={pageCompanies}
                    onClick={this.handleCompanyClick}
                />
                <Row>
                    <Col className="mr-auto">
                        <Pagination
                            onPageChange={this.handlePageChange}
                            itemsCount={itemsCount}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            maxPagesShow={maxPagesShow}
                        />
                    </Col>
                    <Col>
                        <DownloadFile
                            icon={faDownload}
                            className="float-right"
                            variant="outline-info"
                            text="Download CSV"
                            link="/datasets/2018_Clusters_Ratios_AF_All.csv"
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Clusters;
