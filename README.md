# Financial Statement Analysis

In the role of a business or investment analyst, financial statements are relied on heavily as they are key factors when determining the overall success of a company and if an investment will provide a return on investment. Over recent years, different supervised machine learning models have been applied to help gain insights from the large number of datasets available.
The problem that is being explored in this project is how to help classify and separate different companies in various industries based on the financial information provided in 10K filings. The objective is to separate companies from various industries into different clusters and identify the key attributes in each cluster to explore any similarities between companies.

### Application

On the clusters page, each company is listed along with their cluster number.
<img src="https://i.imgur.com/ZuLyun0.png">
By clicking on each different company, you'll be able to see other similar companies that are in the same cluster, along with some of the characteristics that were used to form those clusters. A copy of the shapley values plot is also included.
<img src="https://i.imgur.com/ajhivzy.png">
You may also search for companies using their ticker symbol or their name, using the Search Box located on the top-right of the page.

### Technical Details

The dataset was first processed by removing all NaN values by various strategies, such as removing attributes and rows that had high NaN rates.
Various clustering techniques were used, such as k-means clustering, DBSCAN, expectation maximum, and more. After normalizing the data, it was found that there was still a lot of variation in attributes for the companies. This led to many companies being marked as noise, causing many clustering techniques such as DBSCAN to be rendered useless.
However, clustering using Affinity Propagation and Gaussian Mixture allowed for clear distinct clusters to form.
This final model uses Affinity Propagation clustering to form the company groups.
Some levels of supervised learning using Random Forests and Shapley values were also used to find some of the factors involved in forming the clusters.
The summary of the top factors impacting all clusters can be found below (analyzed using Shapley Values):
<img src="https://i.imgur.com/Y0lrHB3.png">

## Team Members:

George Trieu (Computer Engineering @ Queen's)
Jackson Kehoe (Computer Engineering @ Queen's)
Alexia Tecsa (Commerce @ Queen's)
Raisa Sayed (Commerce @ Queen's)
Nicolas Wills (Computer Engineering @ Queen's)

## Dataset:

https://www.kaggle.com/cnic92/200-financial-indicators-of-us-stocks-20142018
