import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {
    articles= [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            page: 1,
            totalResults: 0
        }
    }

    componentDidMount() {
        fetch(`https://newsapi.org/v2/everything?q=rainbow&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page}&pageSize=20`)
        .then(result => result.json())
        .then((res) => {
            // console.log(res)
            this.setState({articles: res.articles, totalResults: res.totalResults});
        });
    }

    handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/everything?q=rainbow&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 < this.state.totalResults/20) {
            let url = `https://newsapi.org/v2/everything?q=rainbow&apiKey=05f4210c2cb84fff862be60fc36d1f93&page=${this.state.page+1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {
        return (
            <div className='container'>
                <h2 className='my-3'>NewsHour - Latest News Website</h2>
                <div className='row my-3'>
                    {this.state.articles.map(item => {
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
