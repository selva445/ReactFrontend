import React, { useState, useEffect } from "react";
import { getProductsByCount, queryProduct } from "../utils/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Components/cards/ProductCard";
import { getCategories } from "../utils/category";
import { toast } from "react-toastify";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../Components/forms/Star";
import { getSubs } from "../utils/sub";



const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  
  const [products, setProducts] = useState([]);
  const [categories, setCatego] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [star, setStar] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  let dispatch = useDispatch();
  const{searchtext}=useSelector(state=>state.search)
  const { text } = searchtext||"";

  const{clicked}=useSelector(state=>state.search) || ""

  useEffect(() => {
    loadAllProducts();
    getSubs().then((res) => setSubs(res.data));
  }, []);

  useEffect(() => {
    SearchProducts({query:text});
  }, [clicked]);

  useEffect(() => {
    getCategories().then(res=>{
      setCatego(res.data.doc)
      console.log(categories)
    })
    .catch(err=>{

      toast.error("Category Error",err)
    })

  }, [])
  const SearchProducts=(text)=>{

    queryProduct(text).then(res=>{


      setProducts(res.data)


    })
    .catch(err=>{

      console.log(err)
    })

  }
  const loadAllProducts = () => {
    getProductsByCount(10).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

//Based on Price  

  const handleSlider = (value) => {
    setBrand("");
    setCategoryIds([])
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setShipping("");
    // setTimeout(() => {
    //   setOk(!ok);
    // }, 300);
    SearchProducts({ price });
  };

//Based on Category

const showCategories = () =>{return categories.map((c) => (
  <div key={c._id}>
    <Checkbox
      
      className="pb-2 pl-4 pr-4"
      value={c._id}
      name="category"
      onChange={handlechangecategory}
      checked={categoryIds.includes(c._id)}
    >
      {c.name}
    </Checkbox>
    <br />
  </div>
));}
  
const handlechangecategory=async(e)=>{
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setBrand("");
  setShipping("");
  setPrice([0,0]);
  let inthestate=[...categoryIds]
  console.log("inthestate",inthestate)
  let justclicked=e.target.value
 
  let foundbefore=inthestate.indexOf(justclicked)

  if(foundbefore === -1)
  {
    inthestate.push(justclicked)
  }
  else
  {
    inthestate.splice(foundbefore,1)

  }
  setCategoryIds(inthestate)
  await queryProduct({category:inthestate}).then(res=>{
    setProducts(res.data)
    console.log(res.data)
  })
  .catch(err=>{

    toast.error("Category Error" ,err)
  })

}

const showStars = () => (
  <div className="pr-4 pl-4 pb-2">
    <Star starClick={handleStarClick} numberOfStars={5} />
    <Star starClick={handleStarClick} numberOfStars={4} />
    <Star starClick={handleStarClick} numberOfStars={3} />
    <Star starClick={handleStarClick} numberOfStars={2} />
    <Star starClick={handleStarClick} numberOfStars={1} />
  </div>
);

const handleStarClick=async(num)=>{
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0,0]);
  setCategoryIds([])
  setBrand("");
  setShipping("");
await queryProduct({star:num}).then(res=>{
  setProducts(res.data)
  console.log(res.data)
})
.catch(err=>{

  toast.error("Category Error" ,err)
})

}

const showSubs = () =>
subs.map((s) => (
  <div
    key={s._id}
    onClick={() => handleSub(s)}
    className="p-1 m-1 badge badge-secondary"
    style={{ cursor: "pointer" }}
  >
    {s.name}
  </div>
));

const handleSub =async (sub) => {

  setSub(sub);
  setShipping("");
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0, 0]);
  setCategoryIds([]);
  setStar("");
  setBrand("");
  await queryProduct({sub}).then(res=>{
    setProducts(res.data)
    console.log(res.data)
  })
  .catch(err=>{

    toast.error("Category Error" ,err)
  })
};

const showBrands=()=>(
  brands.map(b=> <Radio
    value={b}
    name={b}
    checked={b === brand}
     onChange={handleBrand}
    className="pb-1 pl-4 pr-4"
  >
    {b}
  </Radio>))

const handleBrand=async(e)=>{

  setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand(e.target.value);
    setShipping("");
    await queryProduct({brand}).then(res=>{
      setProducts(res.data)
      console.log(res.data)
    })
    .catch(err=>{
  
      toast.error("Category Error" ,err)
    })
}

 // 8. show products based on color
 const showColors = () =>
 colors.map((c) => (
   <Radio
     value={c}
     name={c}
     checked={c === color}
     onChange={handleColor}
     className="pb-1 pl-4 pr-4"
   >
     {c}
   </Radio>
 ));

const handleColor =async (e) => {
 setSub("");
 dispatch({
   type: "SEARCH_QUERY",
   payload: { text: "" },
 });
 setPrice([0, 0]);
 setCategoryIds([]);
 setStar("");
 setBrand("");
 setColor(e.target.value);
 setShipping("");
 await queryProduct({color}).then(res=>{
  setProducts(res.data)
  console.log(res.data)
})
.catch(err=>{

  toast.error("Category Error" ,err)
})
};

// 9. show products based on shipping yes/no
const showShipping = () => (
 <>
   <Checkbox
     className="pb-2 pl-4 pr-4"
     onChange={handleShippingchange}
     value="Yes"
     checked={shipping === "Yes"}
   >
     Yes
   </Checkbox>

   <Checkbox
     className="pb-2 pl-4 pr-4"
     onChange={handleShippingchange}
     value="No"
     checked={shipping === "No"}
   >
     No
   </Checkbox>
 </>
);

const handleShippingchange = async(e) => {
 setSub("");
 dispatch({
   type: "SEARCH_QUERY",
   payload: { text: "" },
 });
 setPrice([0, 0]);
 setCategoryIds([]);
 setStar("");
 setBrand("");
 setColor("");
 setShipping(e.target.value);
 await queryProduct({shipping}).then(res=>{
  setProducts(res.data)
  console.log(res.data)
})
.catch(err=>{

  toast.error("Category Error" ,err)
})
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 ">
        <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={["1", "2","3"]} mode="inline">
            {/* Price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="999"
                />
              </div>
            </SubMenu>
            {/* Category */}          
              <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
             {/* stars */}
             <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>
              {/* colors */}
              <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
