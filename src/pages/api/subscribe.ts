import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/client';
import { stripe } from "../../Services/stripe";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST'){
        const sesseion = await getSession({ req })

        const stripCustumer = await stripe.customers.create({
            email: sesseion.user.email,
        })


        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripCustumer.id,
            payment_method_types: ['card'], // pagamento com carão
            billing_address_collection: 'required',
            line_items: [
                {price: 'price_1Ju0LqGCbjnsFoypzK7Fb3PA', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sesseionId: checkoutSession.id})
    }else {
        res.setHeader('allow', 'POTS')
        res.status(405).end('method not allowed')
    }
}