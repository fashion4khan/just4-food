import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      {items.map((item, index) => {
        const id = item.card.info.id;
        const quantity = cartItems[id]?.quantity || 0;

        return (
          <div
            className="flex h-auto justify-between items-start border-b-1 m-2 p-2"
            key={`${id}-${index}`}
          >
            <div className="w-3/4">
              <h3 className="text-lg font-bold">{item.card.info.name}</h3>
              <h3 className="text-sm text-gray-600">
                {" Rs."}{" "}
                {item.card.info.price / 100 || item.card.info.defaultPrice}
              </h3>
              {/* <p>{item.card.info.description}</p> */}
            </div>

            <div className="relative w-28 h-28 overflow-hidden rounded-lg z-10">
              <img
                className="w-full h-full object-cover"
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              />
              {quantity === 0 ? (
                <button
                  onClick={() => handleAddItem(item)}
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white text-emerald-600 font-bold text-sm border px-3 py-1 rounded shadow-md cursor-pointer"
                >
                  ADD
                </button>
              ) : (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center bg-white text-emerald-600 font-bold text-sm border px-3 py-1 rounded shadow-md">
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span className="px-2">{quantity}</span>
                  <button onClick={() => handleAddItem(item)} className="px-2">
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
