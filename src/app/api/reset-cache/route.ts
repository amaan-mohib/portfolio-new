import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const path = process.cwd() + "/src/fetchedData";
  const files = await fs.readdir(path);
  const errors: any[] = [];

  for (const file of files) {
    try {
      await fs.rm(`${path}/${file}`);
    } catch (error) {
      errors.push(error);
      console.log(error);
    }
  }

  if (errors.length > 0) {
    return NextResponse.json(
      {
        status: 400,
        message: errors.map((e) => `${e}`),
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    status: 200,
    message: "ok",
  });
}
