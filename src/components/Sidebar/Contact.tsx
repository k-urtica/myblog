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
      <ul className="flex justify-center gap-4">
        {links.map((link) => (
          <li
            key={link.name}
            className="ontline-amber-400 rounded-full outline outline-2 outline-offset-2 outline-indigo-500/80"
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
