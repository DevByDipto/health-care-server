import { Request } from "express";
import Stripe from "stripe";
import { stripe } from "../../helper/strip";
import { prisma } from "../../shared/prisma";
import { PaymentStatus } from "@prisma/client";

 const handleStripeWebhook= async(req: Request) =>{
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
 console.log("console.log(process.env.STRIPE_WEBHOOK_SECRET): ",process.env.STRIPE_WEBHOOK_SECRET);
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        endpointSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      throw new Error("Invalid signature");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.payment_intent as string;
      const appointmentId = session?.metadata?.appointmentId;
      const paymentId = session?.metadata?.paymentId;
      console.log({transactionId});


await prisma.appointment.update({
  where:{id:appointmentId},
  data:{
  paymentStatus: session.payment_status === 'paid' ? PaymentStatus.PAID : PaymentStatus.UNPAID
  }
})
await prisma.payment.update({
  where:{id:paymentId},
  data:{
  status: session.payment_status === 'paid' ? PaymentStatus.PAID : PaymentStatus.UNPAID,
  paymentGatewayData:JSON.parse(JSON.stringify(session)),
  }
})

    //   await prisma.payment.updateMany({
    //     where: { status: "pending" },
    //     data: { status: "paid", transactionId },
    //   });

      console.log("✅ Payment successful:", transactionId);
    }

    return { received: true };
  }

 export const paymentService={
    handleStripeWebhook
  }