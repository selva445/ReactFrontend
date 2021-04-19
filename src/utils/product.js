import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

  export const getProduct=async(slug) =>{
  return await axios.get(`${process.env.REACT_APP_API}/product/singleproduct/${slug}`);
  }

  export const getProductsByCount = async (count, authtoken) => { 
    
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`, {
    headers: {
      authtoken,
    },
  })

}
  

  export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
  export const updateProduct = async (slug, product, authtoken) =>
  { return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
}


export const getProducts = async (sort, order, page) =>
  {
    return await axios.post(`${process.env.REACT_APP_API}/products/all`, {
      sort,
      order,
      page,
    });
  
  }

  export const getProductsCount = async () => 
    
     await axios.get(`${process.env.REACT_APP_API}/products/numberofdocs`)

  
  export const putrating=async(productID,star,authtoken) =>{

   return await axios.put(`${process.env.REACT_APP_API}/product/star/${productID}` ,{

      star

    },{
      headers: {
        authtoken,
      }
    })
  }
  
  
  export const getRelatedAPI = async (productid) => { 
    
    return await axios.get(`${process.env.REACT_APP_API}/product/related/${productid}`)

}


export const queryProduct=async(text) =>{

  return await axios.post(`${process.env.REACT_APP_API}/products/query`,text)
}