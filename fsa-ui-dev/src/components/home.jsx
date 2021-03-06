import React from "react";

const Home = () => {
    return (
        <div>
            <h1>
                Qualitative Financial Statement Analysis Using Unsupervised
                Learning
            </h1>
            <p style={{ textAlign: "left" }}>
                In the role of a business or investment analyst, financial
                statements are relied on heavily as they are key factors when
                determining the overall success of a company and if an
                investment will provide a return on investment. Over recent
                years, different supervised machine learning models have been
                applied to help gain insights from the large number of datasets
                available.
                <br />
                The problem that is being explored in this project is how to
                help classify and separate different companies in various
                industries based on the financial information provided in 10K
                filings. The objective is to separate companies from various
                industries into different clusters and identify the key
                attributes in each cluster to explore any similarities between
                companies.
                <br />
                The dataset was first processed by removing all NaN values by
                various strategies, such as removing attributes and rows that
                had high NaN rates. Various clustering techniques were used,
                such as k-means clustering, DBSCAN, expectation maximum, and
                more. After normalizing the data, it was found that there was
                still a lot of variation in attributes for the companies. This
                led to many companies being marked as noise, causing many
                clustering techniques such as DBSCAN to be rendered useless.
                However, clustering using Affinity Propagation and Gaussian
                Mixture allowed for clear distinct clusters to form. Some levels
                of supervised learning using Random Forests and Shapely values
                are also being experimented with to determine the clustering
                criteria.
            </p>
        </div>
    );
};

export default Home;
