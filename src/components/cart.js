import { useDispatch, useSelector } from "react-redux";
import ItemList from "./itemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // Redux store me items ab object hai, convert to array for ItemList
  const cartItemsObj = useSelector((store) => store.cart.items);
  const cartItems = Object.values(cartItemsObj);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="py-10">
      <div className="w-6/12 m-auto p-12 bg-gray-100">
        <ItemList items={cartItems} />
        
        {cartItems.length !== 0 ? (
          <div className="p-10 m-10 flex justify-between">
            <button
              className="p-2 m-2 px-4 bg-green-600 text-white cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button className="p-2 m-2 px-4 bg-green-600 text-white cursor-pointer">
              Select Address
            </button>
            <button className="p-2 m-2 px-4 bg-green-600 text-white cursor-pointer">
              Payment
            </button>
          </div>
        ) : (
          <div className="w-9/12 m-auto p-12 text-center">
            <h1 className="font-bold text-2xl py-8">Your cart is empty</h1>
            <h3 className="font-bold text-xl ">
              You can go to home page to view more restaurants
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
