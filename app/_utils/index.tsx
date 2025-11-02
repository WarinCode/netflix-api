import { EnvironmentKeys } from "@/app/_types";
import { CurrentUser, CurrentInternalUser } from "@stackframe/stack";
import { ApiKeys, ApiKey } from "@/app/_types";

export const getLastPathSegment = (path: string): string | null => {
  const lastpath: string | undefined = path.split("/").pop();
  return lastpath ? lastpath : null;
};

export const toCamelCase = (text: string): string => {
  const texts: string[] = text.split(" ");

  if (text.includes("-") && !text.startsWith("-") && !text.endsWith("-")) {
    const temp: string[] = text.split("-");
    return temp.map((t: string) => toCamelCase(t)).join("-");
  }

  if (texts.length === 1) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  } else if (text.trim() === "") {
    return "";
  } else {
    return texts
      .map((t: string) => t[0].toUpperCase() + t.slice(1).toLowerCase())
      .join(" ");
  }
};

export const getEnv = (key: EnvironmentKeys): string => {
  return process.env[key] as string;
};

export const listAvailableApiKeys = async (
  user: CurrentUser | CurrentInternalUser | null
): Promise<ApiKeys> => {
  if (!user) {
    return [];
  }

  const apiKeys: ApiKeys = await user.listApiKeys();
  const filteredKeys: ApiKeys = apiKeys.filter(
    (k: ApiKey): boolean =>
      k.isValid() &&
      k.whyInvalid() !== "expired" &&
      k.whyInvalid() !== "manually-revoked"
  );

  return filteredKeys;
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};