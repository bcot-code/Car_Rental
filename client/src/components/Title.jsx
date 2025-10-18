import React from 'react'

const Title = ({title1, title2, titleStyles, title2Styles, paraStyles, para}) => {
  return (
    <div className={titleStyles}>
        <h4 className='text-blue-400 text-center'>{title1}</h4>
        <div className='flex flex-col items-center'>
            <h1 className={`${title2Styles} capitalize text-center`}>{title2}</h1>
            <p className={`${paraStyles} max-w-lg text-center`}>
              {para ? para : ``}
            </p>
        </div>
    </div>
  )
}

export default Title