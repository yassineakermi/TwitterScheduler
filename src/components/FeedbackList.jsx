import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
  const { feedback, isLoading,fetchFeedback,previousLink,nextLink} = useContext(FeedbackContext)
  console.log(feedback);
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }

const styles = {
  cursor:'pointer',
  padding:'1rem',
  backgroundColor:'#444',
  borderRadius:'10px'
}

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
      <Card>
        <div className='pagination-buttons'> 
        <Button onClick={(e)=>{fetchFeedback(1,null,null,previousLink);console.log(previousLink);}} isDisabled={previousLink == null}> { '< Previous'}</Button>
        <Button onClick={(e)=>{fetchFeedback(1,null,null,nextLink);console.log(nextLink);}} isDisabled={nextLink == null}>{'Next >'} </Button>
        </div>
      </Card>
    </div>
  )

}

export default FeedbackList
