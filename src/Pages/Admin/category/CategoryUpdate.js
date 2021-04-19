import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCategory ,getCategory,getCategories,removeCategory,updateCategory} from "../../../utils/category";
import CategoryForm from "../../../Components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const  user  = useSelector(state => state.user);

  const [name, setName] =useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
    setName(match.params.slug)
    console.log(name,name)
  }, []);

  const loadCategory = async() =>{ 
    
    await getCategory(match.params.slug).then((c) => setName(c.data.doc.name)).catch(err=>{

        console.log(err)
        
    }

    );
    
}
    

  const handleSubmit = async (e) => { 
    e.preventDefault();
    await updateCategory(match.params.slug,{name}, user.token) 
    .then(res=>{
        setName("")
        toast.success(`${match.params.slug } is updated as the new value ${name}`)   
        history.push("/Admin/Category")
    })
    .catch(err=>{

        toast.error(err)
    })
  };

 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} load={loadCategory}></CategoryForm>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
