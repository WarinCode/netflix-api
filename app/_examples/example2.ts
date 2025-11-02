import { AxiosResponse } from "axios";
import { Movies } from "@/app/_types";
import { instance } from "@/app/_examples/example1";

// ดึงข้อมูลหนังมาทั้งหมด
const movies: AxiosResponse<Movies> = await instance.get("/api/movies");
console.log(movies.data);
/*
{
    show_id: "s98",
    type: "TV Show",
    title: "Kid Cosmic",
    director: null,
    cast_members: "Jack Fisher, Tom Kenny, Amanda C. Miller, Kim Yarbrough, Keith Ferguson, Grey Griffin, Lily Rose Silver",
    country: "United States",
    date_added: "2021-09-06T17:00:00.000Z",
    release_year: 2021,
    rating: "TV-Y7",
    duration: "2 Seasons",
    listed_in: "Kids' TV, TV Comedies, TV Sci-Fi & Fantasy",
    description: "A boy's superhero dreams come true when he finds five powerful cosmic stones. But saving the day is harder than he imagined — and he can't do it alone.",
  },
  ... 8708 more items
*/
// ดึงข้อมูลหนังตามจำนวน query string ที่กำหนด
const movies2: AxiosResponse<Movies> = await instance.get("/api/movies?limit=4");
console.log(movies2.data);