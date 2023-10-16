import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

// import FindCoordinates from "../components/FindCoordinates";

const Home = () => {
  const [input, setInput] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(input);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      navigate("/search", { state: { searchData: input } });
      setInput({
        pickup: "",
        dropoff: "",
        date: "",
        time: "",
      });
    }
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.pickup) {
      errors.pickup = "Location is required!";
    }
    if (!values.dropoff) {
      errors.dropoff = "Dropoff is required!";
    }
    if (!values.date) {
      errors.date = "Date is required!";
    }
    if (!values.time) {
      errors.time = "Time is required!";
    }

    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input"
            type="text"
            placeholder="Pickup location"
            name="pickup"
            onChange={handleInput}
            value={input.pickup}
          />
          {formErrors.pickup && (
            <p className="text-red-500">{formErrors.pickup}</p>
          )}
          <input
            className="input"
            type="text"
            placeholder="Dropoff location"
            name="dropoff"
            onChange={handleInput}
            value={input.dropoff}
          />
          {formErrors.dropoff && (
            <p className="text-red-500">{formErrors.dropoff}</p>
          )}
          <input
            className="input"
            type="date"
            placeholder="Date"
            name="date"
            onChange={handleInput}
            value={input.date}
          />
          {formErrors.date && <p className="text-red-500">{formErrors.date}</p>}
          <input
            className="input"
            type="time"
            placeholder="Time"
            name="time"
            onChange={handleInput}
            value={input.time}
          />
          {formErrors.time && <p className="text-red-500">{formErrors.time}</p>}
          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Our Offering</h3>
          <div className="mb-4">
            <img
              src={data[currentIndex].image}
              alt={data[currentIndex].name}
              className="w-full h-45 object-cover rounded"
            />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">
              {data[currentIndex].name}
            </h2>
            <p className="text-gray-500">
              Price: ${data[currentIndex].price} per KM
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button className="btn" onClick={prevItem}>
              Back
            </button>
            <button className="btn" onClick={nextItem}>
              Next
            </button>
            {/* <FindCoordinates data={input} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
