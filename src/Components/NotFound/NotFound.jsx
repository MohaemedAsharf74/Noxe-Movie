import React from 'react'
import error from '../../Assets/404.png'

export default function NotFound() {
  return <>
  <div className='d-flex w-100'>
      <img  className="NotFound w-75" src={error} alt="img" />
    </div>
  </>
}
