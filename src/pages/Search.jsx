import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import data from "../data.json";
import Find_cordinates from "../components/Find_cordinates";
import { geocode } from "opencage-api-client";
import * as geolib from "geolib";
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [travelDistance, setTravelDistance] = useState(0);
  // const [array, setArray] = useState(data);
  const searchData = location.state.searchData;
  // console.log(location.state.searchData);
  const location1 = location.state.searchData.pickup;
  const location2 = location.state.searchData.dropoff;
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All" ? data : data.filter((item) => item.name === filter);

  const calculateDistance = async () => {
    try {
      const response1 = await geocode({
        q: location1,
        key: "95fd772c089446228e9a266ae42c80b5",
      });
      const response2 = await geocode({
        q: location2,
        key: "95fd772c089446228e9a266ae42c80b5",
      });

      const coords1 = response1.results[0].geometry;
      const coords2 = response2.results[0].geometry;

      const distance = getDistance(coords1, coords2);
      // console.log(distance);
      setTravelDistance(distance / 1000);
      // setTravelDistance(parseFloat((distance / 1000).toFixed(2)));
      // console.log(
      //   `Distance between ${location1} and ${location2}: ${distance / 1000} km`
      // );
    } catch (error) {
      console.error("Error geocoding locations:", error.message);
    }
  };
  const getDistance = (coord1, coord2) => {
    // Calculate distance using your preferred method (e.g., Haversine formula)
    // For simplicity, I'll use geolib's getDistance here.
    return geolib.getDistance(coord1, coord2);
  };
  useState(() => {
    calculateDistance();
  }, []);
  // console.log(travelDistance);
  const handleOnclick = (itemName, itemPrice) => {
    let data = { ...searchData, name: itemName, price: itemPrice };
    // console.log(data);
    navigate("/booking", {
      state: data,
    });
    // You can perform additional actions based on the clicked item's data
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">
        {travelDistance} KM Distance
      </h1>
      <h1 className="text-3xl font-semibold mb-4">Search Results</h1>

      {/* Filter UI */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 text-lg">
          Filter by Name:
        </label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All</option>
          <option value="Economy">Economy</option>
          <option value="Premium">Premium</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>

      {/* Display filtered data in a styled list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item, index) => (
          <li
            key={index}
            className="border p-4 rounded-md shadow-md"
            onClick={() =>
              handleOnclick(item.name, item.price * travelDistance)
            }
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600">
              Price: ${(item.price * travelDistance).toFixed(2)}
            </p>
            <img
              src={item.image}
              alt={item.name}
              className="mt-4 mx-auto max-w-full h-32 object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
