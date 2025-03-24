import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter();

    console.log(router);

    const {q} = router.query;
    console.log(`q: ${q}`)

    return <h1>{`search : ${q}`}</h1>;
}