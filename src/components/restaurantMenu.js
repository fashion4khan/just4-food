import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import { CDN_URL } from "../utils/constants";
import RestaurantCategory from "./restaurantCategory";
import { DUMMY_MENUS } from "../utils/dummyMenus";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = DUMMY_MENUS[resId]?.data;

  if (!resInfo) return <h1>Menu Not Found</h1>;

  const {
    name,
    cuisines = [],
    costForTwoMessage,
    areaName,
    avgRating,
    totalRatingsString,
  } = resInfo?.cards?.[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="w-full md:w-10/12 lg:w-6/12 m-auto py-10 mt-24 px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold truncate">{name}</h1>

      <div className="m-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-lg font-bold">
          Rating {avgRating} ({totalRatingsString}) - {costForTwoMessage}
        </h3>
        <p className="text-amber-500 text-lg font-bold">
          {cuisines.join(", ")}
        </p>
        <span className="font-bold text-lg">Outlet</span>
        <span> - {areaName}</span>
      </div>

      <div className="flex justify-center my-4">
        <h2 className="text-xl font-semibold">-- MENU --</h2>
      </div>

      {categories.map((category) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
