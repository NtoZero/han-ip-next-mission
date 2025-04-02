import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"
import fetchAllMovies from "@/lib/allMovies";
import MovieItem from "@/components/movie-item";
import MovieData from "@/types/movie";
import {useRouter} from "next/router";
import Head from "next/head";


export default function Page() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async (q : string) => {
        const data = await fetchAllMovies(q);
        setMovies(data);
    }

    useEffect(() => {
        if(q) {
            // q가 배열이면 첫 번째 요소를, 문자열이면 그대로 사용
            const queryParam = Array.isArray(q) ? q[0] : q;
            fetchSearchResult(queryParam);
        }
    }, [q]);

    return <div className={`${style.container} ${style.searchResults}`}>
        <Head>
            <title>{q ? `한입 시네마 - '${q}' 검색 결과` : '영화 검색'} | 영화 추천 서비스</title>
            <meta name="description" content={q ? `한입 시네마 - '${q}' 관련 영화 검색 결과입니다.` : '다양한 영화를 검색해보세요.'} />
            <meta name="keywords" content="영화 검색, 영화 찾기, 영화 정보" />
            <meta property="og:title" content={q ? `'${q}' 검색 결과 | 영화 추천 서비스` : '영화 검색 | 영화 추천 서비스'} />
            <meta property="og:description" content={q ? `'${q}' 관련 영화 검색 결과를 확인하세요.` : '다양한 영화를 검색해보세요.'} />
            <meta property="og:image" content="/thumbnail.png" />
        </Head>
        {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
        ))}
    </div>;
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};