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
            exApi:"",
            source:"",
            count:0,
        };
        this._api = "81fe8bbe33f64b949474bf94cd180dab"; // first key
    }

    fetchArticles = () => {
        const apiKey = this.state.exApi !== "" ? this.state.exApi : this._api;
        console.log(`calling fetchArticles() ${new Date().toTimeString()}`)
        fetch(`https://newsapi.org/v2/top-headlines?${sourcesKey[this.props.match.params.source]}&apiKey=${apiKey}`).then(
            response => response.json()).then(
                json => this.parseArticles(json))
    }
    parseArticles = (json) => {
        this.setState({status: "", articles: ""})
        this.setState({status: json.status, total:json.totalResults, articles: json.articles, message: json.message, count: this.state.count+1})
       }
    changeApi = (e) => {
        this.setState({exApi: e.target.value})
    }

    componentDidMount() {
        this.fetchArticles()
    }
    componentDidUpdate() {
        if (this.props.match.params.source !== this.state.source) {
            this.setState({source: this.props.match.params.source})
            this.fetchArticles()
        }
    }

    render() {
        const articlesAll = this.state.status === "ok"? this.state.articles.map(
            (item, index) => <div key={'article_'+index} className="article">
                <div className="artTitle">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                </div>
                {item.urlToImage?
                <div><img src={item.urlToImage} className="artImage" alt=""/></div> : null
                }
                <div className="artDesc">{item.source.name}{item.description? " - " : null}{item.description}</div>
                <div className="artDate">Published: {new Date(item.publishedAt).toLocaleString()}</div>
            </div>) : null;
        return(
            <div className="content">
                <div><h4>News Feed (using NewsAPI)</h4></div>
                <div style={{fontSize:"90%"}}>
                    <form>
                        News API Key: <input 
                            type="text" 
                            value={this.state.exApi}
                            onChange={this.changeApi}/>
                    </form>
                    <div>Articles from {this.props.match.params.source}. API status: {this.state.status}. Fetch count: {this.state.count}</div>
                    <div>{this.state.message ? "Message: "+this.state.message : null}</div>
                </div>
                {articlesAll}
            </div>
        )
    }
}
