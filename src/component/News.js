import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';


export default class News extends Component {
    articles= [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            page: 1,
            totalResults: 0,
            loading: false
        }
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

    async componentDidMount() {
        this.setState({loading: true});
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page}&pageSize=${this.props.pageSize}`)
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 < this.state.totalResults/this.props.pageSize) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center' style={{margin: "35px 0px"}}>NewsHour - Latest News Website</h1>
                {this.state.loading && <Spinner />}
                <div className='row my-3'>
                    {!this.state.loading && this.state.articles.map(item => {
                        return(
                            <div className='col-md-4' key={item.url}>
                                <NewsItem 
                                    title={item.title} 
                                    description={item.description} 
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url} />
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
