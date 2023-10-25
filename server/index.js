import express, { query } from 'express'
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import Product  from './src/modules/product.js';

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json())

const MONGODB_URL = '';
const connectMongoDb = async () => {

    const conne = await mongoose.connect(process.env.MONGODB_URL)
    if (conne) {
        console.log("connet MongoDb")
    }
}
connectMongoDb()

// schema created
app.get('/products', async(req, res) => {

    const findProduct = await Product.find()

    res.json({
        data: findProduct,
        message: "succesfully get data"
    })
})

// add product 

app.post('/addproduct', async (req, res) => {

    const {name, description, price, productImage, brand } = req.body

    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand

    })

    const savedata = await  newProduct.save()

    res.json({
        data: savedata,
        message: "succesfully added data"
    })
})


//find product on the basis of id

app.get('/product/:_id',async (req,res)=>{

    const { _id } = req.params

    const findOneData = await Product.findOne({_id:_id})

    if(findOneData==null)
    {
        return res.json({
            message: "product not found"
        })
    }

    res.json(
        {
            data:findOneData,
            message:"get data"
        }
    )
})

 // delete data by id 

 app.delete('/product/:_id', async(req,res)=>{

    const { _id } = req.params

    await Product.deleteOne({ _id  :_id })

    res.json({
        message:"delete data successfully "
    })
 })


 //update with put method 

 app.put('/product/:_id' , async (req,res)=>{

    const { _id } = req.params

    const {name, description, price, productImage, brand } = req.body

    await Product.updateOne({ _id :_id }, { $set:{

        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand

    }})

    const updatedProduct = await Product.findOne({ _id :_id })
     res.json({
        messsage:"updated",
        data :updatedProduct
     })

 })

 //update with patch method 

 app.patch('/product/:_id', async(req,res)=>{

    const { _id } = req.params

    const {name, description, price, productImage, brand } = req.body

    const findProduct = await Product.findById(_id)

    if(name)
    {
        findProduct.name=name
    }
   if(description)
   {
    findProduct.description=description
   }

   if(price){
    findProduct.price=price
   }
   if(productImage)
   {
    findProduct.productImage=productImage
   }
   if(brand)
   {
    findProduct.brand=brand
   }

   const savedFinddata = await findProduct.save()

   res.json({
    data:savedFinddata,
    message:"update data"
   })

 })



app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
})