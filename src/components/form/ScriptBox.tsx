import React, { useEffect, useState } from 'react';
import { ScriptBox } from '../tw/twStyles';
import { AnimatePresence, motion } from 'framer-motion';
import { useConstantData } from '../contexts/ConstantDataContext';
import type { ScriptProps } from '../../types/constantData';

const scriptBoxVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.05,
      },
    },
  },
};

const Script: React.FC<ScriptProps> = ({ children }) => {
  const { constantData } = useConstantData();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(constantData.show_script === 'on');
  }, [constantData.show_script]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div key='ScriptBox' variants={scriptBoxVariants} initial='initial' animate='visible' exit='hidden'>
          <ScriptBox>
            <motion.div className='p-8'>{children}</motion.div>
          </ScriptBox>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Script;
