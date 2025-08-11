<<<<<<< HEAD
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

=======
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

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default ViewAll