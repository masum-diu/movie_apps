import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  title: string;
  address: string;
  icon: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, address, icon: Icon }) => {
  return (
    <Link
      href={address}
      className="hover:text-blue-400 flex space-x-2 items-center"
    >
      <Icon className="text-1xl" />
      <p className="uppercase hidden sm:inline text-sm">{title}</p>
    </Link>
  );
};

export default MenuItem;
