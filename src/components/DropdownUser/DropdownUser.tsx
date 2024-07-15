import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutSide';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Jefferson Domingos
          </span>
          <span className="block text-xs">CEO</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img className="rounded-full" src="https://avatars.githubusercontent.com/u/135356151?v=4" alt="User" />
        </span>
      </Link>
    </ClickOutside>
  );
};

export default DropdownUser;