import MovieData from "@/types/movie";

export default async function fetchOneMovie(id?: string):Promise<MovieData | null> {
    const host = process.env.NEXT_PUBLIC_API_HOST||"";
    const url = new URL(`/movie/${id}`, host).toString();
    console.log(`url : ${url}`);

    try {
        const response = await fetch(`${url}`);
        if(!response.ok) {
            throw new Error(`다음 Movie Id는 없는데요? ${id}`);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}