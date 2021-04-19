import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getCategories, getCategorySubs } from "../../../utils/category";

import { LoadingOutlined } from "@ant-design/icons";

import AdminNav from "../../../Components/AdminNav";
import FileUpload from "../../../Components/forms/FileUpload";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm"
import { getProduct,updateProduct } from "../../../utils/product";

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

const ProductUpdate = ({ match,history }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [catego, Setcatego] = useState([]);
  const [Subs, SetSubs] = useState([]);
  const [SelectedSub, SetSelectedSub] = useState([]);
  const setValuesfunc=setValues
  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [slug]);

  const loadCategories = async() =>{

    await getCategories().then((c) => {
      Setcatego(c.data.doc)
    }
    )
  }
 
  const loadProduct = async() => {

    getProduct(slug).then((p) => {
   
       setValues({ ...values, ...p.data });
     
    })
    
  }
  
  const handleChangeSub=async(e)=>{
    e.preventDefault();  
    SetSelectedSub(prev=>[])
    values.category=e.target.value
     getCategorySubs(e.target.value,user.token).then (res =>{
      SetSubs((prev)=>res.data) 
      res.data.map(ele=>SelectedSub.push(ele._id))     
      SetSelectedSub(prev=>[])
    }) 
    .catch(err=>{
      console.log(err)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    values.subs=SelectedSub
    console.log(values)   
    updateProduct(slug,values,user.token).then(res=>{
      setLoading(false);
      toast.success(`"${res.data.title}" is updated`);
      history.push("/admin/products");
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.err);
    })
    
  
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>
          {JSON.stringify(values)}
          <FileUpload
              values={values}
              setValuesfunc={setValuesfunc}
              setLoading={setLoading}
        />
     
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            catego={catego}
            handleChangeSub={handleChangeSub}
            Subs={Subs}
            SelectedSub={SelectedSub}
            SetSelectedSub={SetSelectedSub}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
