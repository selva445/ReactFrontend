import React from 'react'
import {
    Link
  } from "react-router-dom";
export default function UserNav() {
    return (
        <div className="container-fluid">
            <div class="d-flex flex-column ">
                <div class="p-4 "><Link to="/User/History"> HISTORY </Link></div>
                <div class="p-4"><Link to="/User/Password"> PASSWORD </Link></div>
                <div class="p-4"><Link to="/User/WishList"> WISHLIST </Link></div>
            </div>
        </div>
    )
}
