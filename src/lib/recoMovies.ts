import MovieData from "@/types/movie";

export default async function fetchRandomMovies() : Promise<MovieData[]> {
    const host = process.env.NEXT_PUBLIC_API_HOST|| "";
    const url = new URL("/movie/random", host).toString();

    console.log(`fetchRandomMovies URL : ${url}`);

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch(err) {
        console.log(err);
        return [];
    }

}