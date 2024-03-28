'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableItem from "@/components/Tables/TableItem";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

 function Category({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  return (
    <div>
      <DefaultLayout>
        <TableItem id={params.id}/>
      </DefaultLayout>
    </div>
  );
}

export default Category;
