import React, {useEffect, useState} from 'react'
import Navigations from '../Custom/Navigations';
import "../Custom/Product.css";

function Orderhistory() {

    const [orderHistory, setOrderHistory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/get-orders")
    .then(response => response.json())
    .then(jsondata => {
          console.log(jsondata);
          setOrderHistory(jsondata);
        })

        
    }, [])

    

  return (
    <>
    <Navigations></Navigations>
    {orderHistory.map(function(data,index) {
      return (
       <ul key={data.userId+ index}>
        <li> user: {data.userId}</li>
        <li> order date: {data.orderDate}</li>
        <li> price: {data.orderPrice}</li>
       </ul>
      )
    })}
    </>
  )
}

export default Orderhistory