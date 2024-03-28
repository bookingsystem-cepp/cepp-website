'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableCategory from "@/components/Tables/TableCategory";

export default  function Home() {
  return (
    <>
      <DefaultLayout>
        <TableCategory />
      </DefaultLayout>
    </>
  );
}
