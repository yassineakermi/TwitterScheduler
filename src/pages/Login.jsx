import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import FeedbackContext from '../context/FeedbackContext'
import {useState,useContext} from 'react'
function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message,setMessage] = useState("")
    const { login } = useContext(FeedbackContext)
    const onSubmitHandler = (e)=>{
        e.preventDefault()
        login(username,password)
    }

    return (
        <Card>
    <form onSubmit={onSubmitHandler}>

        <div className='login'>
          <h2>Login</h2>
          <br />
          <div className='input-group'>
          <input type="text" onChange={e => setUsername(e.target.value)} placeholder='Username' required/>
          </div>
          <br />
          <div className='input-group'>
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' required/>
          </div>
        </div>
        <Button type='submit'>
            Login
      </Button>

        </form>
      </Card>
      )
}

export default Login
