import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../Components/cards/ProductCardInCheckout";
import  {userCart} from "../utils/user"
const Cart = ({history}) => {
  const cart = Object.values(useSelector( state=>state.cart));
  const user=useSelector(state=>state.user)
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((acc, curr) => {
        return acc + curr.price*curr.count
    }, 0)

  };

  const saveOrderToDb=()=>{

    userCart(cart, user.token)
    .then((res) => {
      console.log("CART POST RES", res);
      if (res.data.ok) history.push("/checkout");
    })
    .catch((err) => console.log("cart save err", err));

  }


  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (

            showCartItems()

          )}
        </div>
        <div className="col-lg-3 col-sm-12">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
            onClick={saveOrderToDb}
            className="btn btn-sm btn-primary mt-2"
            disabled={!cart.length}
          >
            Proceed to Checkout
          </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
                <Link to= {{

                    pathname:"/Login",
                    state:{
                        from:"/Cart"
                    }

                }}>
                   
                     Login to Checkout
                </Link>            
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
