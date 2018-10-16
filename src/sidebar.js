import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class NewsLink extends Component {
    render() {
        return(
            <div>
                <Link to={this.props.link}>
                    <div className='selector'>{this.props.name}</div>
                </Link>
            </div>)
    }
}


export class NavBar extends Component {
    render() {
        return (
            <div className='navBar'>
                <NewsLink link="usnews" name="Top US News"/>
                <NewsLink link="cnn" name="CNN (USA)"/>
                <NewsLink link="bbc" name="BBC (UK)"/>
                <NewsLink link="washpost" name="Washington Post (USA)"/>
                <NewsLink link="espn" name="ESPN"/>
                <NewsLink link="engadget" name="Engadget"/>
            </div>
        )
    }
}

