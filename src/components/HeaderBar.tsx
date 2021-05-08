import { mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import tw from 'twin.macro';

import AppLink from './AppLink';

const HeaderBar: React.FC = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <div tw="flex justify-between items-center">
        <div>
          <LogoLink to="/">
            <h1 tw="text-2xl font-bold">K note.dev</h1>
          </LogoLink>
        </div>

        <div>
          <ul tw="flex">
            <li tw="mr-6">
              <NavLink to="/about/">About</NavLink>
            </li>
            <li>
              <AppLink to="https://github.com/k-urtica/myblog">
                <Icon
                  path={mdiGithub}
                  size={1}
                  color="#ECFDF5"
                  tw="ring-green-300 ring-2 rounded-full"
                />
              </AppLink>
            </li>
          </ul>
        </div>
      </div>
    </HeaderContainer>
  </HeaderWrapper>
);

const HeaderWrapper = tw.header`
  py-3 bg-gradient-to-r from-indigo-900 to-gray-800 shadow-lg
`;

const HeaderContainer = tw.div`
  container mx-auto px-4
`;

const LogoLink = tw(AppLink)`text-alabaster hover:text-alabaster`;

const NavLink = tw(AppLink)`text-alabaster hover:text-blue-200`;

export default HeaderBar;
