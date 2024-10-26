"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaBookmark, FaHeart } from "react-icons/fa";

interface SearchFormValues {
  searchQuery: string;
}

const Header = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>();

  const onSubmit = (data: SearchFormValues) => {
    const { searchQuery } = data;
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-5 justify-between items-center">
        <div className="logo flex items-center space-x-4">
          <Link href={"/"}>
            <p className="text-4xl font-bold">
              TM<span className="text-blue-400">D</span>B
            </p>
          </Link>
          <DarkModeSwitch />
        </div>
        <div className="flex space-x-3 ">
          <MenuItem
            title="Watchlist"
            address="/watchlist" // Ensure the correct case
            icon={FaBookmark} // Pass the component directly
          />
          {/* Add other menu items here */}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center border border-gray-300 rounded-lg w-full p-2"
      >
        <input
          {...register("searchQuery", {
            required: "Please enter a search query",
            minLength: { value: 3, message: "Must be at least 3 characters" },
          })}
          className="flex-1 outline-none placeholder-gray-400"
          placeholder="Search"
        />
        <button type="submit" className="text-blue-500 font-semibold ml-2">
          <AiOutlineSearch className="text-gray-500 mr-2" />
        </button>
      </form>

      {/* Display error message */}
      {errors.searchQuery && (
        <p className="text-red-500 text-sm mt-2">
          {errors.searchQuery.message}
        </p>
      )}
    </div>
  );
};

export default Header;
