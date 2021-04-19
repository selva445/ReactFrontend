import React, { useEffect, useState } from "react";
import Jumbotron from "../Components/cards/Jumbotron";
import LoadingCard from "../Components/cards/LoadingCard";
import ProductCard from "../Components/cards/ProductCard";
import CategoryList from "../Components/category/CategoryList";
import BestSellers from "../Components/home/BestSellers";
import NewArrivals from "../Components/home/NewArrivals";
import SubList from "../Components/sub/SubList";
import { getProductsByCount } from "../utils/product";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(5).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          <Jumbotron text="New Arrivals"></Jumbotron>
      </h4>
        <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
      <Jumbotron text="Best Sellers"></Jumbotron>
      </h4>
      <BestSellers />

      <div className="row-sm-12 p-3">
          <div className="col-md-12">
            <h1>Categories</h1>
            <CategoryList></CategoryList>
            </div>
      </div>  

      <div className="row-sm-12 p-3">
          <div className="col-md-12">
            <h1>SubCategories</h1>
            <SubList></SubList>
            </div>
      </div>  
    </div>
  );
}
