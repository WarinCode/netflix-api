import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NextJSEnvironment } from "@/app/_types";

const { NETFLIX_USER_ID, NETFLIX_API_KEY } = <NextJSEnvironment>process.env;
// สร้าง instance ไว้สำหรับการใช้งานในการส่ง requests
export const instance: AxiosInstance = axios.create({
    baseURL: "https://netflix-api-sable-one.vercel.app",
    headers: {
        "Content-Type": "application/json",
        // กำหนดค่า headers ที่ต้องแนบมาตอนส่ง requests 
        "Netflix-User-ID": NETFLIX_USER_ID,
        "Netflix-API-Key": NETFLIX_API_KEY
    }
});