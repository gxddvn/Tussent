import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './components/Home'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import UserWorkSpace from './components/UserWorkSpace'
import WorkSpace from './components/UserWorkSpace/WorkSpace'
import Project from './components/UserWorkSpace/Project'
import Calendar from './components/UserWorkSpace/Calendar'
import { useAppDispatch, useAppSelector } from './components/Hooks'
import React from 'react'
import { fetchAuthMe, selectAuthData } from './store/Slices/auth'
import { fetchWorkspaceMe } from './store/Slices/workspace'
// import User from './components/UserWorkSpace/User'

function App() {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='userworkspace/:id' element={<UserWorkSpace/>}>
            <Route index element={<WorkSpace/>}></Route>
            <Route path='project/:id' element={<Project/>}></Route>
          </Route>
          <Route path='user/:id'>
            <Route path='calendar' element={<Calendar/>}></Route>
          </Route>
        </Route>
      </Routes>
  )
}

export default App
