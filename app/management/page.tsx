"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, JSX } from "react";
import { useUser, CurrentUser, CurrentInternalUser } from "@stackframe/stack";
import { toast } from "sonner";
import { KeyRound, Trash2 } from "lucide-react";
import NetflixContainer from "@/components/netflix-container";
import Navbar from "@/components/navbar";
import RedButton from "@/components/red-button";
import ActionButton from "@/components/action-button";
import IconButton from "@/components/icon-button";
import { ApiKeys, ApiKey } from "@/app/_types";
import { listAvailableApiKeys, formatDate } from "@/app/_utils";

export default function Page() {
  const user: CurrentUser | CurrentInternalUser | null = useUser();
  const [apiKeys, setApiKeys] = useState<ApiKeys>([]);
  const [currentApiKey, setCurrentApiKey] = useState<string>("");

  useEffect((): (() => void) => {
    (async function (): Promise<void> {
      const keys: ApiKeys = await listAvailableApiKeys(user);
      setApiKeys(keys);
      setCurrentApiKey(
        keys.length === 0
          ? ""
          : keys[keys.length - 1].value.lastFour.length === 4
          ? "*".repeat(16) + keys[keys.length - 1].value.lastFour
          : keys[keys.length - 1].value.lastFour
      );
    })();

    return (): void => {
      setApiKeys([]);
    };
  }, []);

  useEffect((): void => {
    if (!user) {
      toast.error("โปรดเข้าสู่ระบบก่อนเข้าใช้งาน!");
      redirect("/signin");
    }
  }, [user]);

  const handleGenerateApiKey = async (): Promise<void> => {
    if (!user) return;

    const { value, ...others } = await user.createApiKey({
      description: "API Key สำหรับการเข้าถึงและใช้งานข้อมูล Netflix API",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isPublic: false,
    });

    setCurrentApiKey(value);
    setApiKeys(
      (prevApiKeys: ApiKeys): ApiKeys => [
        ...prevApiKeys,
        { ...others, value: { lastFour: value.slice(-4) } },
      ]
    );
    toast.success("สร้าง API Key สำเร็จ", {
      description: "โปรดคัดลอกแล้วเก็บ key ไว้เพราะสามารถดู key ได้แค่รอบเดียว",
      duration: 3000,
    });
  };

  const handleRevokeApiKey = async (apiKey: ApiKey): Promise<void> => {
    if (!user) return;
    if (apiKey) {
      const allKeys: ApiKeys = await user.listApiKeys();
      const apiKeyToRevoke: ApiKey = allKeys.find(
        (k: ApiKey) => k.id === apiKey.id
      ) as ApiKey;
      await apiKeyToRevoke.revoke();
      const updatedKeys: ApiKeys = await listAvailableApiKeys(user);
      setApiKeys(updatedKeys);
      setCurrentApiKey(
        updatedKeys.length === 0
          ? ""
          : "*".repeat(16) + updatedKeys[updatedKeys.length - 1].value.lastFour
      );
      toast.success("ถอน API Key เรียบร้อยแล้ว", { duration: 2500 });
    }
  };

  const handleCopy = async (value: string): Promise<void> => {
    await navigator.clipboard.writeText(value);
    toast.success("คัดลอกข้อเรียบร้อย", { duration: 2500 });
  };

  if (!user) {
    return (
      <h1 className="text-center text-4xl mt-36">
        ไม่สามารถเข้าใช้งานหน้านี้ได้โปรดเข้าสู่ระบบก่อน!
      </h1>
    );
  }

  return (
    <NetflixContainer>
      <Navbar />
      <div className="mt-10">
        <h1 className="text-3xl text-center font-bold my-6">
          จัดการ API Keys ของคุณ
        </h1>
        <div className="flex flex-col items-start space-y-7">
          <p>สร้างและจัดการ API Keys ของคุณได้ที่นี่</p>
          <p>
            ID ผู้ใช้งาน:{" "}
            <span
              className="text-lg bg-black/50 text-amber-300 p-2 rounded-xl cursor-pointer ms-2"
              onClick={(): Promise<void> => handleCopy(user.id)}
            >
              {user.id}
            </span>
          </p>
          {!!currentApiKey && apiKeys.length > 0 && (
            <p>
              API Key ปัจจุบัน:{" "}
              <span
                className={`text-lg bg-black/50 ${
                  currentApiKey.includes("*")
                    ? "text-gray-300"
                    : "text-amber-300"
                } p-2 rounded-xl cursor-pointer ms-2`}
                onClick={(): Promise<void> => handleCopy(currentApiKey)}
              >
                {currentApiKey}
              </span>
            </p>
          )}
        </div>

        <div className="w-full flex items-center justify-center space-x-4 my-6">
          <IconButton
            text="สร้าง API Key"
            icon={<KeyRound className="size-5" />}
            className="w-36"
            handleClick={handleGenerateApiKey}
          />
          <RedButton text="กลับไปที่หน้าหลัก" href="/" className="w-36" />
        </div>

        <div className="w-auto h-max grid place-items-center">
          {apiKeys.length === 0 ? (
            <h1 className="text-center text-2xl mt-20 italic">
              คุณยังไม่มี API Keys
            </h1>
          ) : (
            <table className="font-noto w-4/5 text-center my-12 border-2 border-red-600 bg-black/90">
              <caption className="text-3xl font-bold mb-6">
                ตาราง API Keys
              </caption>
              <thead>
                <tr className="border-2 border-red-600 h-12 p-8">
                  <th className="border-2 border-red-600">ลำดับ</th>
                  <th className="border-2 border-red-600">Key</th>
                  <th className="border-2 border-red-600">วันที่สร้าง</th>
                  <th className="border-2 border-red-600">วันหมดอายุ</th>
                  <th className="border-2 border-red-600">สถานะ</th>
                  <th className="border-2 border-red-600">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(
                  (k: ApiKey, i: number): JSX.Element => (
                    <tr key={k.id} className="border-2 border-red-600 h-20">
                      <td className="border-2 border-red-600">{i + 1}</td>
                      <td className="border-2 border-red-600">
                        {"*".repeat(16) + k.value.lastFour}
                      </td>
                      <td className="border-2 border-red-600">
                        {formatDate(k.createdAt)}
                      </td>
                      <td className="border-2 border-red-600">
                        {formatDate(k.expiresAt as Date)}
                      </td>
                      <td
                        className={`border-2 border-red-600 ${
                          k.isValid() ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {k.isValid() ? "พร้อมใช้งาน" : "หมดอายุ"}
                      </td>
                      <td className="border-2 border-red-600">
                        <IconButton
                          text={"ถอน"}
                          icon={<Trash2 className="size-5" />}
                          handleClick={(): Promise<void> =>
                            handleRevokeApiKey(k)
                          }
                          className="mx-auto"
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot>
                <tr className="h-12">
                  <td colSpan={4} className="border-2 border-red-600">
                    จำนวน API Keys ที่สามารถใช้งานได้มีอยู่ทั้งหมด
                  </td>
                  <td colSpan={2}>{apiKeys.length} Keys</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </NetflixContainer>
  );
}
