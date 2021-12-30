import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';


export default class News extends Component {
    articles = [];

    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            page: 1,
            totalResults: 0,
            loading: false
        }
        document.title = `${this.capitatlize(this.props.category)} - Newshour`
    }

    //Loader functionality not very efficient
    // componentDidMount() {
    //     fetch(`https://newsapi.org/v2/everything?&country=${this.props.country}&category=${this.props.category}&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    //     .then(result => {
    //         this.setState({loading: true});
    //         return result.json();
    //     })
    //     .then((res) => {
    //         // console.log(res)
    //         this.setState({
    //             articles: res.articles, 
    //             totalResults: res.totalResults,
    //             loading: false
    //         });
    //     });
    // }

    capitatlize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    updateNews = async () => {
        this.setState({ loading: true });
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page}&pageSize=${this.props.pageSize}`)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    componentDidMount() {
        this.updateNews()
    }
    handlePrevClick = () => {
        console.log("Previous");
        this.setState({ page: this.state.page - 1 }, () => {
            this.updateNews();
        });
    }

    handleNextClick = () => {
        console.log("Next");
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            this.setState({ page: this.state.page + 1 }, () => {
                this.updateNews();
            });
        }
    }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center' style={{ margin: "35px 0px" }}>
                    NewsHour - Latest {this.capitatlize(this.props.category)} News </h1>
                {this.state.loading && <Spinner />}
                <div className='row my-3'>
                    {!this.state.loading && this.state.articles.map(item => {
                        return (
                            <div className='col-md-4' key={item.url}>
                                <NewsItem
                                    title={item.title}
                                    description={item.description}
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url}
                                    author={item.author}
                                    date={item.publishedAt}
                                    source={item.source.name} />
                            </div>
                        );
                    })}
                </div>
                <div className='d-flex justify-content-between my-3'>
                    <button disabled={this.state.page === 1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                {/* This is a news component */}
            </div>
        )
    }
}
