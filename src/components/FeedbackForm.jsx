import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'
import Filters from "./Filters"
function FeedbackForm() {
  const [text, setText] = useState('')
  const [media, setMedia] = useState(null)
  const [postTime, setPostTime] = useState()
  const [category, setCategory] = useState('Football')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [textMessage, setTextMessage] = useState('')
  const [dateMessage, setdateMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback,filters } =
    useContext(FeedbackContext)


  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.content)
      setCategory(feedbackEdit.item.topic)
      setPostTime(feedbackEdit.item.postTime.replace(':00Z',''))
    
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (text === '' || text.length == 0) {
      setBtnDisabled(true)
      setTextMessage(null)
    } else if (text !== '' && text.length > 256) {
      setTextMessage('Tweet content must be less or equal than 256 characters')
      setBtnDisabled(true)
    } else {
      setTextMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleDateChange = (e)=>{
    let posttime = new Date(e.target.value).getTime();
    if (posttime > Date.now()){
      setPostTime(e.target.value)
      setdateMessage("")
    }
    else
      setdateMessage('Posting date should be in the future!')
    
  }

  const handleMediaChange = (event)=>{
    setMedia(event.target.files[0])
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(media);
    if (text.length > 0 && text.length <= 256 && category && postTime ) {
      const newFeedback = {
        text,
        category,
        postTime,
        media
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
    else {
      if(!postTime){
      setdateMessage("This field cannot be empty")
    }else
      setTextMessage("This field cannot be empty")
    }
    
  }

  return (
    <Card>
      <h2>Add A New Tweet</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <textarea
            onChange={handleTextChange}
            placeholder='Enter the tweet text'
            value={text}
            cols={50}
            rows={10}
          />

          <span className={text.length > 256  ? "counter danger" : "counter"} >{text.length}</span>
        </div>
        {textMessage && <div className='message'>{textMessage}</div>}
    
        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
          {
            filters.slice(1).map(val=>{
              return <option value={val.label} key={val.id} >{val.label}</option>
            })
          }
        </select>

        <div className='input-group'>
          <input type="datetime-local" value={postTime} onChange={handleDateChange} />
        </div>
        {dateMessage && <div className='message'>{dateMessage}</div>}


      <div className='input-group'>
                <label htmlFor="filePicker" style={{ background:"grey", padding:"5px 10px" }} />    
                <input
                id="filePicker"
                  onChange={handleMediaChange}
                  type='file'
                  placeholder='Upload A media (optional)' 
                  
                />
      </div>

      <Button type='submit' isDisabled={btnDisabled}>
            Send
      </Button>

      </form>

    </Card>
  )
}

export default FeedbackForm
