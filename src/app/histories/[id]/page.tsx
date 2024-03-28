'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableHistory from "@/components/Tables/TableHistory";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default  function Home() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Histories" />
        <TableHistory />
      </DefaultLayout>
    </>
  );
}
