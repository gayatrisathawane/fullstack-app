import React from 'react'
import axios from 'axios';
import './ProductDetail.css'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {

  const [product ,setProduct] = useState({})

    const { _id } = useParams()

    const loadDetails = async() =>{
      const response =  await  axios.get(`/product/${_id}`)
      setProduct(response?.data?.data)
    }

    useEffect(()=>{
     loadDetails()
    }, [ ])

  return (
       <div>
        <h1 className='text-center'>ProductDetail</h1>
     <div className='productDetail-Container'>
        <img src={product.productImage} alt="productImg" className='product-img'/>
        <h1>{product?.name}</h1>
        <h2>{product?.price}</h2>
        <h2>{product?.brand}</h2>
        <h2>{product?.description}</h2>
     </div>
      
    </div>
  )
}

export default ProductDetail
