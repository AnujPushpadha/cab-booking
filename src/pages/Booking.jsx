import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [isRideBooked, setRideBooked] = useState(false);
  const handleBookRide = () => {
    // You can add your booking logic here
    // For simplicity, just set a state to indicate the ride is booked
    setRideBooked(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Booking Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Name */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Name:</label>
          <p>{bookingData.name}</p>
        </div>

        {/* Pickup Location */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Pickup Location:</label>
          <p>{bookingData.pickup}</p>
        </div>

        {/* Dropoff Location */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Dropoff Location:</label>
          <p>{bookingData.dropoff}</p>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Date:</label>
          <p>{bookingData.date}</p>
        </div>

        {/* Time */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Time:</label>
          <p>{bookingData.time}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Price:</label>
          <p>${bookingData.price.toFixed(2)}</p>
        </div>
        <div className="col-span-2">
          <button
            onClick={handleBookRide}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Book Ride
          </button>
        </div>

        {/* Ride Booked Message */}
        {isRideBooked && (
          <div className="col-span-3 mt-4">
            <p className="text-green-600 font-semibold">
              Ride booked successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
