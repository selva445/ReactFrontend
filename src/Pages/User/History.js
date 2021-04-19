import React, { useState, useEffect } from "react";
import UserNav from '../../Components/Nav/UserNav'
import { getUserOrders } from "../../utils/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../Components/cards/ShowPaymentInfo";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    PDFViewer,
  } from "@react-pdf/renderer";
import Invoice from "../../Components/order/Invoice";

export default function History() {

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }))||{};
    const{token}=user
    useEffect(() => {
        getUserOrders(token).then(res=>{
            setOrders(res.data)
           
        })
        .catch(err=>{

            toast.error("Error in Order Fetch" ,err)
        })
       
    }, [])

    const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order}></ShowPaymentInfo>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
          {showDownloadLink(order)}
          </div>
        </div>
      </div>
    ));
    
    const showOrderInTable = (order) => 
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
            {order.products.map( (p,i)=>(

            <tr key={i}>
            <td>
            <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
            {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
            )}
            </td>
            </tr>

            ))}
    </tbody>
    </table>
    
    const showDownloadLink = (order) => (
        <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="btn btn-sm btn-block btn-outline-primary"
      >
        Download PDF
      </PDFDownloadLink>
      );

    return (
        <div className="container-fluid">
            
            <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2 justify-content-center align-items-center text-center">

                <UserNav></UserNav>

            </div>
            <div className="col text-center">
                <h4>
                    {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
                </h4>
                {showEachOrders()}
            </div>
            </div>
        </div>
    )
}
