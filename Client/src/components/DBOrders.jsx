import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { OrderData } from "../components";
import { Spinner } from "../components";

const DBOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const isLoading = !orders;

  
  useEffect(() => {
    if (!orders) {
      getAllOrder()
        .then((data) => {
          dispatch(setOrders(data));
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [dispatch, orders]);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
      {isLoading ? ( // Show loading state while fetching data
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          <p className="text-headingColor font-semibold">Loading orders...</p>
        </div>
      ) : orders && orders.length > 0 ? ( // Check if orders array is not empty
        <>
          {orders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-4xl text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>
  );
};
export default DBOrders;
