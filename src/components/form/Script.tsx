import React, { useEffect, useState } from 'react';
import { MotionDiv, ScriptBox, scriptBoxVariants } from '@/components/TailwindStyled';
import { AnimatePresence } from 'framer-motion';
import { useConstantData } from '../contexts/ConstantDataContext';
import type { ScriptProps } from '@/types/constantData';

const Script: React.FC<ScriptProps> = ({ children, important = false }) => {
  const { constantData } = useConstantData();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(constantData.show_script === 'on');
  }, [constantData.show_script]);

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv key='ScriptBox' variants={scriptBoxVariants} initial='initial' animate='visible' exit='hidden'>
          <ScriptBox className={important ? 'bg-[#e4b21b] font-semibold' : 'bg-blue-600'}>
            <MotionDiv className='p-8'>{children}</MotionDiv>
          </ScriptBox>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default Script;
