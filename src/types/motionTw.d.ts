import type { motion } from 'framer-motion';

declare global {
  namespace Motion {
    type Tag<T extends keyof typeof motion> = (typeof motion)[T];
  }
}
