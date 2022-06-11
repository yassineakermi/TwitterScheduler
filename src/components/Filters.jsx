import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import Card from "./shared/Card"
import Button from './shared/Button'
function Filters() {
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
 const [categoryChecked, setCategoryChecked] = useState(0)
 const [statusChecked, setStatusChecked] = useState(0)
  const { filters,fetchFeedback} = useContext(FeedbackContext)

  const handleCategoryFilterChange = (e,index) => {
    if(e.currentTarget.value === 'All')
      setCategoryFilter(null)
    else
      setCategoryFilter(e.currentTarget.value)
    setCategoryChecked(index)
  }

  const handleStatusFilterChange = (e,index) =>{
    if(e.currentTarget.value === 'All')
      setStatusFilter(null)
    else if (e.currentTarget.value==='pending')
      setStatusFilter(false)
    else
      setStatusFilter(true)
    
    setStatusChecked(index)
  }

  const onSubmitHandler = (e)=>{
    e.preventDefault()
    
    console.log(categoryFilter,statusFilter);
    fetchFeedback(1,categoryFilter,statusFilter)

  }


  return (
    <form onSubmit={onSubmitHandler}>
    <Card>
      <h3>Categories filter</h3>
    <div className="radio">
      {filters.map((val,index)=>{
              return (
                <input key={val.id} onClick={(e)=>handleCategoryFilterChange(e,index)} label={val.label} type="radio"  name="category_filter" value={val.label} checked={categoryChecked === index} />
              )
      })
    }
    </div>
    <br />
    <h3>Status filter</h3>
    <div className="radio">
    <input key="all" onClick={(e)=>handleStatusFilterChange(e,0)} label="All" type="radio"  name="status_filter" value="All" checked={statusChecked === 0} />
    <input key="published" onClick={(e)=>handleStatusFilterChange(e,1)} label="Published" type="radio"  name="status_filter" value="published" checked={statusChecked === 1}  />
    <input key="pending" onClick={(e)=>handleStatusFilterChange(e,2)} label="Pending" type="radio"  name="status_filter" value="pending" checked={statusChecked === 2} />
    
    
    </div>
    <br />
    <Button type='submit'>
            Filter
      </Button>

    </Card>
    </form>
  )
}

export default Filters
