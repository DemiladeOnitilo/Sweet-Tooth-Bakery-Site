import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import Home from "./pages/Home"
import About from './pages/About'
import Services from './pages/Services'
import NotFoundPage from './pages/NotFoundPage'
import Contact from './pages/Contact'
import Join from './pages/Join'
import MainLayout from './layout/MainLayout'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Category from './pages/Category'


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path='/' element={<MainLayout />}>
        <Route  index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/join' element={<Join />}/>
        <Route path='*' element={<NotFoundPage />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/category/:id' element={<Category />} />
      </Route>
      
    )
  )

  return(
    <div className='w-screen'>
      <RouterProvider router={router} />
    </div>
  )  
}

export default App