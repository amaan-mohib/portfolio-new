import { getCachedData } from "@/actions/getCachedData";
import Project from "../../components/Project/Project";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    title: "Projects",
  },
};

export default async function Projects() {
  const { projects, description } = await getCachedData("projects");

  return (
    <main className="py-16">
      <h1 className="font-display text-3xl">Projects</h1>
      <div
        className={classNames("mt-4", styles.description)}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
        {projects.map((project: any) => {
          return <Project key={project.id} project={project} />;
        })}
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Link
          href={"https://github.com/amaan-mohib"}
          target="_blank"
          className="flex items-center"
        >
          More on GitHub
          <IconExternalLink size={18} className="ml-1" />
        </Link>
      </div>
    </main>
  );
}
