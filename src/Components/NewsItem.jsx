import React from "react";

const NewsItem = (props) =>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div className="d-flex justify-content-end position-absolute top-0 end-0" >

          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-outline-dark"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
