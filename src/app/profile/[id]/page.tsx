'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { USER } from "@/types/user";
import axios from "axios";
import { useSession } from "next-auth/react";

const Profile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<USER>();
  const {data: session} = useSession();

  useEffect(() => {
    fetchUser();
  }, [])
  const fetchUser = () => {
    axios.get("https://backend.tirk101.online/api/user/get-by-id/"+params.id).then((result) => {
      setUser(result.data);
    });
  }
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <div className={(session && session?.user?.id === params.id) ? "absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4" : "hidden"}>
              <Link
                href={'/settings/'+user?._id}
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </Link>
            </div>
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={"/images/user/default-user.png"}
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {user?.name}
              </h3>
              <p className="font-medium">{user?.email + " ("+user?.username + ") "}</p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span 
                    className= {
                      (user && user?.scores > 80) ? "font-semibold text-emerald-500" : 
                      (user && user?.scores > 60) ? "font-semibold text-yellow-700" : 
                      "font-semibol text-rose-500"
                    }
                  >
                    {user?.scores}
                  </span>
                  <span className="text-sm">Scores</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    {user?.year}
                  </span>
                  <span className="text-sm">Year</span>
                </div>
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Contract me on
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" 
                    />
                  </svg>
                  <span>Tel. {user && user?.tel ? user.tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : '0123456789'.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
