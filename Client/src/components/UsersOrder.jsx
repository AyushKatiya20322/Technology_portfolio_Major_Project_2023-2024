import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { Header, OrderData, MainLoader } from "../components";
import { setOrders } from "../context/actions/ordersAction";

const PAGE_SIZE = 5; // Number of orders to display per page

const UsersOrder = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!orders) {
      getAllOrder()
        .then((data) => {
          dispatch(setOrders(data));
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch data. Please try again later.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      const userFilteredOrders = orders.filter(
        (data) => data.userId === user?.user_id
      );
      setUserOrders(userFilteredOrders);
    }
  }, [orders, user]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(userOrders.length / PAGE_SIZE);
  const paginatedOrders = userOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        {loading ? (
          <MainLoader />
        ) : error ? (
          <h1 className="text-2xl text-red-500 font-semibold">{error}</h1>
        ) : paginatedOrders.length > 0 ? (
          <>
            {paginatedOrders.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={false} />
            ))}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-2xl text-headingColor font-semibold">No Data</h1>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
