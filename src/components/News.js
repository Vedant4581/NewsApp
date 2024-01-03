import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from news component ");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  updateNews = async (pageNo) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71f4ec0efac34fb394c1df8b3c8bc56a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  async componentDidMount() {
    this.props.loadingProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71f4ec0efac34fb394c1df8b3c8bc56a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    this.props.loadingProgress(20);
    let data = await fetch(url);
    this.props.loadingProgress(30);
    let parsedData = await data.json();
    this.props.loadingProgress(50);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title = `${this.props.category}-NewsMonkey`;
    this.props.loadingProgress(100);
  }

  handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71f4ec0efac34fb394c1df8b3c8bc56a&pageSize=${this.props.pageSize}&page=${this.state.page+1}`
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page +1,
    //   loading:false})
    this.setState({ page: this.state.page + 1 });
    this.updateNews(this.state.page);
    document.title = `${this.props.category}-NewsMonkey`;
  };

  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71f4ec0efac34fb394c1df8b3c8bc56a&pageSize=${this.props.pageSize}&page=${this.state.page-1}`
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page -1,
    //   articles:parsedData.articles,
    //   loading:false,
    //   })
    this.setState({ page: this.state.page - 1 });
    this.updateNews(this.state.page);
    document.title = `${this.props.category}-NewsMonkey`;
  };

  fetchMoreData = async () => {
    
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71f4ec0efac34fb394c1df8b3c8bc56a&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    console.log("render");
    return (
      <>
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <>
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        
                        title={
                          element.title
                            ? element.title.slice(0, 45) + "..."
                            : " "
                        }
                        description={
                          element.description
                            ? element.description.slice(0, 88) + "..."
                            : " "
                        }
                        date={
                          element.publishedAt
                            ? new Date(element.publishedAt).toGMTString()
                            : " "
                        }
                        source={element.source.name}
                        author={element.author ? element.author : " "}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                      />
                    </div>
                  </>
                );
              })}
              {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page===1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button disabled={(this.state.page+1)>(Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
