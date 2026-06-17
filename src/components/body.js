import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ResCard from "./restrocard";
import Shimmer from "./shimmer";
import { DUMMY_RESTAURANTS } from "../utils/dummyData";

const PAGE_SIZE = 8;

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeFilter, setActiveFilter] = useState(null); // "topRated" | null

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

  useEffect(() => {
    let result = restaurants;

    if (activeFilter === "topRated") {
      result = result.filter((r) => r.info.avgRating > 4.3);
    }

    const text = searchText.trim().toLowerCase();
    if (text) {
      result = result.filter((r) => r.info.name.toLowerCase().includes(text));
    }

    setFiltered(result);
    setVisibleCount(PAGE_SIZE);
  }, [searchText, activeFilter, restaurants]);

  const toggleTopRated = () => {
    setActiveFilter((prev) => (prev === "topRated" ? null : "topRated"));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const visibleRestaurants = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (loading && restaurants.length === 0) return <Shimmer />;

  return (
    <div className="pt-16 md:pt-20 bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 px-4 md:px-8 py-8 md:py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Hungry? We've got you.
          </h1>
          <p className="text-orange-100 mb-6">
            Order from your favorite restaurants, delivered fast.
          </p>

          <div className="flex w-full max-w-xl mx-auto items-center bg-white rounded-md overflow-hidden shadow-sm">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full border-none pl-10 pr-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-l-md"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search restaurants..."
              />
            </div>
            <button
              onClick={() => {}}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={toggleTopRated}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeFilter === "topRated"
                  ? "bg-white text-orange-700 border-white"
                  : "bg-transparent text-white border-white/40 hover:bg-white/10"
              }`}
            >
              ⭐ Top Rated
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 md:px-8 py-6">
        {visibleRestaurants.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No restaurants found. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleRestaurants.map((res, index) => (
              <Link key={`${res.info.id}-${index}`} to={`/restaurants/${res.info.id}`}>
                <ResCard resData={res} />
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;