  import React from "react";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { Order, UserState } from "../../type";
  import { Data } from "../../utils/data";

  const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state: UserState) => state.user);
    const orders = useSelector((state: { order: Order[] }) => state.order);

    const handleCreate = () => {
      navigate("/createorder");
    };

    return (
      <div className="flex flex-col">
        {/* Display user info */}
        {user && (
          <div className="text-gray-500 font-bold">
            {user.displayName} ({user.email})
          </div>
        )}
        <div className="flex flex-col md:flex-row mr-20 ml-20 mt-10 justify-between">
          <div className="inline-block font-bold text-4xl">Orders</div>
          <button
            onClick={handleCreate}
            className="flex px-4 py-3 border mt-4 md:mt-0 rounded-lg gap-2 cursor-pointer bg-[#AF273E] text-white text-base"
          >
            <div>+</div>
            <div>Create new order</div>
          </button>
        </div>
        <div className="mt-10 h-screen">
          {/* Display List of Orderss */}
          </div>
      </div>
    );
  };

  export default Home;
