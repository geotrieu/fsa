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
        currentPage: 1,
        pageSize: 100,
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
        const sorted = _.orderBy(this.state.companies, ["ticker"], "asc");
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
        let { itemsCount, currentPage, pageSize } = this.state;
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
                />
            </React.Fragment>
        );
    }
}

export default Clusters;
