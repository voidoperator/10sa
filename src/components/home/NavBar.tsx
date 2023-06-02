import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'gatsby';
import { isBrowser } from '../../utility/utility';
import { VzLogoIcon } from '../icons/VzLogoIcon';
import SocialIcon from '../icons/SocialIcon';
import type { NavBarProps } from '../../types/contentful';

const Header: Motion.Tag<'header'> = tw(motion.header)`
  fixed z-20 w-[100svw]
`;
const Nav = tw.nav`
  py-8 bg-transparent
`;
const Container = tw.div`
  flex items-center justify-between px-10
`;
const SocialIconsWrapper = tw.div`
  flex flex-row gap-6
`;
const IconsWrapper = tw.div`
  flex items-center space-x-6
`;
const IconAnchor = tw.a`z-20
  h-full w-full
`;
const Gradient: Motion.Tag<'div'> = tw(motion.div)`
  w-screen h-[16svh] absolute top-0 left-0 z-10
  bg-gradient-to-t from-transparent via-black/25 to-black/50
`;

const NavBar = ({ navItems }: NavBarProps) => {
  // const [scroll, setScroll] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const gradientControls = useAnimation();
  const headerControls = useAnimation();

  useEffect(() => {
    if (!isBrowser) return;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (!isBrowser) return;
    const yAxis = window.pageYOffset;
    if (yAxis === 0) {
      headerControls.start({ top: '0rem' });
      gradientControls.start({ opacity: 0 });
    } else {
      headerControls.start({ top: '-1.25rem' });
      gradientControls.start({ opacity: 1 });
    }
    // setScroll(yAxis);
  };

  const vzLogo = navItems[0];

  return (
    <Header initial={{ top: '0rem' }} animate={headerControls} transition={{ duration: 1, ease: 'easeInOut' }}>
      <Nav>
        <Container>
          <Link className='text-lg z-20' to='/linktree' title={vzLogo.title}>
            <VzLogoIcon twClasses='h-24 transition-all duration-300 hover:opacity-75' />
          </Link>
          <SocialIconsWrapper>
            <IconsWrapper>
              {navItems.map((item, index) => {
                if (index === 0) return;
                const { id, title, hyperlink } = item;
                return (
                  <IconAnchor key={id} target='_blank' href={hyperlink} title={title}>
                    <SocialIcon icon={title} twClasses='h-7 text-white transition-all duration-300' />
                  </IconAnchor>
                );
              })}
            </IconsWrapper>
          </SocialIconsWrapper>
        </Container>
      </Nav>
      <Gradient
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={gradientControls}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </Header>
  );
};

export default NavBar;
