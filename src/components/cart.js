import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./itemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [confirmClear, setConfirmClear] = useState(false);

  const cartItemsObj = useSelector((store) => store.cart.items);
  const cartItems = Object.values(cartItemsObj);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || item.defaultPrice || 0) * item.quantity,
    0
  );

  const handleClearCart = () => {
    if (confirmClear) {
      dispatch(clearCart());
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 px-4 min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="font-bold text-2xl text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-10 px-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-5 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>
          <button
            onClick={handleClearCart}
            onBlur={() => setConfirmClear(false)}
            className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${
              confirmClear
                ? "bg-red-500 text-white hover:bg-red-600"
                : "text-red-500 hover:bg-red-50"
            }`}
          >
            {confirmClear ? "Click again to confirm" : "Clear Cart"}
          </button>
        </div>

        <ItemList items={cartItems} />

        <div className="border-t border-gray-200 mt-6 pt-4">
          <div className="flex justify-between text-gray-700 mb-1">
            <span>Subtotal</span>
            <span>₹{(subtotal / 100).toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Taxes and delivery fee calculated at checkout
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors">
              Select Address
            </button>
            <button className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;