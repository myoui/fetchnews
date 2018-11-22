import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'is-mobile'
import { Row, Column } from 'simple-flexbox'
class NewsLink extends Component {
  render () {
    return (
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Link to={this.props.link}>
          <div className='selector'>{this.props.name}</div>
        </Link>
      </div>)
  }
}

export class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = { mobile: false }
  }

  componentDidMount () {
    this.setState({ mobile: isMobile.isMobile() })
  }

  render () {
    if (!this.state.mobile) {
      return (
        <div className='navBar'>
          <NewsLink link='usnews' name='Top US News' />
          <NewsLink link='cnn' name='CNN' />
          <NewsLink link='bbc' name='BBC' />
          <NewsLink link='washpost' name='Washington Post' />
          <NewsLink link='espn' name='ESPN' />
          <NewsLink link='engadget' name='Engadget' />
        </div>
      )
    } else {
      return (
        <div className='navBarMob'>
          <Row>
            <Column>
              <NewsLink link='usnews' name='Top US News' />
            </Column>
            <Column>
              <NewsLink link='cnn' name='CNN' />
            </Column>
            <Column>
              <NewsLink link='bbc' name='BBC' />
            </Column>
            <Column>
              <NewsLink link='washpost' name='Washington Post' />
            </Column>
            <Column>
              <NewsLink link='espn' name='ESPN' />
            </Column>
            <Column>
              <NewsLink link='engadget' name='Engadget' />
            </Column>
          </Row>
        </div>
      )
    }
  }
}
