import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `SAB-KI-NEWS - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
  }, [])
  

  //   handlePrevClick = async () => {
  //     console.log("Previous");
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       props.country
  //     }&category=${
  //       props.category
  //     }&apiKey=f14c83a40a9c430da1d3c95c1cb16577&page=${page - 1}&pageSize=${props.pageSize}`;
  //      setLoading(true)
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //      setPage(page-1)
  //      setArticles(parsedData.articles)
  //      setLoading(false);
  //      updateNews()
  //   };

  //   handleNextClick = async () => {
  //     if (!( page + 1 >
  //         Math.ceil(totalResults / props.pageSize)
  //       )
  //     ) {
  //       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f14c83a40a9c430da1d3c95c1cb16577&page=${page + 1}&pageSize=${props.pageSize}`;
  //       setLoading(true);
  //       let data = await fetch(url);
  //       let parsedData = await data.json();
  //       setPage(page+1);
  //       setArticles(parsedData.articles);
  //       setLoading(false);
  //     }
  //       setPage(page+1)
  //       updateNews()
  //   };

  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
    // setLoading(false)
  };

    return (
      <>
        <h1 className="text-center " style={{ margin: "60px 0px 0px 0px" }}>
          <strong>
            SAB-KI-NEWS - Top {capitalizeFirstLetter(props.category)}{" "}
            Headlines{" "}
          </strong>
        </h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-1" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 60) : "Title not found"}
                      description={
                        element.description
                          ? element.description.slice(0, 100)
                          : "Something error found"
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
            disabled={page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 7,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;