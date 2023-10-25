import React, { useState,useEffect } from 'react'
import './UpdateDetails.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDetails = () => {

    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [productImage, setProductImg] = useState('');

    const { _id } = useParams();

    const setfield = async () => {
        const response = await axios.get(`/product/${_id}`)
        const { name, description, price, brand, productImage } = response.data.data
        setName(name)
        setPrice(price)
        setDesc(description)
        setBrand(brand)
        setProductImg(productImage)

    }

    useEffect (()=>{
        setfield()

    }, [] )

      const updateProduct = async()=>{

        const updateObj = {name,description,price,brand,productImage}

        await axios.put(`/product/${_id}` ,updateObj)

       

       alert("update successfully........!")

       setName('')
       setBrand('')
       setDesc('')
       setProductImg('')
       setPrice('')


      }





    return (
        <div>
            <h1 className='text-center fs-1'>Update Product </h1>
            <div className='form-container d-block mx-auto'>
                <form>
                    <input className="form-control input-field"
                        type="text" placeholder="name "
                        aria-label="default input example"

                        value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />

                    <input className="form-control input-field"
                        type="text"
                        placeholder=" description"
                        aria-label="default input example"
                        value={description} onChange={(e) => {
                            setDesc(e.target.value)
                        }} />

                    <input className="form-control input-field" type="text" placeholder="price " aria-label="default input example" value={price} onChange={(e) => {
                        setPrice(e.target.value)
                    }} />

                    <input className="form-control input-field" type="text" placeholder="brand" aria-label="default input example" value={brand} onChange={(e) => {
                        setBrand(e.target.value)
                    }} />

                    <input className="form-control input-field" type="text" placeholder="imgurl" aria-label="default input example" value={productImage} onChange={(e) => {
                        setProductImg(e.target.value)
                    }} />


                    <button type="button"
                        className='btn btn-primary text-center d-block mx-auto p-2 fs-4'
                        onClick={
                            updateProduct}

                    > Update Detail</button>

                </form>


            </div>

        </div>




    )
}

export default UpdateDetails
