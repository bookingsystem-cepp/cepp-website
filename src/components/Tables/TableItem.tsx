"use client"

import { ITEM } from "@/types/item";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY } from "@/types/category";
import { USER } from "@/types/user";

const TableItem: React.FC<{ id: string }> = ({ id }) => {
  const [items, setItems] = useState<ITEM[]>([]);
  const [category, setCategory] = useState<CATEGORY>();
  const [user, setUser] = useState<USER>();
  useEffect(() => {
    fetchItems();
    fetchCategory();
  }, [])
  const fetchItems = () => {
    axios.get("http://localhost:8000/api/item/get-by-category/"+id).then((result) => {
        setItems(result.data);
    });
  }
  const fetchCategory = () => {
    axios.get("http://localhost:8000/api/category/get-by-id/"+id).then((result) => {
        setCategory(result.data);
        axios.get("http://localhost:8000/api/user/get-by-id/"+result.data.owner).then((result) => {
            setUser(result.data);
        });
    });
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-row justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            {category?.name}
        </h4>  
        <div className="flex flex-row mr-6 gap-6">
            <h5>Location: {category?.location} </h5>
            <h5>Owner: <Link href={'/profile/'+user?._id} className="text-meta-3 hover:underline cursor-pointer">{user?.firstname}</Link></h5>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Period
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Available
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              
            </h5>
          </div>
        </div>

        {items.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === items.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={item.images && item.images.length > 0 ? item.images[0] : ''} alt="img" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {item.title}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.period} D</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item.available}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-primary dark:text-white">{item.amount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Link href={'/item/'+item._id} className="text-meta-5 hover:underline cursor-pointer">Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableItem;
