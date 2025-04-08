import { Review } from "../models/reviewModel.js";


// create review 
export const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(404).json({
                message: 'Something is missing!'
            })
        }
        const review = await Review.create({
            rating,
            comment
        })
        res.status(200).json({
            success: true,
            review
        })
    } catch (error) {
         console.log(error)
    }
}
// get All review 
export const getAllReview = async (req, res) => {
    try {
        const review = await Review.find();
        res.status(200).json({
            success: true,
            review
        })
    } catch (error) {
        console.log(error)
    }
}
// delete review
export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Menu.findById(reviewId);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'review not found'
            })
        }
        await review.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Review deleted Successfully'
        })
    } catch (error) {
        console.log(error)
    }
}