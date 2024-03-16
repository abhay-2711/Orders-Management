import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Order, UserState } from "../../type";
import OrderComponent from "../OrderComponent/OrderComponent";
import { log } from "console";

const Home = ({ searchTerm }: { searchTerm: string }) => {
  const navigate = useNavigate();
  const user = useSelector((state: UserState) => state.user.user);
  const allOrders = useSelector(
    (state: { order: { orders: Order[] } }) => state.order.orders
  );

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 150;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Filtered orders based on search
  const filteredOrders = allOrders.filter(
    (order) =>
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleCreate = () => {
    navigate("/createorder");
  };

  useEffect(() => {
    console.log("Orders", orders);
  }, [orders]);
  console.log(user);

  const containerHeightClass = orders.length >= 15 ? "h-full" : "h-screen";

  return (
    <div className="flex flex-col bg-[#0086f381]">
      {/* Display user info */}
      {user ? (
        <div className="text-[#AF273E] font-bold ml-10 my-5">
          {user.displayName} ({user.email})
        </div>
      ) : (
        <div className="text-gray-500 font-bold ml-10 my-5">
          No user logged in
        </div>
      )}
      <div className="flex flex-col md:flex-row mr-20 ml-20 mt-5 justify-between">
        <div className="inline-block font-bold text-4xl">Orders</div>
        <div className="flex items-center gap-10">
          {user ? (
            <>
              <div className="text-xl font-bold text-black">
                Total Orders: {allOrders.length}
              </div>
              <button
                onClick={handleCreate}
                className="flex px-4 py-3 border mt-4 md:mt-0 rounded-lg gap-2 cursor-pointer bg-[#AF273E] text-white text-base"
              >
                <div>+</div>
                <div>Create new order</div>
              </button>
            </>
          ) : (
            <div className="text-xl font-bold text-[#AF273E] h-screen">
              Please sign in to view orders
            </div>
          )}
        </div>
      </div>
      {/* Display List of Orders */}
      {user && (
        <>
          <div className={`mt-10 ${containerHeightClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-5 mx-10">
              {orders.map((order) => (
                <OrderComponent key={order.id} order={order} />
              ))}
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center gap-10 my-10">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-4 py-2 mr-2 bg-[#AF273E] text-white rounded-lg"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={indexOfLastOrder >= allOrders.length}
              className="cursor-pointer px-4 py-2 bg-[#AF273E] text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
