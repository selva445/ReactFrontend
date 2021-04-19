import React, { useState, useEffect,Fragment } from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  catego,
  handleChangeSub,
  Subs,
  SelectedSub,
  SetSelectedSub
}) => {
  // destructure


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
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No" selected={shipping==="No"?"true":"false"}>No</option>
          <option value="Yes" selected={shipping==="Yes"?"true":"false"}>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c} selected={c===color}>
              {c}
            </option>
          ))}
        </select>
      </div>

        <div className="form-group">
          <label>Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {brands.map((b) => (
              <option key={b} value={b} selected={b===brand}>
                {b}
              </option>
            ))}
          </select>
        </div>
     
         <div className="form-group">
          <label>Category</label>
          <select name="category" className="form-control"  onChange={handleChangeSub} >         
          {catego.length > 0 &&
            catego.map((c) => (
              <option key={c._id} value={c._id} selected={c._id===category._id} >
                {c.name}
              </option>
            ))}
          </select>
          </div>
              
     
       
        {Subs.length >0? <Fragment> <label>Sub Categories</label> <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={SelectedSub}
          onChange={(value) => SetSelectedSub(value)}
        > {Subs.length >0 ?         
          Subs.map((s) => (
            <Option key={s._id} value={s._id} >
              {s.name}
            </Option>
          )) :null}
        </Select> </Fragment> :null}        
        
   

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
