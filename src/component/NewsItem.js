import React, { Component } from 'react';
import defaultImage from '../assets/defaultImage.jpg'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title ? title.substring(0,45) : "Default"}</h5>
                        <p className="card-text">{description ? description.substring(0,88) : "Default"}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}
