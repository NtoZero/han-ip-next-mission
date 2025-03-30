import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";
import style from "./index.module.css"
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchAllMovies from "@/pages/lib/allMovies";
import MovieItem from "@/pages/components/movie-item";

/* GetServerSidePropsContext : 브라우저에서 전달되는 모든 요청 정보를 포함하는 리액트 객체 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const q = context.query.q;
    const filteredMovies = await fetchAllMovies(q as string);

    return {
        props: {
            filteredMovies,
        }
    }
}


export default function Page({filteredMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className={`${style.container} ${style.searchResults}`}>
        {
            filteredMovies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))
        }
    </div>;
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};