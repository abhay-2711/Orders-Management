import React from "react";
import { Order } from "../../type";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderComponent = ({ order }: { order: Order}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    try {
      dispatch(deleteOrder({ id: order.id }));
      toast.success("Order Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const handleEdit = () => {
    navigate(`/updateorder/${order.id}`);
  };

  return (
    <div className="flex justify-between bg-white p-4 m-4 rounded-lg shadow-md">
      <div>
        <div className="flex flex-col">
          <div className="font-bold text-lg">{order.customer_name}</div>
          <div className="text-gray-500">{order.customer_email}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-lg">{order.product}</div>
          <div className="text-gray-500">Quantity: {order.quantity}</div>
          <div className="text-gray-500">Order Value: {order.order_value}</div>
        </div>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <MdEdit onClick={handleEdit} className="m-2" />
        <MdDelete onClick={handleDelete} className="m-2" />
      </div>
    </div>
  );
};

export default OrderComponent;
