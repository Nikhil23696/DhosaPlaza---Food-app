import { Menu } from "../models/menuModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary'

// create menu 
export const newMenu = async (req, res) => {
    try {

        const file = req.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

        const { name, description, price, category, stock } = req.body;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                message: 'Something is missing!'
            })
        }
        const menu = await Menu.create({
            name,
            description,
            price,
            category,
            stock,
            images: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

        })
        res.status(201).json({
            success: true,
            menu
        })

    } catch (error) {
        console.log(error)
    } 
}
// get all menu
export const getAllMenu = async (req, res) => {
    // const search = req.query.search || ""
    // const query = {
    //     fname: {$regex: search, $options: "i"}
    // }
    try {
        const menu = await Menu.find();
        res.status(200).json({
            success: true,
            menu
        })
    } catch (error) {
        console.log(error)
    }
}
// get single menu
export const getSingleMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu does not found'
            })
        }
        res.status(200).json({
            success: true,
            menu
        })
    } catch (error) {
        console.log(error)
    }
}
// get menu details
export const getMenuDetails = async (req, res) => {
    try {
        const menuId = req.params.id
        const menu = await Menu.findById(menuId);
        res.status(200).json({
            success: true,
            menu,
        })
    } catch (error) {
        console.log(error)
    }
}
//delete menu 
export const deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu does not found'
            })
        }
        await menu.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Menu deleted Successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
// update menu 
export const updateMenu = async (req, res) => {
    try {
        const menuData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        }
        const menuId = req.params.id;
        const menu = await Menu.findByIdAndUpdate(menuId, menuData, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            success: true,
            menu 
        })
    } catch (error) {
        console.log(error) 
    }
}
