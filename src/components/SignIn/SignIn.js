// SignUp.js

import React, { useState } from 'react'
import './SignIn.scss'

const SignIn = ({ isLoginModalOpen, closeLoginModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      alert('Please enter both email and password')
      return
    }

    // Retrieve user data from local storage based on the email
    const users = Object.keys(localStorage)
      .filter((key) => key.startsWith('user_'))
      .map((key) => JSON.parse(localStorage.getItem(key)))

    const user = users.find((user) => user.email === email)

    if (!user) {
      alert('User not found. Please check your email or register.')
      return
    }

    // Check the password (Note: For security reasons, you should compare hashed passwords)
    if (user.password !== password) {
      alert('Incorrect password. Please try again.')
      return
    }

    // Successful login
    alert('Login successful!')
    // Add any logic you need after a successful login
    localStorage.setItem(`LoggedIn`, JSON.stringify(user))
    //Closing Modal
    closeLoginModal()
    // Clear the form fields
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div
        className={`custom-modal ${isLoginModalOpen ? 'show' : ''}`}
        id="modalLoginForm"
      >
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header text-center">
              <h4 className="custom-modal-title font-weight-bold">Sign in</h4>
              <button
                type="button"
                className="custom-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeLoginModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="custom-modal-body mx-3">
              <div className="custom-md-form mb-5">
                <i className="custom-icon-envelope prefix grey-text"></i>
                <input
                  type="email"
                  className="custom-form-control validate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="defaultForm-email"
                >
                  Your email
                </label>
              </div>

              <div className="custom-md-form mb-4">
                <i className="custom-icon-lock prefix grey-text"></i>
                <input
                  type="password"
                  className="custom-form-control validate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="defaultForm-pass"
                >
                  Your password
                </label>
              </div>
            </div>
            <div className="custom-modal-footer d-flex justify-content-center">
              <button className="custom-btn-default" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
