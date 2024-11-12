import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';
import { useNavigate } from 'react-router-dom';

export default function AddBook({ onClose }) {
  const [showMessage, setShowMessage] = useState('');
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    condition: '',
    userPrize: '',
    image: null  // Dummy field for image
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setBookDetails({ ...bookDetails, image: e.target.files[0] });
  };

  const validateForm = () => {
    return bookDetails.title && bookDetails.author && bookDetails.price;
  };

  const handleSaveClick = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      title: bookDetails.title,
      author: bookDetails.author,
      price: bookDetails.price,
      userModel: { email: "user@gmail.com" }
    };

    axios.post('http://localhost:9001/addBook', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setShowMessage('Book added successfully!');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    })
    .catch(error => {
      console.error('There was an error adding the book!', error);
      setShowMessage('Failed to add book. Please try again.');
    });
  };

  const handleCancelClick = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(0);
    }
  };

  return (
    <div className="addbook-all">
      <div className="addbook-container">
        <span className="profile-close" onClick={handleCancelClick}>&times;</span>
        <div className="addbook-header">
          <h2>Book Details</h2>
        </div>
        <div className="addbook-form">
          <div className="addbook-left">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={bookDetails.title}
              onChange={handleInputChange}
            />
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={bookDetails.author}
              onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={bookDetails.price}
              onChange={handleInputChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={bookDetails.description}
              onChange={handleInputChange}
            />
            
            
            
          </div>

          {/* Right section for additional content (e.g., dummy image upload) */}
          <div className="addbook-right">
          <label>Condition:</label>
            <input
              type="text"
              name="condition"
              value={bookDetails.condition}
              onChange={handleInputChange}
            />

          <label>User Price:</label>
            <input
              type="text"
              name="userPrize"
              value={bookDetails.userPrize}
              onChange={handleInputChange}
            />
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="addbook-buttons">
          <button className="addbook-upload-button" onClick={handleSaveClick}>Upload</button>
          <button className="addbook-cancel-button" onClick={handleCancelClick}>Cancel</button>
        </div>
        {showMessage && <div className="addbook-message">{showMessage}</div>}
      </div>
    </div>
  );
}
