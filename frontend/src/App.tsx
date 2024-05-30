import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './components/Home'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
          {/* <Route index element={<Home />}></Route>
          <Route path='signin' element={<SignIn/>}></Route>
          <Route path='signup' element={<SignUp/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='analyzesresult' element={<AnalyzesResult/>}></Route> */}
        </Route>
      </Routes>
  )
}

export default App
