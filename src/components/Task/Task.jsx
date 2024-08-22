import React from 'react'
import { NavLink } from 'react-router-dom';

const Task = () => {
  return (
    <div className='bg-white'>
      {/* Top Navbar */}
      <nav className="bg-white p-4 flex space-x-4">
        <NavLink 
          to="/task" 
          className={({ isActive }) => 
            isActive 
            ? "text-navy font-bold bg-lightblue py-2 px-4 rounded" 
            : "text-gray-500 font-bold py-2 px-4 rounded hover:text-navy"
          }
        >
          Tasks
        </NavLink>
        <NavLink 
          to="/friends" 
          className={({ isActive }) => 
            isActive 
            ? "text-navy font-bold bg-lightblue py-2 px-4 rounded" 
            : "text-gray-500 font-bold py-2 px-4 rounded hover:text-navy"
          }
        >
          Friends
        </NavLink>
      </nav>

      {/* Task Page Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Task Page</h1>
        {/* Add your Task page content here */}
      </div>
    </div>
  )
}

export default Task