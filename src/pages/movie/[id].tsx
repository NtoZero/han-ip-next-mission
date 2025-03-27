import {useRouter} from "next/router";
import movies from "../mock/dummy.json"
import style from "./[id].module.css"
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    console.log(router);

    const {id} = router.query;
    console.log(id);

    const movie = movies.find((movie) => Number(id) === movie.id)
    if (!movie) {
        return <div>Movie not found (404movies)</div>;
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
                    src={movie?.posterImgUrl}
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