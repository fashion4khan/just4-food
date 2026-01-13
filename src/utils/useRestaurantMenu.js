import { useState, useEffect, use } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      console.log(typeof resId);
      console.log(MENU_API + resId);
      const api = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.0446714&lng=73.2910579&restaurantId=8138";
      const apidata = await fetch(api);
      console.log(apidata);
      const data = await fetch(MENU_API + resId);
      console.log(data);

      if (!data.ok) {
        throw new Error("Network response was not ok: " + data.status);
      }

      const text = await data.text();
      const json = text ? JSON.parse(text) : {};

      console.log(json);
      setResInfo(json.data || {});
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  return resInfo;
};

export default useRestaurantMenu;
