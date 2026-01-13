// src/services/api.js
import axios from "axios";

const API_BASE_URL = "/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export const getRestaurants = async () => {
  try {
    const { data } = await api.get("/listRestaurants");
    // handle both nesting variants
    const payload = data?.data?.data || data?.data || data;
    const cards = payload?.cards || [];
    const restaurants =
      cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      cards.find(
        (c) =>
          c?.card?.card?.gridElements?.infoWithStyle?.restaurants &&
          Array.isArray(c.card.card.gridElements.infoWithStyle.restaurants)
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      [];
    return restaurants;
  } catch (err) {
    // rethrow so caller can fallback to dummy
    throw err;
  }
};

export const getRestaurantMenu = async (restaurantId) => {
  try {
    const { data } = await api.get(`/listRestaurantMenu/${restaurantId}`);
    return data?.data || data;
  } catch (err) {
    throw err;
  }
};
