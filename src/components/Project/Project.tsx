import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import classNames from "classnames";
import languages from "../../app/styles/langColors.module.css";

interface ProjectsProps {
  project: {
    github_url: string;
    name: string | null;
    image: string | null;
    languages: {
      name: string;
      color: string;
    }[];
    language?: string;
    fallbackName: string;
    description: string | null;
    slug: string;
  };
}

const Project: FC<ProjectsProps> = ({ project }) => (
  <div
    className="mt-5 flex flex-col rounded border"
    style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
  >
    <div
      className="flex min-h-[57px] items-center border-b px-5 py-3"
      style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
    >
      {project.image ? (
        <Image
          width={32}
          height={32}
          className="mr-3 w-8 rounded bg-neutral-500"
          alt={project.name || "Logo"}
          src={project.image}
        />
      ) : null}
      <Link href={project.github_url} className="flex items-center font-bold">
        {project.name ||
          project.fallbackName ||
          project.github_url
            .split("/")
            .filter((item) => !!item)
            .pop()}
        <IconExternalLink size={18} className="ml-1" />
      </Link>
    </div>
    <div
      className="flex flex-wrap items-center gap-2 border-b px-5 py-3"
      style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
    >
      {project.languages ? (
        project.languages.map(
          (lang: { name: string; color: string }, index) => (
            <div
              key={lang.name || index}
              className={classNames(
                "rounded-full px-[10px] py-[2px] text-xs text-white",
                languages[(lang.name || "").replace(/\s/g, "_")] || "",
              )}
              style={
                languages[(lang.name || "").replace(/\s/g, "_")]
                  ? {}
                  : { backgroundColor: lang.color }
              }
            >
              {lang.name}
            </div>
          ),
        )
      ) : (
        <div
          className={classNames(
            "w-min rounded-full px-[10px] py-[2px] text-xs text-white",
            languages[project.language || ""],
          )}
        >
          {project.language}
        </div>
      )}
    </div>
    <div className="flex h-full flex-col justify-between px-5 py-3 text-sm">
      <div className="text-[var(--secondary-color)]">
        {project.description || ""}
      </div>
      <div className="mt-3 text-xs">
        <Link href={`/projects/${project.slug || project.name}`}>
          View more
        </Link>
      </div>
    </div>
  </div>
);

export default Project;
