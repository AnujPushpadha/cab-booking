import { geocode } from "opencage-api-client";
import * as geolib from "geolib";

const key = import.meta.env.VITE_OPENCAGE_API_KEY;
export const calculateDistance = async (location1, location2) => {
  try {
    const response1 = await geocode({
      q: location1,
      key: key,
    });
    const response2 = await geocode({
      q: location2,
      key: key,
    });

    const coords1 = response1.results[0].geometry;
    const coords2 = response2.results[0].geometry;

    const distance = getDistance(coords1, coords2);
    return distance / 1000;
  } catch (error) {
    console.error("Error geocoding locations:", error.message);
    return 0; // Handle error gracefully, return a default value
  }
};

export const getDistance = (coord1, coord2) => {
  return geolib.getDistance(coord1, coord2);
};
