/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import { Card,Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import showAverage from "../../utils/Rating";
import _ from"lodash";
import { useSelector, useDispatch } from "react-redux";
import SideDrawer from "../drawer/SideDrawer";
import { Drawer, Button } from 'antd';
const { Meta } = Card;


export default function ProductCard({product}) {
    const [visible, setVisible] = useState(false);

    const { images, title, description, slug ,rating} = product;

    const dispatch=useDispatch()

    const{user,cart}=useSelector(state=>state.cart)

    const handlecart=()=>{

    let cart=[]

    if(typeof window!=="undefined")
    {

       if(localStorage.getItem("cart"))
       {
           cart=JSON.parse(localStorage.getItem("cart"))
       }
       
        cart.push({...product,count:1})

        let unique=_.uniqWith(cart,_.isEqual)

        console.log("unique Cart Items",unique)

        localStorage.setItem("cart",JSON.stringify(unique))

        dispatch({type:"ADD_TO_CART",
        payload:unique
        })
        setVisible(true);
    }

    }

    const onClose = () => {
        setVisible(false);
      };

    return (
        <div > 
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="text-danger" >No Ratings Yet</div>}     
        <Card
            cover={
                <img
                src={images && images.length ? images[0].url : laptop}
                style={{ height: "150px", objectFit: "cover" }}
                className="p-1"
                 />
                 }
            actions={[
                
                <Link to={`/product/${slug}`}>
                <EyeOutlined className="text-warning" /> <br /> View Product
                </Link>,
                <Tooltip title="Add to Cart">
                    <a onClick={handlecart}>
                    <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                    </a>,
                </Tooltip>
              
            ]}
    >
            <Meta
                title={title}
                description={`${description && description.substring(0, 40)}...`}
            />
         </Card>
         <SideDrawer onClose={onClose} visible={visible}></SideDrawer>

        </div>
    )
}
