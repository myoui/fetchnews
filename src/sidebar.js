import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'is-mobile';

class NewsLink extends Component {
    render() {
        return(
            <div onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
                <Link to={this.props.link}>
                    <div className='selector'>{this.props.name}</div>
                </Link>
            </div>)
    }
}


export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { mobile: false }
    }

    componentDidMount() {
        this.setState({mobile: isMobile.isMobile()})
    }

    render() {
        return (
            <div className='navBar'>
                <NewsLink link="usnews" name="Top US News"/>
                <NewsLink link="cnn" name="CNN"/>
                <NewsLink link="bbc" name="BBC"/>
                <NewsLink link="washpost" name="Washington Post"/>
                <NewsLink link="espn" name="ESPN"/>
                <NewsLink link="engadget" name="Engadget"/>
            </div>
        )
    }
}

