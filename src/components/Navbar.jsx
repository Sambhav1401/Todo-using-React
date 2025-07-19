import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-indigo-800 text-white justify-between flex p-2 items-center'>
        <div className='font-bold text-4xl'>iTask</div>
        
<ul className='flex  items-center gap-10 mr-5'>
    <li className='hover:cursor-pointer hover:font-bold'>Home</li>
    <li className='hover:cursor-pointer hover:font-bold'>Your Tasks</li>
</ul>

    </div>
  )
}

export default Navbar
