import { getCachedData } from "@/actions/getCachedData";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
  openGraph: {
    title: "Links",
  },
};

export default async function Links() {
  const links = await getCachedData("links");
  const info = await getCachedData("info");
  return (
    <main className="py-8 sm:py-12">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="rounded-[50%]"
          style={{ boxShadow: "0 3px 5px 0 #000" }}
          src={info.profilePicture}
          width={100}
          height={100}
          alt={info.name}
        />
        <h1 className="mt-3 text-xl font-bold">{info.name}</h1>
        <div className="mt-3">
          {links.map((link: any) => (
            <Link
              target="_blank"
              href={
                link.url.startsWith("http") ? link.url : `https://${link.url}`
              }
              key={link.url}
              className={classNames(
                "remove-effect mt-4 flex items-center overflow-hidden rounded border",
                styles.link,
              )}
            >
              <img
                alt={link.title}
                src={link.image}
                className="h-[90px] w-[90px] bg-black object-cover"
              />
              <div className="px-3">
                <p>{link.title}</p>
                <p className="mt-1 w-full max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[var(--secondary-color)] md:max-w-lg">
                  {link.description}
                </p>
                <p className="text-xs">{`${link.url.split("/")[2]}`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
