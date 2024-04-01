import { NextResponse } from "next/server";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const path = "fetchedData";
    const { storage } = await initializeFirebaseAdmin();

    await storage.deleteFiles({
      prefix: path,
    });

    return NextResponse.json({
      status: 200,
      message: "ok",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: error,
      },
      { status: 500 },
    );
  }
}
