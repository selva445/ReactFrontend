import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios"
import { useSelector } from "react-redux";
import { Avatar,Badge } from "antd";
const FileUpload = ({values, setValuesfunc, setLoading }) => {

  const user=useSelector(state=>state.user)
  let allUploadedFiles = values.images;
  const fileUploadAndResize = (e) => {
    
    let files = e.target.files; 
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
         async (uri) => {
          
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages/upload`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                    'Content-Type': 'application/json'
                  },
                }
              )
            .then(res=>{
              allUploadedFiles.push(res.data)
              setValuesfunc({...values, images:allUploadedFiles })
             console.log(res)

            })
            .catch(err=>{

              console.log(err)
            })
          },
          "base64"
        );
      }
    }

  };

  const handleImageRemove=async(id) =>{

    console.log(id)
    await axios.post(
                `${process.env.REACT_APP_API}/removeimage/remove`,
                { public_id: id },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                    'Content-Type': 'application/json'
                  },
                }
              )
            .then(res=>{
              
              const { images } = values;
              let filteredImages = images.filter((item) => {
                return item.public_id !== id;
              });
             console.log(filteredImages)
             setValuesfunc({...values, images:filteredImages })
            })
            .catch(err=>{

              console.log(err)
            })
  }
  return (
    <>
     <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>

    <div className="row">
      <label className="btn btn-primary btn-raised">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
    </>
  );
};

export default FileUpload;
