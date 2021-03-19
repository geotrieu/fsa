import React from "react";
import { Table } from "react-bootstrap";

const CompanyTable = ({ companies, onClick, exclude = {} }) => {
    let renderCompany = (company) => {
        return (
            <tr
                style={{ cursor: "pointer" }}
                key={company.ticker}
                onClick={() => onClick(company.ticker)}
            >
                {!exclude.cluster && (
                    <td key={company.ticker + ".cluster"}>{company.cluster}</td>
                )}
                {!exclude.ticker && (
                    <td key={company.ticker + ".ticker"}>{company.ticker}</td>
                )}
                {!exclude.name && (
                    <td key={company.ticker + ".name"}>{company.name}</td>
                )}
            </tr>
        );
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {!exclude.cluster && <th>Cluster</th>}
                    {!exclude.ticker && <th>Ticker</th>}
                    {!exclude.name && <th>Company Name</th>}
                </tr>
            </thead>
            <tbody>{companies.map((company) => renderCompany(company))}</tbody>
        </Table>
    );
};

export default CompanyTable;
