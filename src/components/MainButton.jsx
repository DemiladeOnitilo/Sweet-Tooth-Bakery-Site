import React from 'react'
import { Link } from 'react-router-dom'

const MainButton = (props) => {

    function refreshPage(){ 
      window.scrollTo({ top: 0, behavior: 'smooth' });    
    }

  return (
    <div className='bg-black p-[15px] text-xl rounded-[10px] hover:bg-gray-700 text-pink-200 cursor-pointer'>
        <Link onClick={refreshPage} to={props.link}>
            <p>{props.name}</p>
        </Link>
    </div>
  )
}

export default MainButton