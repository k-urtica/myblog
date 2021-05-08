import { mdiTwitter, mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import 'twin.macro';

import { config } from '../../config';
import AppLink from './AppLink';

const Footer: React.FC = () => {
  const links = [
    {
      text: 'About',
      path: '/about/',
    },
    {
      text: 'Category',
      path: '/category/',
    },
    {
      text: 'Tag',
      path: '/tag/',
    },
  ];
  return (
    <footer>
      <div tw="bg-gray-900 mt-12">
        <div tw="container mx-auto px-0 md:px-4">
          <div tw="flex flex-col md:flex-row items-center justify-between py-6">
            <div tw="mb-4 md:mb-0">
              <div tw="text-2xl font-bold mb-2 text-alabaster">K note</div>
              <div tw="my-1">
                <ul tw="flex justify-center">
                  <li tw="mx-2">
                    <AppLink to={config.snsLink.twitter} tw="mr-3">
                      <Icon path={mdiTwitter} size={1} color="#BFDBFE" />
                    </AppLink>
                  </li>
                  <li tw="mx-2">
                    <AppLink to={config.snsLink.github}>
                      <Icon path={mdiGithub} size={1} color="#BFDBFE" />
                    </AppLink>
                  </li>
                </ul>
              </div>
            </div>
            <div tw="flex items-center">
              {links.map((link, index) => {
                return (
                  <AppLink key={index} to={link.path} tw="mx-3">
                    <span tw="text-blue-200 hover:text-blue-200">
                      {link.text}
                    </span>
                  </AppLink>
                );
              })}
            </div>
          </div>

          <hr tw="border-gray-700" />
          <div tw="text-center py-1">
            <span tw="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} K note.dev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
