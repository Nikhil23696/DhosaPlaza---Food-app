import  { Stripe } from 'stripe'

const stripe = new Stripe("sk_test_51R9ioUQfSfbJp4Jk5MfXPMBUlePNj1TVU080pnsC5HYdqGaQWZ9bNVpCFZB9AWb3EoiKk2Deto9yZ6N0JHYUQRSz00o2HUynXB")
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

export const processPayment = async(req,res)=>{
    try {
        console.log("Received Payment Request:", req.body); 
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount, 
            currency:"usd",
            metadata:{ 
                company: "Ecommerce"
            },
        });
        console.log("Payment Intent Created:", myPayment);  
        res.status(200).json({
            success:true,
            client_secret: myPayment.client_secret
        })
        console.log("Client Secret:", myPayment.client_secret);


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const sendStripeApiKey = async(req,res)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
}