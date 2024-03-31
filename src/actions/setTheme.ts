"use server";

import { cookies } from "next/headers";

export async function setThemeAction(theme: string) {
  cookies().set("theme", theme);
}
