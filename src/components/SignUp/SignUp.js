// SignUp.js

import React, { useState } from 'react'
import './SignUp.scss'

const SignUp = ({ isRegisterModalOpen, closeRegisterModal }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    // Validation
    if (username.length < 5) {
      alert('Username should be at least 5 characters long')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    // Password strength check (e.g., at least 8 characters)
    if (password.length < 8) {
      alert('Password should be at least 8 characters long')
      return
    }

    // Generate a unique ID (you may use a library for this purpose)
    const uniqueId = Date.now()

    // Save the user data to local storage
    const user = {
      id: uniqueId,
      username,
      email,
      password, // Note: For security reasons, you should hash the password before storing it
    }
    localStorage.setItem(`user_${uniqueId}`, JSON.stringify(user))

    // Close modal if registration is successful
    alert('Registration successful!')
    // Add closeModal function here if you have it
    closeRegisterModal()
    //Auto Login
    localStorage.setItem(`LoggedIn`, JSON.stringify(user))
    // Clear the form fields
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div
        className={`custom-modal ${isRegisterModalOpen ? 'show' : ''}`}
        id="modalLoginForm"
      >
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header text-center">
              <h4 className="custom-modal-title font-weight-bold">Register</h4>
              <button
                type="button"
                className="custom-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeRegisterModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="custom-modal-body mx-3">
              <div className="custom-md-form mb-5">
                <i className="custom-icon-envelope prefix grey-text"></i>
                <input
                  type="text"
                  className="custom-form-control validate"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="defaultForm-email"
                >
                  Your Username
                </label>
              </div>
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
              <button className="custom-btn-default" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
