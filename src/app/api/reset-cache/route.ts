import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const url = 'https://api.imagekit.io/v1/files/purge';
    const JSON_FILENAMES = ["info.json", "home.json", "links.json", "projects.json"];

    await Promise.all(
      JSON_FILENAMES.map((key) => {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Basic ${process.env.IMAGEKIT_AUTH_TOKEN}`
            },
            body: JSON.stringify({
              url: `${process.env.JSON_DATA_BASE_URL}/${key}`
            })
          };

          return fetch(url, options);
        }
      )
    );


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
