import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";

export default function Page() {
    const router = useRouter();

    console.log(router);

    const {q} = router.query;
    console.log(`q: ${q}`)

    return <h1>{`search : ${q}`}</h1>;
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};