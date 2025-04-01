import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchAllMovies from "@/lib/allMovies";
import fetchRandomMovies from "@/lib/recoMovies";
import {InferGetStaticPropsType} from "next";
import Head from "next/head";

/* 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수 */
export const getStaticProps = async() => {
    const [allMovies, recoMovies] = await Promise.all([fetchAllMovies(), fetchRandomMovies()]);
    return {
        props: {
            allMovies,
            recoMovies
        },
        // 1분마다 페이지를 재생성
        revalidate: 60
    }
}

export default function Home({allMovies, recoMovies}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={style.container}>
            <Head>
                <title>영화 추천 서비스 | 홈</title>
                <meta name="description" content="다양한 영화 추천과 정보를 제공하는 서비스입니다." />
                <meta name="keywords" content="영화, 추천, 영화정보, 리뷰" />
                <meta property="og:title" content="영화 추천 서비스" />
                <meta property="og:description" content="최신 영화 추천과 정보를 한눈에 확인하세요." />
                <meta property="og:image" content="/thumbnail.png" />
            </Head>
            <section>
                <h3>지금 추천하는 영화</h3>
                <div className={style.recommendedMovies}>
                    {recoMovies
                        .map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            </section>
            <section>
                <h3>등록된 모든 영화</h3>
                <div className={style.allMovies}>
                    {allMovies
                        .map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}