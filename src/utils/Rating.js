import React, { useEffect, useState } from "react";
import StarRating from "react-star-ratings";

export default function showAverage({ratings}) {


    if (ratings) {
        let ratingsArray = ratings;
        let total = [];
        let length = ratingsArray.length;
    
        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((p, n) => p + n, 0);
     
    
        let highest = length * 5;

    
        let result = (totalReduced * 5) / highest;

        return (
            <div className="text-center pt-1 pb-3">
            <span>
            <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
             />{" "}
             ({length})
            </span>
           
          </div>
        )
    }
    else
    {
        return (
            <div className="text-center pt-1 pb-3">
            <span>
              <StarRating rating="0" />
            </span>
          </div>
        )
    }
    
}
