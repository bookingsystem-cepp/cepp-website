"use client"

import { CATEGORY } from "@/types/category";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { USER } from "@/types/user";

const TableCategory: React.FC = () => {
  const [categories, setCategories] = useState<CATEGORY[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = () => {
    axios.get("https://backend.tirk101.online/api/category/get-all").then((result) => {
      setCategories(result.data);
    });
  }
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Categories
            </h4>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Location
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Owner
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                
              </h5>
            </div>
          </div>

          {categories.map((category, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === categories.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden font-medium text-black dark:text-white sm:block">
                  {category.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {category.location}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                <Link href={'/profile/'+category?.owner?._id} className="font-medium hover:underline text-meta-3">{category?.owner?.firstname}</Link>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer">
                <Link href={'/category/'+category._id} className="font-medium hover:underline text-meta-5">See more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableCategory;
