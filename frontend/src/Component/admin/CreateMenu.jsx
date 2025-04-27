import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Avatar, Button } from '@mui/material'
import './CreateMenu.css'
import { addNewMenu } from '../../redux/menuSlice.js';

const CreateMenu = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [stock, setStock] = useState();
  const [images, setImages] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Masala Dhosa",
    "Idli Sambhar",
    "Sandwich",
    "Pizza",
    "Burger",
    "Fried Rice",
    "Chawmin"
  ]

  const imageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesPreview(reader.result);
        setImages(e.target.files[0])
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const myForm = new FormData();
  myForm.set("name", name);
  myForm.set("price", price);
  myForm.set("description", description);
  myForm.set("category", category);
  myForm.set("stock", stock);
  if (images) myForm.append("file", images);

  const productFormHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("before res")
      const res = await axios.post('http://loalhost:8000/api/v1/menu/new', myForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(addNewMenu(res.data.menu));
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <>
      <div className="createProduct">
        <form
          className="productform"
          encType='multipart/form-data'
          onSubmit={productFormHandler}
        >
          <h1>Create New Food item</h1>
          <div className="productinput">
            <input
              type="text"
              placeholder='Food Name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="productinput">
            <input
              type="number"
              placeholder='Price'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="productinput">
            <textarea
              type="text"
              placeholder='Food Description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            // cols={10}
            // rows={1}
            />
          </div>
          <div className="productinput">
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {
                categories.map((cate) => (
                  <option key={cate} value={cate}>{cate}</option>

                ))
              }
            </select>
          </div>
          <div className="productinput">
            <input
              type="number"
              placeholder='Stock'
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div id="productfile">
            <Avatar
              variant='square'
              src={imagesPreview}
              sx={{ width: 60, height: 60 }}
            />
            <input
              type="file"
              name='avatar'
              accept='image/*'
              onChange={imageChange}
            />
          </div>
          <Button type='submit' id='productbtn' fullWidth>Create Food</Button>
        </form>
      </div>
    </>
  )
}

export default CreateMenu