import React from 'react'

const StepVideoThread = ({moveToIndex, scrolDex}) => {
  return (
    <>
        <div className='step-video-thread-button non-select'>
            <div onClick={() => {moveToIndex(scrolDex - 1)}}>
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 15L12 10L7 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div onClick={() => {moveToIndex(scrolDex + 1)}}>
            <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 15L12 10L7 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    </>
  )
}

export default StepVideoThread
