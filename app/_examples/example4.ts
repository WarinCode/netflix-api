import { AxiosResponse } from "axios";
import { instance } from "@/app/_examples/example1";
import { Payload, SuccessResponse } from "@/app/_types";

const payload: Partial<Payload> = {
    title: "foo bar",
    type: "Movie",
    dateAdded: "2021-09-01",
    releaseYear: 2034,
    rating: "TV-Y",
    duration: "65 min",
};
const result: AxiosResponse<SuccessResponse> = await instance.post(
    "/api/movies",
    payload
);
console.log(result.status);
console.log(result.data.message);
