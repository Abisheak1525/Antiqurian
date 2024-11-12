import React, { useState } from 'react';
import './Auction.css';
import image from '../Gallary/Book/Images/Fiction/got.jpg';
import image2 from '../Gallary/Book/Images/Fiction/hobbit.jpg';
import image3 from '../Gallary/Book/Images/Non-Fiction/1984.jpg';
import AuctionModal from './AuctionModal';

export default function Auction() {
  const [selectedItem, setSelectedItem] = useState(null); 

  const auctionItems = [
    {
      image: image,
      name: 'Game Of Thrones',
      author: 'George R.R. Martin',
      user: 'Admin',
      description: 'The first book in the A Song of Ice and Fire series, featuring political intrigue and epic battles in a fantasy world.',
      startBid: '100.00',
      topBid: '150.00'
    },
    {
      image: image2,
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      user: 'Jane Smith',
      description: 'A fantasy novel following Bilbo Baggins on his quest to help dwarves reclaim their homeland.',
      startBid: '120.00',
      topBid: '180.00'
    },
    {
      image: image3,
      name: '1989',
      author: 'Yuval Noah Harari',
      user: 'Admin',
      description: 'A book by Yuval Noah Harari that explores the history of humanity.',
      startBid: '120.00',
      topBid: '180.00'
    }
  ];

  const handleCardClick = (item) => {
    setSelectedItem(item); 
  };

  const handleCloseModal = () => {
    setSelectedItem(null); 
  };

  return (
    <div className="auction-container">
      {auctionItems.map((item, index) => (
        <div
          className="auction-card"
          key={index}
          onClick={() => handleCardClick(item)} 
        >
          <img src={item.image} alt={item.name} className="auction-card-image" />
          <div className="auction-card-content">
            <h3 className="auction-card-title">{item.name}</h3>
            <p className="auction-card-author">Author: {item.author}</p>
            <p className="auction-card-user">User: {item.user}</p>
            <p className="auction-card-description">{item.description}</p>
            <p className="auction-card-start-bid">Starting Bid: {item.startBid}</p>
            <p className="auction-card-top-bid">Top Bid: {item.topBid}</p>
          </div>
        </div>
      ))}

      {selectedItem && (
        <AuctionModal item={selectedItem} onClose={handleCloseModal} /> 
      )}
    </div>
  );
}
