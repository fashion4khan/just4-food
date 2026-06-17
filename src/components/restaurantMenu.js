// import { useParams } from "react-router-dom";
// import Shimmer from "./shimmer";
// import { CDN_URL } from "../utils/constants";
// import RestaurantCategory from "./restaurantCategory";
// import { DUMMY_MENUS } from "../utils/dummyMenus";

// const RestaurantMenu = () => {
//   const { resId } = useParams();

//   const resInfo = DUMMY_MENUS[resId]?.data;

//   if (!resInfo) return <h1>Menu Not Found</h1>;

//   const {
//     name,
//     cuisines = [],
//     costForTwoMessage,
//     areaName,
//     avgRating,
//     totalRatingsString,
//   } = resInfo?.cards?.[2]?.card?.card?.info || {};

//   const categories =
//     resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
//       (c) =>
//         c?.card?.card?.["@type"] ===
//         "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//     ) || [];

//   return (
//     <div className="w-full md:w-10/12 lg:w-6/12 m-auto py-10 mt-24 px-4 md:px-0">
//       <h1 className="text-2xl md:text-3xl font-bold truncate">{name}</h1>

//       <div className="m-4 p-4 border border-gray-300 rounded-lg shadow-md">
//         <h3 className="text-lg font-bold">
//           Rating {avgRating} ({totalRatingsString}) - {costForTwoMessage}
//         </h3>
//         <p className="text-amber-500 text-lg font-bold">
//           {cuisines.join(", ")}
//         </p>
//         <span className="font-bold text-lg">Outlet</span>
//         <span> - {areaName}</span>
//       </div>

//       <div className="flex justify-center my-4">
//         <h2 className="text-xl font-semibold">-- MENU --</h2>
//       </div>

//       {categories.map((category) => (
//         <RestaurantCategory
//           key={category?.card?.card?.title}
//           data={category?.card?.card}
//         />
//       ))}
//     </div>
//   );
// };

// export default RestaurantMenu;

import { useParams } from "react-router-dom";
import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import RestaurantCategory from "./restaurantCategory";
import { DUMMY_MENUS } from "../utils/dummyMenus";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);

  const resInfo = DUMMY_MENUS[resId]?.data;
  if (!resInfo) return <h1 className="text-center mt-20 text-2xl">Menu Not Found</h1>;

  const {
    name,
    cuisines = [],
    costForTwoMessage,
    areaName,
    avgRating,
    totalRatingsString,
    sla,
    aggregatedDiscountInfoV3,
    cloudinaryImageId,
  } = resInfo?.cards?.[2]?.card?.card?.info || {};

  const deliveryTime = sla?.deliveryTime;
  const offerHeader = aggregatedDiscountInfoV3?.header;
  const offerSubHeader = aggregatedDiscountInfoV3?.subHeader;

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="w-full md:w-10/12 lg:w-6/12 m-auto py-10 mt-24 px-4 md:px-0">

      {/* Restaurant Header */}
      <div className="flex items-center gap-4 mb-4">
        {cloudinaryImageId && (
          <img
            className="w-16 h-16 rounded-xl object-cover"
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{cuisines.join(", ")} · {areaName}</p>
        </div>
      </div>

      {/* Info Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">
          ⭐ {avgRating} · {totalRatingsString}
        </span>
        {deliveryTime && (
          <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">
            🕐 {deliveryTime} min
          </span>
        )}
        {costForTwoMessage && (
          <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">
            👥 {costForTwoMessage}
          </span>
        )}
        {offerHeader && (
          <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700">
            🏷️ {offerHeader} {offerSubHeader}
          </span>
        )}
      </div>

      {/* Offer Banner */}
      {offerHeader && (
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2.5 mb-5 text-sm text-orange-700 font-medium">
          🎉 {offerHeader} · {offerSubHeader} — applied at checkout
        </div>
      )}

      {/* Category Pill Nav */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => setShowIndex(showIndex === i ? null : i)}
              className="text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-all"
              style={{
                borderColor: showIndex === i ? "#f97316" : "#e5e7eb",
                color: showIndex === i ? "#f97316" : "#6b7280",
                backgroundColor: showIndex === i ? "#fff7ed" : "#f9fafb",
              }}
            >
              {category?.card?.card?.title}
            </button>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 mb-4" />

      {/* Menu Categories */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={showIndex === index}
          setShowIndex={() =>
            setShowIndex(showIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;