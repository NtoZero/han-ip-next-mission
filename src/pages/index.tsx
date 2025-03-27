import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from "./index.module.css";
import mockMovies from "./mock/dummy.json";
import MovieItem from "@/pages/components/movie-item";

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 영화</h3>
                <div className={style.recommendedMovies}>
                    {mockMovies
                        .slice(0, 3)
                        .map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            </section>
            <section>
                <h3>등록된 모든 영화</h3>
                <div className={style.allMovies}>
                    {mockMovies.map((movie) => (
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