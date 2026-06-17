import { CDN_URL } from "../utils/constants";

const ResCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla, // expects sla?.deliveryTime — verify this matches your dummy data shape
  } = resData?.info;

  const deliveryTime = sla?.deliveryTime;
  const ratingValue = parseFloat(avgRating);
  const ratingColor = ratingValue >= 3.5 ? "bg-green-500" : "bg-amber-500";

  return (
    <div className="p-4 w-full sm:w-80 md:w-60 lg:w-80 xl:w-82 rounded-lg shadow-md bg-white transition-all duration-200 hover:scale-105 hover:shadow-xl">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          alt={name}
          src={CDN_URL + cloudinaryImageId}
          loading="lazy"
        />
        {deliveryTime && (
          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
            {deliveryTime} min
          </span>
        )}
      </div>

      <h3 className="font-bold text-lg mt-3 truncate">{name}</h3>
      <p className="text-sm text-gray-500 truncate">{cuisines.join(", ")}</p>

      <div className="flex items-center text-sm text-gray-700 mt-1.5">
        <span
          className={`font-semibold ${ratingColor} text-white px-2 py-0.5 rounded mr-2`}
        >
          ⭐ {avgRating}
        </span>
        <span className="text-gray-400">•</span>
        <span className="ml-2 text-gray-600">{costForTwo}</span>
      </div>
    </div>
  );
};

export default ResCard;