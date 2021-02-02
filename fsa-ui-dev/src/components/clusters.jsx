import React, { Component } from "react";

import { fetchFakeCompanies } from "../services/fakeCompanyService";
import CompanyTable from "./common/companyTable";

class Clusters extends Component {
    state = {
        companies: [],
    };

    componentDidMount() {
        this.getFakeCompanies();
    }

    async getFakeCompanies() {
        let companies = await fetchFakeCompanies();
        this.setState({ companies: companies });
    }

    handleCompanyClick = (ticker) => {
        this.props.history.push("/company/" + ticker);
    };

    render() {
        let { companies } = this.state;
        return (
            <CompanyTable
                companies={companies}
                onClick={this.handleCompanyClick}
            />
        );
    }
}

export default Clusters;
