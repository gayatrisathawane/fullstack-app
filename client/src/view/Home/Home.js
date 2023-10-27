import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {

    //     const details= [
    //         {
    //         "name": "shirt ",
    //       "description": "smooth jfjkfh , high-quality",
    //       "price": 600,
    //       "productImage": "jhfdhjkhfjkhfjfhf?fhhfh//fkkfjkf//kjfk.jpg",
    //       "brand": "reymond jdjhd",
    //     },
    //     {
    //         "name": "shirt ",
    //       "description": "smooth jfjkfh , high-quality",
    //       "price": 600,
    //       "productImage": "jhfdhjkhfjkhfjfhf?fhhfh//fkkfjkf//kjfk.jpg",
    //       "brand": "reymond jdjhd",
    //     },
    //     {
    //         "name": "shirt ",
    //       "description": "smooth jfjkfh , high-quality",
    //       "price": 600,
    //       "productImage": "jhfdhjkhfjkhfjfhf?fhhfh//fkkfjkf//kjfk.jpg",
    //       "brand": "reymond jdjhd",
    //     }
    // ]

    const [details, setDetails] = useState([])

    const loadDetails = async () => {

        const response = await axios.get('/products')

        setDetails(response?.data?.data)

    }

    useEffect(() => {
        loadDetails()
    }, [])


    const deleteProduct = async (_id) => {

        const response = await axios.delete(`/product/${_id}`)

        if (response?.data?.message) {
            loadDetails();
        }
    }




    return (
        <div className='main-container'>
            <h1 className='heading bg-secondary p-3 text-white'>Product HUB </h1>
            <div className='productCard'>
                {
                    details.map((product) => {
                        const { name, description, price, brand, productImage, _id } = product
                        return (
                            <div className='product-container'>
                               
                                <img src={productImage} alt="productImg" className='productImg' />

                                <p className='ps-2 fs-3 fw-bold text-center'>{name}</p>
                                {/* <span className='fs-3 me-1'>{brand}</span> */}
                               
                                {/* <p className='text-center'>{description}</p> */}
                                <h3 className='ps-2 text-success'> ₹ {price}</h3>
                               
                                <p onClick={() => {
                                    window.open(`/productdetail/${_id}`)
                                }} className='ps-2 fs-4' >View Details</p>


                                <span  onClick={() => {
                                    deleteProduct(_id)
                                }}   className='btn-delete'> ❌</span>

                                <span  onClick={() => {
                                    window.open(`/updateDetails/${_id}`)
                                }} className='editproduct'>✍</span>

                                <button className='btn btn-warning btn-buy-now '>Buy now</button>
                                <button className='btn btn-addtocart mt-2'> 🛒 Add to cart</button>

                            </div>
                        )
                    })}
            </div>
          
            <Link to="/addproduct"><button className='addproduct-btn'> 🛒 Add Product</button></Link>
          
           
        </div>
    )
}

export default Home
