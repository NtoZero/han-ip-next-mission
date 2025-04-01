// pages/movie/[id].tsx
import {useRouter} from "next/router";
import style from "./[id].module.css";
import Image from "next/image";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneMovie from "@/lib/oneMovie";

// 정적 경로 지정
export const getStaticPaths = () => {
    return {
        paths: [
            { params: { id: "831815" } },
            { params: { id: "919207" } },
            { params: { id: "533535" } },
        ],
        fallback: true, // ISR
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
