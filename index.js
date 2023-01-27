const express = require('express')

const app = express()

var cors = require('cors')
app.use(cors())

app.use(express.json())


var multer = require('multer');
var upload = multer();

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

const stripe = require('stripe')('sk_test_51LSeX9Frn2e3SuHGBGcfRzZofAzZW7KOBaHa4GIiLRqDarqtcg96KKpQtB42o7G9apKTzI7tkXUx5LPRqVP5DHz700O45GFmKP');


app.post('/', getSession)


async function  getSession(req, res) {
	console.log(req.body)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [{
		  
		  price_data: {
			currency: 'usd',
			unit_amount: (Math.round(Number(req.body.unit_amount)) * 100),
			product_data: {
			  name: req.body.name,
			  description: req.body.description,
			},
		  },
		  adjustable_quantity: {enabled:false},
		  quantity: req.body.quantity,
		  
		}],
		mode: 'payment',
		success_url: req.body.success_url,
		cancel_url: req.body.cancel_url,
		invoice_creation: {enabled: true},
		
	  });
	  
	  res.json(session.url)

}




app.listen(3000,()=>{console.log("Running..")})
