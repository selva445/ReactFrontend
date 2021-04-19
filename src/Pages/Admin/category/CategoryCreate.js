import React, { useState,useEffect } from "react";
import AdminNav from "../../../Components/AdminNav";
import { createCategory ,getCategories,removeCategory} from "../../../utils/category";
import { useDispatch,useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import LocalSearch from "../../../Components/forms/LocalSearch";

const CategoryCreate = () => {

  const user=useSelector(state=>state.user)||{}
  const {token}=user

  const [name,setCategory] =useState("")
  const [filter1,setFilter] =useState("")
  const[categories,setCategories]=useState([])

  const handlecreatesubmit=async(e)=>{
    e.preventDefault();
    createCategory({name},token).then(res=>{

      console.log(res)
      setCategory("")
      loadCategories();
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async() =>
  await getCategories().then((c) => setCategories(c.data.doc));

  const handleRemove= async slug=>{

    if (window.confirm("Delete?")) {

      removeCategory(slug, user.token)
        .then((res) => {
  
          toast.error(`${res.data.doc.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
        

            toast.error(err);

        });
    }

}

  const setFilterPage=(e) =>{

    setFilter(e.target.value.toLowerCase())

  }
  return (
    <div className="container-fluid">
      <div className="row  text-center">
        <div className="col-md-2"> 
          <AdminNav />
        </div>
        <div className="col-md-8">
          <h3> Create Category</h3>
        
          <div className="form-group">
            <label for="exampleInputEmail1">Category Name</label>
            <input type="text" className="form-control" id="category" placeholder="Enter Category" value={name} onChange={e=>setCategory(e.target.value)} />
            <button type="submit" className="btn btn-primary" onClick={handlecreatesubmit} disabled={name.length<3}button>Submit</button>
          </div>
          
          <h3> Filter Category</h3>
        
          <div className="form-group">
            <label for="exampleInputEmail1">Category Filter Keyword</label>
            <input type="text" className="form-control" id="category" placeholder="Enter Keyword" value={filter1} onChange={setFilterPage} />
          </div>
          {console.log(categories)}
          {categories.filter(c=>c.name.toLowerCase().includes(filter1)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span       
                className="btn btn-sm float-right" 
              >
                <DeleteOutlined className="text-danger" onClick={ (e) =>{handleRemove(c.slug) }} />
              </span>
            
              <Link to={`/Admin/Category/${c.slug}`}>
              <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
              </span>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
