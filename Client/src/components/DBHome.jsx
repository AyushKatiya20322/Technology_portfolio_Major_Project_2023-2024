import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [products, dispatch]);

  const categoryCounts = useMemo(() => {
    if (!products) return [];
    return [
      products.filter(item => item.product_category === "drinks").length,
      products.filter(item => item.product_category === "deserts").length,
      products.filter(item => item.product_category === "fruits").length,
      products.filter(item => item.product_category === "rice").length,
      products.filter(item => item.product_category === "curry").length,
      products.filter(item => item.product_category === "chinese").length,
      products.filter(item => item.product_category === "bread").length,
    ];
  }, [products]);

  const orderStatusCounts = useMemo(() => {
    return [40, 20, 80, 34, 54];
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Fruits",
                  "Rice",
                  "Curry",
                  "Bread",
                  "Chinese",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: categoryCounts,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Fruits",
                  "Rice",
                  "Curry",
                  "Bread",
                  "Chinese",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: categoryCounts,
                    backgroundColor: [
                      "#009B77",
                      "#92A8D1",
                      "#EFC050",
                      "#88B04B",
                      "#45B8AC",
                      "#FF6F61",
                      "#6B5B95",
                    ],
                    
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBHome;
