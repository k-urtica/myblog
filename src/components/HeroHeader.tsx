import * as React from 'react';
import Particles from 'react-particles-js';
import tw from 'twin.macro';

const HeroHeader: React.FC = () => (
  <HeroWrapper>
    <div tw="relative">
      <Particles
        tw="h-60 sm:h-96 "
        params={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: false,
              },
            },
            size: {
              value: 20,
              random: true,
              anim: {
                speed: 1,
                size_min: 0.5,
              },
            },
            color: {
              value: 'random',
            },
            opacity: {
              random: true,
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1.5,
              direction: 'top',
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              bubble: {
                distance: 150,
                duration: 2,
                size: 0,
                opacity: 0.1,
              },
              repulse: {
                distance: 150,
                duration: 4,
              },
            },
          },
        }}
      />
      <div tw="absolute top-1/2 w-full text-center">
        <h2 tw="text-alabaster text-xl sm:text-2xl font-bold">
          My Programming Notes😆
        </h2>
      </div>
    </div>
  </HeroWrapper>
);

const HeroWrapper = tw.div`
  container mx-auto bg-gradient-to-tr from-indigo-900 to-gray-900 h-60 sm:(rounded-2xl h-96) shadow-2xl
`;

export default HeroHeader;
