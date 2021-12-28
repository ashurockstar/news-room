import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div>
                <div className="card" style={{width: '18rem'}}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title.substring(0,45)}</h5>
                        <p className="card-text">{description.substring(0,88)}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}
