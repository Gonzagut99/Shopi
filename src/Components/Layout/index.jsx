import React from 'react'

const Layout = ({children}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className='flex flex-col items-center flex-grow mt-20'>{children} </div>
    </div>
  );
}

export default Layout