import React, { useState, useEffect } from 'react';
import './AuctionModal.css';

export default function AuctionModal({ item, onClose }) {
  const [activeTab, setActiveTab] = useState('description');
  const [remainingTime, setRemainingTime] = useState('2 - Days.');
  const [recentBids, setRecentBids] = useState([
    { user: 'Alice', amount: '150.00' },
    { user: 'Bob', amount: '145.00' }
  ]);
  const [newBid, setNewBid] = useState('');
  const [topBid, setTopBid] = useState(item.topBid || '0.00');

  useEffect(() => {
    if (item.endTime) {
      const calculateRemainingTime = () => {
        const endTime = new Date(item.endTime); // Replace with dynamic endTime from MySQL
        const now = new Date();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
          setRemainingTime('Auction Ended');
        } else {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          setRemainingTime(`${hours}h ${minutes}m`);
        }
      };

      calculateRemainingTime();
      const interval = setInterval(calculateRemainingTime, 60000); 

      return () => clearInterval(interval);
    }
  }, [item.endTime]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBidSubmit = () => {
    if (newBid) {
      const newBidAmount = parseFloat(newBid);
      const topBidAmount = parseFloat(topBid);
  
      // Check if the new bid is higher than the current top bid
      if (newBidAmount > topBidAmount) {
        // Update the top bid and add the new bid to recent bids
        setTopBid(newBidAmount.toFixed(2));
        setRecentBids([{ user: 'You', amount: newBidAmount.toFixed(2) }, ...recentBids]);
        setNewBid('');
      } else {
        // Display an alert if the bid is not higher
        alert('Your bid must be higher than the current top bid.');
      }
    }
  };
  

  if (!item) return null;

  return (
    <div className="auction-modal-overlay" onClick={onClose}>
      <div className="auction-modal" onClick={(e) => e.stopPropagation()}>
        <span className="auction-modal-close" onClick={onClose}>&times;</span>
        <div className="auction-modal-tabs">
          <button
            className={`auction-modal-tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            Description
          </button>
          <button
            className={`auction-modal-tab ${activeTab === 'bid' ? 'active' : ''}`}
            onClick={() => handleTabClick('bid')}
          >
            Bid
          </button>
        </div>
        <div className="auction-modal-content">
          <img src={item.image} alt={item.name} className="auction-modal-image" />

          {activeTab === 'description' && (
            <div className="auction-modal-details">
              <h3 className="auction-modal-title">{item.name}</h3>
              <p className="auction-modal-author">Author: {item.author}</p>
              <p className="auction-modal-user">User: {item.user}</p>
              <p className="auction-modal-description">{item.description}</p>
              <p className="auction-modal-bid">Start Bid: {item.startBid}</p>
            </div>
          )}

          {activeTab === 'bid' && (
            <div className="auction-modal-bid">
              <h3 className="auction-modal-title">{item.name}</h3>
              <p className="auction-modal-remaining-time">Remaining Time: {remainingTime}</p>
              <p className="auction-modal-top-bid">Top Bid: {topBid}</p>
              <input
                type="number"
                placeholder="Enter your bid"
                className="bid-input"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
              />
              <button className="bid-submit-btn" onClick={handleBidSubmit}>Place Bid</button>
              <h4>Recent Bids</h4>
              <div className="auction-modal-recent-bids">
                <ul >
                  {recentBids.map((bid, index) => (
                    <li key={index}>
                      {bid.user}: {bid.amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
