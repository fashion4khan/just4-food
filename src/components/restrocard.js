import { CDN_URL } from "../utils/constants";

const ResCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData?.info;
  return (
    <div className="p-4 w-full sm:w-80 md:w-60 lg:w-80 xl:w-82 rounded-lg shadow-lg bg-white transition-transform hover:scale-105">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          alt="card-img"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <h3 className="font-bold text-lg mt-3 truncate">{name}</h3>
      <p className="text-sm text-gray-500 truncate">{cuisines.join(", ")}</p>
      <div className="flex items-center text-sm text-gray-700 mt-1">
        <span className="font-semibold bg-green-500 text-white px-2 py-0.5 rounded mr-2">
          ⭐ {avgRating}
        </span>
        <span className="text-gray-500">•</span>
        <span className="ml-2">{costForTwo}</span>
      </div>
    </div>
  );
};

export default ResCard;
