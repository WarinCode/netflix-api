"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser, CurrentUser, CurrentInternalUser } from "@stackframe/stack";
import ActionButton from "@/components/action-button";
import { ApiKeys, ApiKey } from "@/app/_types";

export default function ApiKeyPage() {
  const user: CurrentUser | CurrentInternalUser | null = useUser();
  const [apiKeys, setApiKeys] = useState<ApiKeys>(
    user?.useApiKeys() === undefined ? [] : user.useApiKeys()
  );

  useEffect((): void => {
    if (!user) {
      alert("โปรดเข้าสู่ระบบก่อนเข้าใช้งาน!");
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

    console.log(value);
    console.log(value.length);

    setApiKeys(
      (prevApiKeys: ApiKeys): ApiKeys => [
        ...prevApiKeys,
        { ...others, value: { lastFour: value } },
      ]
    );
  };

  return (
    <div className="font-noto">
      <h1>API Key Management</h1>
      <p>Generate and manage your API keys here.</p>
      <p>ID ของผู้ใช้งาน: {user?.id}</p>
      {apiKeys.length === 0 ? (
        <p>คุณยังไม่มเปิดใช้งาน API Key</p>
      ) : (
        <div>
          <p>API Keys ที่สามารถใช้งานได้</p>
          <ul>
            {apiKeys.map(({ id, value: { lastFour } }: ApiKey) =>
              lastFour.length === 4 ? (
                <li key={id}>{"*".repeat(102 - 4) + lastFour}</li>
              ) : (
                <li key={id}>{lastFour}</li>
              )
            )}
          </ul>
        </div>
      )}

      <ActionButton
        text="สร้าง API Key"
        handleClick={handleGenerateApiKey}
        className="font-noto"
      />
    </div>
  );
}
