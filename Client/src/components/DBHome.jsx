import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { CChart } from '@coreui/react-chartjs';

const DBHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts()
        .then((data) => {
          dispatch(setAllProducts(data));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [products, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categoryLabels = [
    'Drinks',
    'Deserts',
    'Fruits',
    'Rice',
    'Curry',
    'Bread',
    'Chinese',
  ];

  const categoryData = [
    products.filter((item) => item.product_category === 'drinks').length,
    products.filter((item) => item.product_category === 'deserts').length,
    products.filter((item) => item.product_category === 'fruits').length,
    products.filter((item) => item.product_category === 'rice').length,
    products.filter((item) => item.product_category === 'curry').length,
    products.filter((item) => item.product_category === 'chinese').length,
    products.filter((item) => item.product_category === 'bread').length,
  ];

  const orderStatusLabels = ['Orders', 'Delivered', 'Cancelled', 'Paid', 'Not Paid'];

  const orderStatusData = [40, 20, 80, 34, 54];

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        maxTicksLimit: 5,
        suggestedMax: Math.max(...categoryData) * 1.2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutChartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              datasets={[
                {
                  label: 'Category wise Count',
                  backgroundColor: '#f87979',
                  data: categoryData,
                },
              ]}
              labels={categoryLabels}
              options={barChartOptions}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              datasets={[
                {
                  backgroundColor: ['#51FF00', '#00B6FF', '#008BFF', '#FFD100', '#FF00FB'],
                  data: orderStatusData,
                },
              ]}
              labels={orderStatusLabels}
              options={doughnutChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
