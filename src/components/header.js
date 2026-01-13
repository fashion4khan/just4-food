import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector((store) =>
    Object.values(store.cart.items).reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLoginLogout = () => {
    if (loginBtn === "Login") {
      navigate("/login");
    } else {
      dispatch(logout());
    }
  };

  const navItems = [
    { name: "home", to: "/" },
    { name: "about", to: "/about" },
    { name: "contact", to: "/contact" },
    { name: "grocery", to: "/grocery" },
    { name: "cart", to: "/cart" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <IoFastFoodOutline className="text-3xl md:text-6xl text-orange-500" />
          <span className="text-xl md:text-2xl font-bold text-orange-500">Just4Food</span>
        </Link>
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-orange-500">
              <Link to={item.to}>
                {item.name === "cart" ? `Cart - ${totalItems}` : item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-lg"
              onClick={handleLoginLogout}
            >
              {loginBtn}
            </button>
          </li>
        </ul>
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <ul className="md:hidden flex flex-col bg-white border-t shadow-md p-4 gap-4">
          {navItems.map((item) => (
            <li key={item.name} className="text-gray-700 text-lg hover:text-orange-500">
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.name === "cart" ? `Cart - ${totalItems}` : item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-lg"
              onClick={() => {
                handleLoginLogout();
                setOpen(false);
              }}
            >
              {loginBtn}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
