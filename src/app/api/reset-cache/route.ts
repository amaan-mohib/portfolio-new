import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    await fetch(process.env.MAIN_LAMBDA_FUNCTION_URL!);

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
