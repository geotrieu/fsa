import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({ history }) => {
    function handleClusterClick() {
        history.push("/clusters");
    }

    function handleAboutUsClick() {
        history.push("/aboutus");
    }

    function handleGitHubClick() {
        window.open("https://github.com/geotrieu/fsa");
    }

    function handleReportClick() {
        window.alert("Comming Soon!");
    }

    return (
        <div>
            <h1 className="title">
                Quantitative Financial Statement Analysis Using Unsupervised
                Learning
            </h1>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h5>What is this?</h5>
                    <p style={{ textAlign: "left" }}>
                        In the role of a business or investment analyst,
                        financial statements are relied on heavily as they are
                        key factors when determining the overall success of a
                        company and if an investment will provide a return on
                        investment. Over recent years, different supervised
                        machine learning models have been applied to help gain
                        insights from the large number of datasets available.
                        <br />
                        The problem that is being explored in this project is
                        how to help classify and separate different companies in
                        various industries based on the financial information
                        provided in 10K filings. The objective is to separate
                        companies from various industries into different
                        clusters and identify the key attributes in each cluster
                        to explore any similarities between companies.
                    </p>
                    <h5>How to use our Tool:</h5>
                    <p style={{ textAlign: "left" }}>
                        On the <Link to="/clusters">clusters</Link> page, each
                        company is listed along with their cluster number. By
                        clicking on each different company, you'll be able to
                        see other similar companies that are in the same
                        cluster, along with some of the characteristics that
                        were used to form those clusters. A copy of the shapley
                        values plot is also included. You may also search for
                        companies using their ticker symbol or their name, using
                        the Search Box located on the top-right of the page.
                    </p>
                    <h5>How the Model Works:</h5>
                    <p style={{ textAlign: "left" }}>
                        The dataset was first processed by removing all NaN
                        values by various strategies, such as removing
                        attributes and rows that had high NaN rates.
                        <br />
                        Various clustering techniques were used, such as k-means
                        clustering, DBSCAN, expectation maximum, and more. After
                        normalizing the data, it was found that there was still
                        a lot of variation in attributes for the companies. This
                        led to many companies being marked as noise, causing
                        many clustering techniques such as DBSCAN to be rendered
                        useless.
                        <br />
                        However, clustering using Affinity Propagation and
                        Gaussian Mixture allowed for clear distinct clusters to
                        form.
                        <br />
                        <u>
                            This final model uses Affinity Propagation
                            clustering to form the company groups.
                        </u>
                        <br />
                        Some levels of supervised learning using Random Forests
                        and Shapley values were also used to find some of the
                        factors involved in forming the clusters.
                        <br />
                        The summary of the top factors impacting all clusters
                        can be found below (analyzed using Shapley Values):
                        <br />
                        <img
                            src="/shap_plots/shapley_all.png"
                            alt="Shapley Values Plot for All Clusters"
                            style={{ maxWidth: "100%" }}
                        ></img>
                        <br />
                        An example of a more specific clustering can be seen
                        below, where the top factors for cluster 0 is shown:
                        <br />
                        <img
                            src="/shap_plots/shapcluster0.png"
                            alt="Shapley Values Plot for Cluster 0"
                            style={{ maxWidth: "100%" }}
                        ></img>
                        <br />
                        Here, you can see that the cluster tends to have high
                        Average Receivables, and high Average Payables ratios.
                    </p>
                </Col>
                <Col sm={2}>
                    <div className="homeButtonsDiv">
                        <Button
                            className="homeButtons"
                            variant="outline-primary"
                            onClick={handleClusterClick}
                        >
                            See our clusters here!
                        </Button>
                        <Button
                            className="homeButtons"
                            variant="outline-success"
                            onClick={handleAboutUsClick}
                        >
                            Meet the Team
                        </Button>
                        <Button
                            className="homeButtons"
                            variant="outline-warning"
                            onClick={handleGitHubClick}
                        >
                            Checkout the GitHub
                        </Button>
                        <Button
                            className="homeButtons"
                            variant="outline-info"
                            onClick={handleReportClick}
                        >
                            Checkout the Research Report
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
