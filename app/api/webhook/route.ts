import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`[WEBHOOK_ERROR]: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const userSubscribed = await prismadb.userSubscription.findUnique({
      where: {
        stripeSubscriptionId: subscription.id,
      },
    });
    if (userSubscribed) {
      await prismadb.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },

        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }
  }
  // if (event.type === "customer.subscription.updated") {
  //   console.log("-----event------");
  //   console.log(event);
  //   console.log("-----session--------");
  //   console.log(session);
  //   if (event.data.object.canceled_at) {
  //     const userSubscribed = await prismadb.userSubscription.findUnique({
  //       where: {
  //         stripeCustomerId:session.customer,
  //       },
  //     });
  //     if (userSubscribed) {
  //       await prismadb.userSubscription.delete({
  //         where: {
  //           stripeCustomerId:session.customer,
  //         },
  //       });
  //     }
  //   }
  // }

  return new NextResponse(null, { status: 200 });
}
