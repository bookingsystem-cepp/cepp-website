'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { ITEM } from "@/types/item";
import { CATEGORY } from "@/types/category";
import { USER } from "@/types/user";
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
    NumberInputOwnerState,
  } from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';
import * as React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Profile = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState<ITEM>();
  const [category, setCategory] = useState<CATEGORY>();
  const [user, setUser] = useState<USER>();
  const [count, setCount] = useState<number | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchItem();
  }, [])
  const fetchItem = () => {
    axios.get("https://backend.tirk101.online/api/item/get-by-id/"+params.id).then((result) => {
        setItem(result.data);
        axios.get("https://backend.tirk101.online/api/category/get-by-id/"+result.data.category).then((result) => {
            setCategory(result.data);
            axios.get("https://backend.tirk101.online/api/user/get-by-id/"+result.data.owner).then((result) => {
                setUser(result.data);
            });
        });
    });
  }
  const showSwal = () => {
    withReactContent(Swal).fire({
        title: "Are you sure?",
        text: `Press confirm if you want to borrow.`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm!",  
    }).then((result) => {
        if (result.isConfirmed) {
            const dataInfo = {
                count,
                borrowerId: session?.user?.id,
                itemId: item?._id,
            };
            axios.post("https://backend.tirk101.online/api/history/create", dataInfo);
            Swal.fire({
                title: "Successfully",
                text: `You request is pending to owner can see in histories`,
                confirmButtonColor: "primary",
            }).then(() => {
                router.push('/histories/'+session?.user?.id);
            });
        }
    })
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName={(item) ? item?.title: "Item"} />
      <div className="grid lg:grid-cols-2 grid-cols-1 h-full bg-white dark:border-strokedark dark:bg-boxdark shadow-10">
        <div className="border-2 p-4 my-10 mx-10 flex justify-center items-center rounded-lg">
          <img src={item && item?.images && item?.images.length > 0 ? item.images[0] : ''} alt="item-img" width={100} height={100} className="w-3/5 rounded-lg"/>
        </div>
        <div className="w-ful my-5 mx-5">
          <h1 className="m-5 text-black font-bold text-2xl dark:text-white">{item?.title}</h1>
          <div className="mx-auto mb-5.5 mt-4.5 grid w-full grid-cols-4 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
            <Link href={'/category/'+category?._id} className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-md hover:underline text-meta-5 cursor-pointer ">{category?.name}</span>
            </Link>
            <Link href={'/profile/'+user?._id} className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-md hover:underline text-meta-3 cursor-pointer">{user?.firstname}</span>
            </Link>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-md">{(item && item?.available ) ? item?.available : 0}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="text-md">{item?.period} days</span>
            </div>
          </div>
          <p className="mx-5 mt-12 text-sm font-semibold">Description</p>
          <p className="mx-5 mt-3 text-sm">{item?.description}</p>
          <div className="mt-20 mx-5 flex justify-between align-middle">
            <NumberInput
                aria-label="Amount you want to borrow"
                placeholder="Amount"
                value={count}
                onChange={(event, val) => setCount(val)}
                min={1} 
                max={item?.available}
            />
            <button
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => (count) && showSwal() }
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-violet-400 dark:border-violet-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
                : 'border-slate-300 dark:border-slate-600 shadow-md shadow-slate-100 dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit] dark:text-slate-300 px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        incrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className,
            ),
          };
        },
        decrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

export default Profile;
