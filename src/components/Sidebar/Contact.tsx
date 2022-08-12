import { mdiTwitter, mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import AppLink from '../AppLink';

type Props = {
  className?: string;
};

const Contact = ({ className }: Props) => {
  const links = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/k_urtica',
      icon: mdiTwitter,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/k-urtica',
      icon: mdiGithub,
    },
  ];

  return (
    <div className={className}>
      <ul className="flex justify-center gap-5">
        {links.map((link) => (
          <li
            key={link.name}
            className="rounded-full p-0.5 ring-2 ring-indigo-600/80"
          >
            <AppLink to={link.url}>
              <Icon path={link.icon} size={1} className="text-gray-300" />
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
