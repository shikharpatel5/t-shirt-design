import React from 'react';
import Product from '../Custom/Product';
import Navigations from '../Custom/Navigations';

function Home() {

  return (
    <div className='container p-5'>
        <Navigations></Navigations>
        <Product></Product>
</div>
  )
}

export default Home