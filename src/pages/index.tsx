import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";

export default function Home() {
  return (
      <>
      </>
  )
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}