import { useState } from "react";
import ItemList from "./itemList";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <div className="w-full mx-auto my-10 bg-gray-50 shadow-xl">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="p-4 text-lg font-bold">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="p-4">️⬇️</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
