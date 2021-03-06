import _ from "lodash";
import React, { Component } from "react";

import { fetchCompanies } from "../services/companyService";
import CompanyTable from "./common/companyTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Clusters extends Component {
    state = {
        companies: [],
        itemsCount: 0,
        pageSize: 15,
        maxPagesShow: 10,
    };

    componentDidMount() {
        this.getCompanies();
    }

    async getCompanies() {
        const companies = await fetchCompanies();
        this.setState({ itemsCount: companies.length, companies: companies });
        this.getSortedData();
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
        return paginated;
    };

    handleCompanyClick = (ticker) => {
        this.props.history.push("/company/" + ticker);
    };

    handlePageChange = (page) => {
        if (page.toString().trim() === "...") return;
        this.props.setCurrentPage(page);
    };

    render() {
        let { itemsCount, pageSize, maxPagesShow } = this.state;
        let { currentPage } = this.props;
        return (
            <React.Fragment>
                <CompanyTable
                    companies={this.getSortedData()}
                    onClick={this.handleCompanyClick}
                />
                <Pagination
                    onPageChange={this.handlePageChange}
                    itemsCount={itemsCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    maxPagesShow={maxPagesShow}
                />
            </React.Fragment>
        );
    }
}

export default Clusters;
