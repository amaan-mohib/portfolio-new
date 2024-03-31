import { getCachedData } from "@/actions/getCachedData";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume",
  openGraph: {
    title: "Resume",
  },
};

export default async function Resume() {
  const { info: data } = await getCachedData("info");

  if (data?.resume) {
    redirect(data.resume);
  }

  return <p>Loading...</p>;
}
