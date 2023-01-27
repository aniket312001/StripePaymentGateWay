const express = require('express')

const app = express()

var cors = require('cors')
app.use(cors())
const stripe = require('stripe')('sk_test_51MTLclSEGy4UZS1BDSr8EwvIucpDgeKek40cJBpJ0R1AxkuFR8pP0hp38ccF6hbrvrb0L8b1gWkx1asoAuFycHcS00fdDXcnXq');


app.get('/getURL', getSession)





async function  getSession(req, res) {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [{
		  
		  price_data: {
			currency: 'usd',
			unit_amount: 2000,
			product_data: {
			  name: 'T-shirt',
			  description: 'Comfortable cotton t-shirt',
			},
		  },
		  adjustable_quantity: {enabled:false},
		  quantity: 1,
		  
		}],
		mode: 'payment',
		success_url: 'http://localhost:4200?success=true',
		cancel_url: 'http://localhost:4200/',
		invoice_creation: {enabled: true},
		
	  });
	  
	  res.json(session.url)
	  console.log(session)
}




app.listen(3000,()=>{console.log("Running..")})
