import React from 'react'

export default function ShowPaymentInfo({order}) {

  const totalamount=(order)=>{
    
    const{products}=order||[]
    console.log(products)
    let totalinvoice=0
    for (let i = 0; i < products.length; i++) {

        totalinvoice=totalinvoice+products[i].product.price
      
    }
    return totalinvoice
  }

  return (
    <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" / "}        
        {totalamount(order)}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Orderd on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <span className="badge bg-dark text-white">
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
  )
}
