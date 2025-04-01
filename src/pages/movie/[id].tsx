// pages/movie/[id].tsx
import {useRouter} from "next/router";
import style from "./[id].module.css";
import Image from "next/image";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneMovie from "@/lib/oneMovie";
import fetchAllMovies from "@/lib/allMovies";
import Head from "next/head";

// 정적 경로 지정
export const getStaticPaths = async () => {
    // fetchAllMovies를 활용하여 모든 영화 데이터를 가져옴
    const movies = await fetchAllMovies();
    
    // 모든 영화의 ID를 파라미터로 변환
    const paths = movies.map((movie) => ({
        params: { id: movie.id.toString() }
    }));
    
    return {
        paths,
        fallback: true, // fallback을 true로 유지 (새로운 영화가 추가될 경우 고려)
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const idParam = context.params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const movie = await fetchOneMovie(id);

    if (!movie) {
        return { notFound: true };
    }

    return {
        props: { movie },
        revalidate: 60,
    };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page({ movie }: PageProps) {
    const router = useRouter();

    // fallback 상태일 때 로딩 처리
    if (router.isFallback) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <Head>
                <title>{movie.title} | 영화 상세정보</title>
                <meta name="description" content={movie.description.substring(0, 150) + '...'} />
                <meta name="keywords" content={`영화, ${movie.title}, ${movie.genres.join(', ')}`} />
                <meta property="og:title" content={movie.title} />
                <meta property="og:description" content={movie.subTitle || movie.description.substring(0, 150) + '...'} />
                <meta property="og:image" content="/thumbnail.png" />
            </Head>
            <div
                className={style.backgroundImage}
                style={{
                    backgroundImage: `url(${movie.posterImgUrl})`,
                }}
            >
                <Image
                    src={movie.posterImgUrl}
                    width={300}
                    height={500}
                    alt={movie.title}
                />
            </div>

            <div>
                <h1>{movie.title}</h1>
                <p>
                    {movie.releaseDate} / {movie.genres.join(", ")} / {movie.runtime}
                </p>
                <p>{movie.company}</p>
                <p>{movie.subTitle}</p>
                <p>{movie.description}</p>
            </div>
        </div>
    );
}
