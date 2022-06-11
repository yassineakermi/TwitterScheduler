import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import FeedbackList from '../components/FeedbackList'
import FeedbackForm from '../components/FeedbackForm'
import Login from "../pages/Login"
import Filters from "../components/Filters"
import { Pagination } from '@mui/material';
import Card from '../components/shared/Card'
import { useContext,useEffect ,useState} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function Routess() {

  //const[isLoggedIn,setIsLoggedIn] = useState(false)
  const {isLoggedIn,token} = useContext(FeedbackContext)

  



    let mainComponent = token || isLoggedIn() ? (
        <>
        <FeedbackForm />
        <Filters />
        <FeedbackList />
        <div id="snackbar"></div>
      </>) : <Login /> 

  

    return (
        <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              
              path='/'
              element={
                  mainComponent
              }
            ></Route>             
        

            
          </Routes>
        </div>
      </Router>
    )
}

export default Routess
