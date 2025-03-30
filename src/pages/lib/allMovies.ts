import {MovieData} from "@/pages/types";

export default async function fetchAllMovies(q?: string):Promise<MovieData[]> {
    const host = process.env.NEXT_PUBLIC_API_HOST|| "";
    let url = new URL("/movie", host).toString();

    if(q) {
        url += `/search?q=${q}`;
    }

    console.log(`fetchAllMovies URL: ${url}`);

    try {
        const response = await fetch(`${url}`);
        if(!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}