import { db, collection } from '../firebase/firebaseClient';
import { onSnapshot, addDoc } from 'firebase/firestore';
import getStripe from './initializeStripe';

export async function createCheckoutSession(uid: string) {
  // Create a new checkout session in the subcollection inside the users document
  const userCheckoutSessionsRef = collection(db, `users/${uid}/checkout_sessions`);

  const checkoutSession = {
    price: 'price_1NNjbEI8liYtjwxvLcWnR5VU',
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  };

  // Create a new checkout session
  const docRef = await addDoc(userCheckoutSessionsRef, checkoutSession);

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(docRef, async (snap) => {
    const data = snap.data();
    if (data && data.sessionId) {
      const sessionId = data.sessionId;
      // Init Stripe
      const stripe = await getStripe();
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
        if (error) {
          console.warn('Error:', error);
        }
      }
    }
  });
}
