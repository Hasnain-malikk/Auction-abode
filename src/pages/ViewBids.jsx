import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ViewBids = ({ property }) => {
  const [bids, setBids] = useState([
    { id: 1, bidder: "JohnDoe", amount: 2000, time: "2025-02-01T10:30:00" },
    { id: 2, bidder: "JaneSmith", amount: 1800, time: "2025-02-01T14:00:00" },
  ]);
  console.log(property)
  const [timeLeft, setTimeLeft] = useState(3600);  

  const calculateTimeElapsed = (time) => {
    const currentTime = new Date();
    const bidTime = new Date(time);
    const timeDiff = currentTime - bidTime;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes ago`;
  };

  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(countdownInterval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(countdownInterval); 
  }, []);

  const highestBid = Math.max(...bids.map((bid) => bid.amount));
  const bidProgress = (highestBid / 5000) * 100;  

  return (
    <div className="container mt-4">
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        View Bids on {property.title}
      </motion.h2>


      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
          
            <div id={`carousell${property._id}`} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {property.images.length > 0 ? (
                  property.images.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <img
                        src={'http://localhost:4646/'+image}
                        className="d-block w-100"
                        alt={`Property ${index}`}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      className="d-block w-100"
                      alt="No Image"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
         
              {property.images.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target={`#carousell${property._id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#carousell${property._id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </>
              )}
            </div>


          </div>
        </div>
        <div className="col-md-6">
          <h4>{property.title}</h4>
          <p>{property.overview}</p>
          <p>Auction Status: <strong>Active</strong></p>
          <p className="text-muted">Start Time: {new Date(property.startBiddingTime).toLocaleString()}</p>
          <p className="text-muted">End Time: {new Date(property.endBiddingTime).toLocaleString()}</p>
        </div>
      </div>


      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Current Highest Bid: {Number(property.startingBid)+highestBid} PKR</h5>
        </div>
        <div className="col-md-6">
          <h5>Time Left: {formatCountdown(timeLeft)}</h5>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="bidFilter">Filter Bids by:</label>
        <select id="bidFilter" className="form-select">
          <option value="bidder">Bidder</option>
          <option value="amount">Amount</option>
          <option value="time">Time</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bidder</th>
              <th>Bid Amount</th>
              <th>Time of Bid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <tr key={bid.id}>
                  <td>{bid.bidder}</td>
                  <td>{bid.amount} PKR</td>
                  <td>{calculateTimeElapsed(bid.time)}</td>
                  <td>
                    <motion.button
                      className="btn btn-info btn-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No bids placed yet on this property.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p>Bid Progress:</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${bidProgress}%` }}
            aria-valuenow={bidProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <div className="alert alert-info mb-4">
        Latest Bid: {highestBid} PKR placed by {bids.find((bid) => bid.amount === highestBid)?.bidder}
      </div>

    </div>
  );
};

export default ViewBids;
