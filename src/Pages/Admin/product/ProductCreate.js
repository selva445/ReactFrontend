import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../Components/AdminNav";
import {createProduct} from "../../../utils/product"
import ProductCreateForm from "../../../Components/forms/ProductCreateForm";
import { createCategory ,getCategories,removeCategory} from "../../../utils/category";
import FileUpload from "../../../Components/forms/FileUpload";

const ProductCreate = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  };
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const setValuesfunc=setValues
  const[categorieslist,setCategories]=useState([])
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async() =>
  await getCategories().then((c) => setCategories(c.data.doc));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  
 
  const handleChange = (e) => {
    //
    setValues({...values, [e.target.name]:e.target.value })
  };

  return (
    <div className="container-fluid">
      <div className="row">
 
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
        <h2 className="text-center"> Create Product Form </h2>
        <FileUpload
              values={values}
              setValuesfunc={setValuesfunc}
              setLoading={setLoading}
        />
        { console.log(images)}
        <ProductCreateForm setValuesfunc={setValuesfunc}handleSubmit={handleSubmit} handleChange={handleChange} values={values} categorieslist={categorieslist}/>
   
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
