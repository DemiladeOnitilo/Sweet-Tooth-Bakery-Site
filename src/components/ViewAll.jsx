import React from 'react'
import { Link } from 'react-router-dom'

const ViewAll = (props) => {

    function refreshPage(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  return (
    <div>
        <Link to={props.to} onClick={refreshPage}>
         <h1 className='text-2xl border-b-1 hover:text-gray-400 text-center'>View All</h1>
        </Link>
       
    </div>
  )
}

export default ViewAll