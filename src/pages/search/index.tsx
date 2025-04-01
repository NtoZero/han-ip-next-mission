import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"
import fetchAllMovies from "@/lib/allMovies";
import MovieItem from "@/components/movie-item";
import MovieData from "@/types/movie";
import {useRouter} from "next/router";


export default function Page() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchAllMovies();
        setMovies(data);
    }

    useEffect(() => {
        if(q) {
            fetchSearchResult()
        }
    }, [q]);

    return <div className={`${style.container} ${style.searchResults}`}>
        {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
        ))}
    </div>;
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};