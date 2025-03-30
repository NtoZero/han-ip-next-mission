import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from "./index.module.css";
import mockMovies from "./mock/dummy.json";
import MovieItem from "@/pages/components/movie-item";
import fetchAllMovies from "@/pages/lib/allMovies";
import fetchRandomMovies from "@/pages/lib/recoMovies";
import {InferGetServerSidePropsType} from "next";

/* 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수 */
export const getServerSideProps = async() => {
    const [allMovies, recoMovies] = await Promise.all([fetchAllMovies(), fetchRandomMovies()]);
    return {
        props: {
            allMovies,
            recoMovies
        }
    }
}

export default function Home({allMovies, recoMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={style.container}>
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