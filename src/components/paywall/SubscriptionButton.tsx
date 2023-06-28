import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/TailwindStyled';
import { auth } from '@/pages/api/_firebase';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SubscriptionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setIsLoading(true);

    // Redirect back to login if not logged in
    if (!auth.currentUser) {
      console.log('User not logged in');
      router.push('/login');
      return;
    }

    // Get user's Firebase ID token
    const token = await auth.currentUser!.getIdToken();

    // Call your backend to create the Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the Firebase ID token in the Authorization header
      },
      body: JSON.stringify({ priceId: 'price_1NNjbEI8liYtjwxvLcWnR5VU' }),
    });

    const session = await response.json();
    console.log(session);
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    if (!stripe) {
      console.warn('Stripe failed to load.');
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (error) {
      console.warn('Error:', error);
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handleSubscribe} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Subscribe'}
    </Button>
  );
};

export default SubscriptionButton;
