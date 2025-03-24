import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter();
    console.log(router);

    const {id} = router.query;
    console.log(id);

    return <h1>{id} 영화 상세페이지</h1>
}