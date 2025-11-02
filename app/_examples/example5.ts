import { AxiosResponse } from "axios";
import { instance } from "@/app/_examples/example1";
import { Payload, SuccessResponse } from "@/app/_types";

const payload: Partial<Payload> = {
    title: "foo bar2",
    type: "Movie",
    director: "David",
    dateAdded: "2021-12-20",
    releaseYear: 2040,
    rating: "TV-Y",
    duration: "89 min",
};
const result: AxiosResponse<SuccessResponse> = await instance.put(
    "/api/movies/s8808",
    payload
);
console.log(result.status);
console.log(result.data.message);