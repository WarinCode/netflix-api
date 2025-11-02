import { AxiosResponse } from "axios";
import { instance } from "@/app/_examples/example1";
import { SuccessResponse } from "@/app/_types";

const result: AxiosResponse<SuccessResponse> = await instance.delete("/api/movies/s8808");
console.log(result.status);
console.log(result.data.message);