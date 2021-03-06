import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCard = ({  product, handleRemove  }) => {
  // destructure
  const { title, description, images,_id ,slug} = product;

  console.log(_id)

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          alt={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
        <EditOutlined className="text-warning" />
      </Link>,
        <DeleteOutlined
          onClick={(e)=>handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
