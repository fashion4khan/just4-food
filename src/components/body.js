import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResCard from "./restrocard";
import Shimmer from "./shimmer";
import { DUMMY_RESTAURANTS } from "../utils/dummyData";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
  setLoading(true);

  const json = DUMMY_RESTAURANTS;

  const newRestaurants =
    json?.data?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  setRestaurants(newRestaurants);
  setFiltered(newRestaurants);

  setLoading(false);
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const text = searchText.trim().toLowerCase();
    if (!text) return setFiltered(restaurants);
    setFiltered(
      restaurants.filter((r) => r.info.name.toLowerCase().includes(text))
    );
  };

  const handleLoadMore = () => {
    fetchData(offset);
  };

  if (loading && restaurants.length === 0) return <Shimmer />;
  return (
    <div className="pt-24 bg-gray-100 m-auto">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 rounded-lg gap-4">
        <div className="flex w-full md:w-3/4 md:mx-16 items-center">
          <input
            type="text"
            className="flex-grow border border-gray-400 pl-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Restaurants..."
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-4 py-2 ml-2 rounded-r-md cursor-pointer transition-colors"
          >
            Search
          </button>
        </div>

        <div className="w-full md:w-auto md:mx-16">
          <button
            onClick={() =>
              setFiltered(restaurants.filter((r) => r.info.avgRating > 4.3))
            }
            className="w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-full cursor-pointer transition-colors"
          >
            Top Rated
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center p-4 pt-6 gap-4">
        {filtered.map((res, index) => (
          <Link
            key={`${res.info.id}-${index}`}
            to={`/restaurants/${res.info.id}`}
            className="w-full sm:w-[48%] md:w-[31%] xl:w-[23%] cursor-pointer"
          >
            <ResCard resData={res} />
          </Link>
        ))}
      </div>

      {filtered.length > 0 && (
        <div className="text-center my-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
