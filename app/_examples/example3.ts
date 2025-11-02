import { AxiosResponse } from "axios";
import { instance } from "@/app/_examples/example1";
import { Movies } from "@/app/_types";

// การค้นหาข้อมูลหนังที่ต้องการด้วยชื่อหนัง
const results = await instance.get("/api/movies/search?title=spider-man");
console.log(results.data);
// ค้นหาด้วยการกรองค่าอื่นๆ
const promises: Promise<AxiosResponse<Partial<Movies>>>[] = [
    // ค้นหาจากปีที่เริ่มต้นฉายหนังถึงปีที่หนังฉายจบ
    instance.get("/api/movies/filter-by/release-year?fromYear=2000&toYear=2005"),
    // ค้นหาด้วยชื่อประเทศ
    instance.get("/api/movies/filter-by/country?country=Thailand"),
    // ค้นหาด้วยประเภทของหนัง
    instance.get("/api/movies/filter-by/type?movieType=Movie"),
    // ค้นหาจากวันที่เพิ่มหนังและวันที่สิ้นสุดหนัง
    instance.get("/api/movies/filter-by/date-added?startDate=2021-04-01&endDate=2021-04-03"),
    // ค้นหาด้วยชื่อผู้กำกับหนัง
    instance.get("/api/movies/filter-by/director?director=Gerardo Gatica"),
    // ค้นหาด้วยรายชื่อนักแสดง
    instance.get("/api/movies/filter-by/cast-members?castMembers=Sourav"),
    // ค้นหาด้วยเรตติ้งของหนัง
    instance.get("/api/movies/filter-by/rating?rating=R"),
];

for await (const { data } of promises) {
    console.log(data);
}
