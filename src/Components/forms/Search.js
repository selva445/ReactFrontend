import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { queryProduct } from "../../utils/product";


export default function Search() {

    const{searchtext}=useSelector(state=>state.search)

    const { text } = searchtext||"";
 
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: e.target.value },
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search Clicked")
        dispatch({
          type: "SEARCH_CLICKED",
         
        });
        history.push(`/shop?${text}`);
      };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="search"
          value={text}
          className="form-control mr-sm-2"
          placeholder="Search"
        />
        <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
      </form>
    )
}
