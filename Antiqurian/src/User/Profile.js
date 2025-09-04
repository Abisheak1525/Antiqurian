import React, { useState, useRef } from 'react';
import './Profile.css';
import icon from '../Home/Header/user.png';

export default function Profile({ onClose }) {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, City',
    phone: '9876543210',
    password: ''
  });
  const [currentSection, setCurrentSection] = useState('editProfile');

  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    alert('Changes canceled');
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    alert('Profile updated (frontend only)');
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        <span className="profile-close" onClick={onClose}>&times;</span>
        <div className="profile-page">
          <div className="profile-container">
            <div className="profile-form">
              <div className="profile-photo-section">
                <div className="additional-sections">
                  <div className={`section ${currentSection === 'editProfile' ? 'active-section' : ''}`}>
                    <button onClick={() => handleSectionClick('editProfile')}>Edit Profile</button>
                  </div>
                  <div className={`section ${currentSection === 'booksAdded' ? 'active-section' : ''}`}>
                    <button onClick={() => handleSectionClick('booksAdded')}>Books added</button>
                  </div>
                  <div className={`section ${currentSection === 'booksInAuction' ? 'active-section' : ''}`}>
                    <button onClick={() => handleSectionClick('booksInAuction')}>Books in auction</button>
                  </div>
                  <div className={`section ${currentSection === 'notifications' ? 'active-section' : ''}`}>
                    <button onClick={() => handleSectionClick('notifications')}>Notifications</button>
                  </div>
                </div>
              </div>
              {currentSection === 'editProfile' && (
                <div className="profile-details-section">
                  <div className="profile-pg-edit-pfp">
                    <img src={icon} alt="Profile" className="profile-photo" />
                    {isEditable && (
                      <div>
                        <button className="change-photo-button" onClick={handleChangePhoto}>CHANGE PHOTO</button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      </div>
                    )}                  
                  </div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label>Mobile Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <div className="profile-buttons">
                    {isEditable ? (
                      <>
                        <button className="op-cancel-button" onClick={handleCancelClick}>Cancel</button>
                        <button className="op-save-button" onClick={handleSaveClick}>Save</button>
                      </>
                    ) : (
                      <button className="op-edit-button" onClick={handleEditClick}>Edit</button>
                    )}
                  </div>
                </div>
              )}
              {currentSection === 'booksAdded' && (
                <div className="books-added-section">
                  <h3>Books added</h3>
                  <p>Information about books added will be displayed here.</p>
                </div>
              )}
              {currentSection === 'booksInAuction' && (
                <div className="books-in-auction-section">
                  <h3>Books in auction</h3>
                  <p>Information about books in auction will be displayed here.</p>
                </div>
              )}
              {currentSection === 'notifications' && (
                <div className="profile-notifications-section">
                  <h3>Notifications</h3>
                  <p>Information will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
