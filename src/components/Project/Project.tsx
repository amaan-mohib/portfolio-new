import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import classNames from "classnames";
import languages from "../../app/styles/langColors.module.css";

interface ProjectsProps {
  project: any;
}

const Project: FC<ProjectsProps> = ({ project }) => (
  <div
    key={project.id}
    className="mt-5 rounded border"
    style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
  >
    <div
      className="flex items-center border-b px-5 py-3"
      style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
    >
      {project["img_type"] === "banner" ? null : (
        <Image
          width={32}
          height={32}
          className="mr-3 w-8 rounded"
          alt={project.name}
          src={project.image}
        />
      )}
      <Link href={project.html_url} className="flex items-center font-bold">
        {project.name} <IconExternalLink size={18} className="ml-1" />
      </Link>
    </div>
    <div
      className="flex items-center gap-2 border-b px-5 py-3"
      style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
    >
      {project.languages ? (
        project.languages.map((lang: string) => (
          <div
            key={lang}
            className={classNames(
              "w-min rounded-full px-[10px] py-[2px] text-xs text-white",
              languages[lang],
            )}
          >
            {project.language}
          </div>
        ))
      ) : (
        <div
          className={classNames(
            "w-min rounded-full px-[10px] py-[2px] text-xs text-white",
            languages[project.language],
          )}
        >
          {project.language}
        </div>
      )}
    </div>
    <div className="px-5 py-3 text-sm text-[var(--secondary-color)]">
      {project.description}
    </div>
  </div>
);

export default Project;
