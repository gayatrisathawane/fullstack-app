import React, { useState } from 'react'
import './AddProduct.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

const AddProduct = () => {

    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [productImage, setProductImg] = useState('');

    const addDetail = async () => {

        if (!name || !brand || !price || !description || !productImage) {
            return alert('all field required')
        }

        const detailobj = {
            name,
            brand,
            price,
            description,
            productImage
        }

         const response= await axios.post('/addproduct', detailobj)

         console.log(response?.data?.data)

        setName('')
        setDesc('')
        setBrand('')
        setPrice('')
        setProductImg('')


    }

    return (
        <div>
            <h1 className='text-center fs-1'>Add Product </h1>
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
                    className='btn btn-secondary text-center d-block mx-auto p-2 fs-4' 
                    onClick={addDetail}>Add detail</button>

                </form>
            </div>

           <Link to="/"><button className='addproduct-btn'>Go to Home Page</button></Link>
          
        </div>




    )
}

export default AddProduct
