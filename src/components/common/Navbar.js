import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = { active: false }

    this.logout = this.logout.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  logout() {
    localStorage.removeItem('basket')
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleActive() {
    this.setState({ active: !this.state.active })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ active: false })
    }

  }

  render() {
    return (
      <nav className="navbar is-dark">
        <div className="container">

          <div className="navbar-brand">
            {/* Branding and burger menu */}
            <Link to="/" className="navbar-item display is-size-4">Nerd Crate</Link>

            <a
              role="button"
              className={`navbar-burger${this.state.active ? ' is-active' : ''}`}
              onClick={this.toggleActive}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu${this.state.active ? ' is-active' : ''}`}>
            {/* Everything else */}

            <div className="navbar-start">
              {/* Left-hand links */}
              {Auth.isAuthenticated() && <Link to="/mycrates" className="navbar-item">Profile</Link>}
              <Link to="/premade" className="navbar-item">View boxes</Link>
            </div>

            <div className="navbar-end">
              {/* Right-hand links */}
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
              <figure id="cart" className="image">
                <Link to={'/basket'} className="button is-link is-outlined is-large">
                  <img src="../images/Basket.png" />
                </Link>
              </figure>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

// `withRouter` gives the Navbar `history` via props
export default withRouter(Navbar)
