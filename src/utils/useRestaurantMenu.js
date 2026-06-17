// import { useState, useEffect, use } from "react";
// import { MENU_API } from "./constants";

// const useRestaurantMenu = (resId) => {
//   const [resInfo, setResInfo] = useState(null);

//   useEffect(() => {
//     getRestaurantInfo();
//   }, []);

//   async function getRestaurantInfo() {
//     try {
//       console.log(typeof resId);
//       console.log(MENU_API + resId);
//       const api = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.0446714&lng=73.2910579&restaurantId=8138";
//       const apidata = await fetch(api);
//       console.log(apidata);
//       const data = await fetch(MENU_API + resId);
//       console.log(data);

//       if (!data.ok) {
//         throw new Error("Network response was not ok: " + data.status);
//       }

//       const text = await data.text();
//       const json = text ? JSON.parse(text) : {};

//       console.log(json);
//       setResInfo(json.data || {});
//     } catch (error) {
//       console.error("Error fetching restaurant info:", error);
//     }
//   }

//   return resInfo;
// };

// export default useRestaurantMenu;
import { useState, useEffect } from "react";
import { MENU_API } from "./constants";
import { DUMMY_MENUS } from "./dummyMenus";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resId) return;
    getRestaurantInfo();
  }, [resId]);

  async function getRestaurantInfo() {
    setLoading(true);
    setError(null);

    // 1. Try dummy data first (for offline / dev use)
    if (DUMMY_MENUS?.[resId]) {
      setResInfo(DUMMY_MENUS[resId].data);
      setLoading(false);
      return;
    }

    // 2. Fall back to live API
    try {
      const response = await fetch(MENU_API + resId);

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const text = await response.text();
      if (!text) throw new Error("Empty response from server");

      const json = JSON.parse(text);
      setResInfo(json?.data || null);
    } catch (err) {
      console.error("Failed to fetch restaurant menu:", err.message);
      setError(err.message);
      setResInfo(null);
    } finally {
      setLoading(false);
    }
  }

  return { resInfo, loading, error };
};

export default useRestaurantMenu;