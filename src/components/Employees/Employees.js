import React, { useState, useEffect } from 'react'
import './Employees.scss'

const Employees = () => {
  // Local storage key
  const localStorageKey = 'employeeData'

  // State for managing employee data
  const [employeeData, setEmployeeData] = useState([])
  // State to manage whether the form fields are editable or not
  const [isEditable, setIsEditable] = useState(false)

  // State for managing form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    salary: '',
  })

  // Effect to load data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(localStorageKey)) || []
    setEmployeeData(storedData)
  }, [])

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if any form field is empty
    if (
      !formData.id ||
      !formData.name ||
      !formData.designation ||
      !formData.salary
    ) {
      alert('Please fill in all fields before submitting.')
      return
    }

    setIsEditable(false)

    // Check if the ID already exists, then update, otherwise add new
    const existingIndex = employeeData.findIndex(
      (emp) => emp.id === formData.id
    )
    if (existingIndex !== -1) {
      const updatedData = [...employeeData]
      updatedData[existingIndex] = formData
      setEmployeeData(updatedData)
    } else {
      setEmployeeData([...employeeData, { ...formData }])
    }

    // Clear the form data
    setFormData({ id: '', name: '', designation: '', salary: '' })

    // Save data to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(employeeData))
  }

  // Function to handle delete button click
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee's data?"
    )

    if (!isConfirmed) {
      return // Do nothing if the user cancels the deletion
    }
    const updatedData = employeeData.filter((emp) => emp.id !== id)
    setEmployeeData(updatedData)

    // Save updated data to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(updatedData))
  }

  // Function to handle edit button click
  const handleEdit = (employee) => {
    setFormData(employee)
    setIsEditable(true)
  }

  return (
    <div className="employee-management-container">
      {/* Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={formData.id}
            onChange={handleInputChange}
            readOnly={isEditable}
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            value={formData.designation}
            onChange={handleInputChange}
          />

          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />

          {/* Submit button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.salary}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employees
