import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../../Components/cards/ProductCard";
import { getCategory} from "../../../utils/category";
import { Pagination } from "antd";
import LoadingCard from "../../../Components/cards/LoadingCard";


export default function CategoryHome({match}) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
      }, []);
    
      const loadAllProducts = () => {
        setLoading(true);
        getCategory(match.params.slug).then((res) => {
            console.log("category product" , res.data)
          setProducts(res.data);
          setLoading(false);
        });
      };

    return (
        <>
        <div className="container">
  
          {loading ? (
            <LoadingCard count={3} />
          ) : ( products.length>0 ? 
            <> <div className="text-center text-uppercase font-weight-bold p-3 text-success "> There are Total {products.length} Products for {match.params.slug} </div>
            <div className="row">
            
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div> </>
            : <h3> No Products in this Category </h3>
            )}
           
        </div>
       
      </>
    )
}
