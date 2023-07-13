import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      'pk_test_51NNhl3I8liYtjwxvneNrueVQsk1YJ4bVSVDaskcmUISSXokhSpw1TZjzTPdpul1n09X1tw83QrzI4JFim0wvaJux00LOXWKzli',
    );
  }
  return stripePromise;
};

export default initializeStripe;
