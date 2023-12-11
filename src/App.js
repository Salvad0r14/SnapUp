import './App.scss'
// react router v6
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

// pages
import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
} from './pages/index'
// components
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import store from './store/store'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Employees from './components/Employees/Employees'
import { Provider } from 'react-redux'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const openLoginModal = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }
  const openRegisterModal = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(true)
  }

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
            isLoginModalOpen={isLoginModalOpen}
            isRegisterModalOpen={isRegisterModalOpen}
          />
          <Sidebar />
          <SignIn
            isLoginModalOpen={isLoginModalOpen}
            closeLoginModal={closeLoginModal}
          />
          <SignUp
            isRegisterModalOpen={isRegisterModalOpen}
            closeRegisterModal={closeRegisterModal}
          />
          <Routes>
            {/* home page route */}
            <Route path="/" element={<Home />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path="/category/:category" element={<CategoryProduct />} />
            {/* cart */}
            <Route path="/cart" element={<Cart />} />
            {/* searched products */}
            <Route path="/search/:searchTerm" element={<Search />} />
            {/* searched employees */}
            <Route path="/employees" element={<Employees />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
