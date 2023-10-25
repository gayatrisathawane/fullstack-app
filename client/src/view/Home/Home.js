import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
        <div>
            <h1 className='heading'>Product Details</h1>
            <div className='productCard'>
                {
                    details.map((product) => {
                        const { name, description, price, brand, productImage, _id } = product
                        return (
                            <div className='product-container'>
                                <img src={productImage} alt="productImg" className='productImg' />
                                <h2 className='text-center'>{name}</h2>
                                <p className='text-center'>{description}</p>
                                <h3 className='text-center text-warning'> ₹ {price}</h3>
                                <h4 className=''>{brand}</h4>
                                <button type="button" onClick={() => {
                                    window.open(`/productdetail/${_id}`)
                                }} className='btn btn-warning'> Click here...</button>


                                <button className="btn btn-danger ms-5" onClick={() => {

                                    deleteProduct(_id)
                                }}>Delete</button>

                                <button type="button" onClick={() => {
                                    window.open(`/updateDetails/${_id}`)
                                }} className='btn btn-warning'>Edit</button>

                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Home
