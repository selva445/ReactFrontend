import React from 'react'
import { Card, Skeleton } from "antd";
export default function LoadingCard() {
  return (
    <div className="row pb-5">    
      <Card className="col-md-12">
      <Skeleton active></Skeleton>
      </Card>
     </div>
  )
}

