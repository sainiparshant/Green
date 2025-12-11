import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPlantPage from './pages/admin/AdminPlantPage'
import AdminLogin from './pages/admin/AdminLogin'
import AddPlant from './pages/admin/AddPlant'


const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route path='/admin/login' element={<AdminLogin/>}/>

      <Route path='/admin' element={<AdminLayout/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/plants' element={<AdminPlantPage/>}/>
          <Route path='/admin/plants/add-plant' element={<AddPlant/>}/>

      </Route>

    </Routes>
    </>
  )
}

export default App