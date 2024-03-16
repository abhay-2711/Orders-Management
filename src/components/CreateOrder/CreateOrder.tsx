import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addOrder, updateOrder } from "../../store/orderSlice";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Order } from "../../type";

const CreateOrder = () => {
  const { id } = useParams();
  const editOrder = useSelector((state: { order: { orders: Order[] } }) =>
    state.order.orders.find((order) => order.id === id)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifyCreate = () => toast("Order Created Sucesfully!");
  const notifyUpdate = () => toast("Order Updated Sucesfully!");

  const [customer_name, setCustomer_name] = useState<string>("");
  const [customer_email, setCustomer_email] = useState<string>("");
  const [product, setProduct] = useState<string>("Product 1");
  const [quantity, setQuantity] = useState<number>(1);
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "customer_name") {
      setCustomer_name(e.target.value);
    } else if (e.target.name === "customer_email") {
      setCustomer_email(e.target.value);
    } else if (e.target.name === "quantity") {
      setQuantity(parseInt(e.target.value));
    }

    if (customer_name.trim().length < 2) {
      setErrorNumber(1);
      setIsValid(false);
    } else if (customer_email.trim() === "") {
      setErrorNumber(2);
      setIsValid(false);
    } else if (!isValidEmail(customer_email)) {
      setErrorNumber(3);
      setIsValid(false);
    } else if (quantity <= 0) {
      setErrorNumber(4);
      setIsValid(false);
    } else {
      setErrorNumber(0);
      setIsValid(true);
    }
    console.log("Error Number", errorNumber);
  };

  useEffect(() => {
    if (editOrder) {
      setCustomer_name(editOrder.customer_name);
      setCustomer_email(editOrder.customer_email);
      setProduct(editOrder.product);
      setQuantity(editOrder.quantity);
      setIsValid(false);
    }
  }, [editOrder]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!isValid) {
      console.log("Error Number", errorNumber);
      switch (errorNumber) {
        case 1:
          toast.error("Customer name must be at least 3 characters long!");
          break;
        case 2:
          toast.error("Please enter a valid email!");
          break;
        case 3:
          toast.error("Please enter a valid email!");
          break;
        case 4:
          toast.error("Quantity must be greater than 0!");
          break;
        default:
          break;
      }
      return;
    }

    let orderValue = 0;
    switch (product) {
      case "Product 1":
        orderValue = quantity * 29;
        break;
      case "Product 2":
        orderValue = quantity * 49;
        break;
      case "Product 3":
        orderValue = quantity * 99;
        break;
      default:
        break;
    }

    const order = {
      id: editOrder ? editOrder.id : Date.now().toString(),
      customer_name,
      customer_email,
      product,
      quantity,
      order_value: orderValue,
    };

    if (editOrder) {
      dispatch(updateOrder(order));
      notifyUpdate();
      setTimeout(() => {
        navigate("/");
        setCustomer_name("");
        setCustomer_email("");
        setProduct("Product 1");
        setQuantity(1);
      }, 1000);
    } else {
      dispatch(addOrder(order));
      notifyCreate();

      setTimeout(() => {
        navigate("/");
        setCustomer_name("");
        setCustomer_email("");
        setProduct("Product 1");
        setQuantity(1);
      }, 1000);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-[#000000CC] min-h-screen">
      <div className="flex flex-col md:flex-row mr-20 ml-20 w-auto mt-10 justify-between">
        <h1 className="inline-block font-bold text-3xl md:text-4xl">
          Create New Order
        </h1>
        <button
          onClick={handleBack}
          className="flex px-4 py-3 my-4 md:my-0 border rounded-lg gap-2 cursor-pointer bg-[#AF273E] text-white text-base"
        >
          <div>&lt;</div>
          <div>Back</div>
        </button>
      </div>
      <div className="flex flex-col mx-auto border border-[#EBEBEB] rounded-lg w-3/4 md:w-1/3 p-10 mt-10 bg-[#ffffff]">
        <div className="h-full">
          <div className="h-18">
            <div className="font-bold text-2xl">
              {editOrder ? "Edit Order" : "Create Order"}
            </div>
            <div>Write details for the order</div>
          </div>
          <div className="mt-5">
            <label htmlFor="customer_name" className="font-bold">
              Customer Name
            </label>
            <input
              type="text"
              name="customer_name"
              value={customer_name}
              onChange={handleTextChange}
              id="customer_name"
              placeholder="Enter Customer Name"
              className="w-full border h-10 border-[#DBDBDB] outline-none p-3 pl-2.5"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="customer_email" className="font-bold">
              Customer Email
            </label>
            <input
              type="email"
              name="customer_email"
              value={customer_email}
              onChange={handleTextChange}
              id="customer_email"
              placeholder="Enter Customer Email"
              className="w-full border h-10 border-[#DBDBDB] outline-none p-3 pl-2.5"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="product" className="font-bold">
              Product
            </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={handleProductChange}
              className="w-full border h-10 border-[#DBDBDB] outline-none pl-2.5"
            >
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="quantity" className="font-bold">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={handleTextChange}
              className="w-full border h-10 border-[#DBDBDB] outline-none p-3 pl-2.5"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="mt-10">
            <button
              className="bg-[#0055d1] text-white text-lg w-full h-11 rounded-md "
              onClick={(e) => handleSubmit(e)}
            >
              {editOrder ? "Update Order" : "Create Order"}
            </button>
            <ToastContainer theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
