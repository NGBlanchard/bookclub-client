import React from 'react'
import Loader from 'react-loader-spinner';
import './Loading.css'

export default function Loading() {
  return (
    <div className="loader">
      Loading...
      <Loader 
        color="rgba(203, 80, 255, 0.735)"
        type="Rings"
      />
    </div>
  )
}
