import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import {MovieData} from "@/pages/types";
import movies from "../mock/dummy.json"
import style from "./index.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    const {q} = router.query;

    let filteredMovies: MovieData[] = [];
    if (typeof q === "string") {
        filteredMovies = movies.filter((movie) => movie.title.includes(q))
    }

    return <div className={style.container}>
        <h3>{`'${q}' 검색 결과`}</h3>
        {filteredMovies.length > 0 ? (
            <div className={style.searchResults}>
                {filteredMovies.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id} className={style.movieItem}>
                        <Image
                            src={movie.posterImgUrl}
                            alt={movie.title}
                            width={300}
                            height={500}
                            className={style.posterImage}
                        />
                    </Link>
                ))}
            </div>
        ) : (
            <h1>404 movies are found</h1>
        )}
    </div>;
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};