import type { MovieData } from "@/pages/types";
import Link from "next/link";
import Image from "next/image";
import style from "./movie-item.module.css"

export default function MovieItem
({
     id,
     title,
     posterImgUrl
 }: MovieData) {
    return (
        <Link href={`/movie/${id}`} className={style.movieItem}>
            <Image
                src={posterImgUrl}
                alt={`${title}의 이미지`}
                width={300}
                height={500}
                className={style.posterImage}
            />
        </Link>
    );
}