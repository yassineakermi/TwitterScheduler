import PropTypes from 'prop-types'
import FeedbackContext from '../context/FeedbackContext'
import {useContext} from 'react'
function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  const { logout,token,isLoggedIn } = useContext(FeedbackContext)
  console.log(token)
    return (
    <header style={headerStyles}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
      {token  && 
      <span onClick={logout} style={{
          padding:'1rem',
          cursor:'pointer'
        }}>Logout</span>
      }

    </header>
  )
}

Header.defaultProps = {
  text: 'Twitter Tweets Planner',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95',
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default Header
