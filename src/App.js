import { FeedbackProvider } from './context/FeedbackContext'
import Routess from './pages/Routess'
function App() {
  
  return (
    <FeedbackProvider >
      <Routess />
    </FeedbackProvider>
  )
}

export default App
