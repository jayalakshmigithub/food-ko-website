import React from 'react'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Dashboard from '../Components/Dashboard/Dashboard';




const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProSidebarProvider><Dashboard/></ProSidebarProvider>}/>
      </Routes>
    </div>
  )
}

export default UserRoutes
