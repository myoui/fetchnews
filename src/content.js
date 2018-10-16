import React, { Component } from 'react';

const sourcesKey = {
    usnews:"country=us",
    worldnews:"category=general",
    cnn:"sources=cnn",
    bbc:"sources=bbc-news",
    washpost:"sources=the-washington-post",
    espn:"sources=espn",
    engadget:"sources=engadget"
}

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesJson: [],
            articles: [],
            total: "",
            status: "",
            message: "",
            time: undefined,
            exApi:""
        };
        this._api = "81fe8bbe33f64b949474bf94cd180dab"; // first key
    }

    fetchArticles = () => {
        const apiKey = this.state.exApi !== "" ? this.state.exApi : this._api;
        fetch(`https://newsapi.org/v2/top-headlines?${sourcesKey[this.props.match.params.source]}&apiKey=${apiKey}`).then(
            response => response.json()).then(
                json => this.parseArticles(json))
    }
    parseArticles = (json) => {
        this.setState({status: json.status, total:json.totalResults, articles: json.articles, message: json.message})
    }
    changeApi = (e) => {
        this.setState({exApi: e.target.value})
    }

    componentDidMount() {
        if (this.props.match.params.source) {
            this.fetchArticles()
        }
    }
    componentDidUpdate() {
        this.fetchArticles()
    }

    render() {
        const articlesAll = this.state.status === "ok"? this.state.articles.map(
            (item, index) => <div key={'article_'+{index}} className="article">
                <div className="artTitle"><a href={item.url} target="_blank">{item.title}</a></div>
                {item.urlToImage?
                <div><img src={item.urlToImage} className="artImage" alt="Image unavailable"/></div> : null
                }
                <div className="artDesc">{item.source.name}{item.description? " - " : null}{item.description}</div>
                <div className="artDate">Published: {new Date(item.publishedAt).toLocaleString()}</div>
            </div>) : null;
        return(
            <div className="content">
                <form>
                    News API Key: <input 
                        type="text" 
                        value={this.state.exApi}
                        onChange={this.changeApi}/>
                </form>
                <div>Articles from {this.props.match.params.source}. API status: {this.state.status}. Count: {this.state.total}</div>
                <div>{this.state.message ? "Message: "+this.state.message : null}</div>
                {articlesAll}
            </div>
        )
    }
}
