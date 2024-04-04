import { getCachedData } from "@/actions/getCachedData";
import LinkButton from "@/components/LinkButton/LinkButton";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles.module.scss";
import { Metadata } from "next";
import classNames from "classnames";
import languages from "@/app/styles/langColors.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { projects } = await getCachedData("projects");
  const project = projects.find(
    (item: any) => (item.slug || item.name) === params.slug,
  );
  if (!project) {
    notFound();
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const { projects } = await getCachedData("projects");
  const project = projects.find(
    (item: any) => (item.slug || item.name) === slug,
  );
  if (!project) {
    notFound();
  }

  const readmeURL = `${project.github_url}/blob/main/README.md?raw=true`;
  const res = await fetch(readmeURL);
  let readme = "";
  let branch = "main";

  if (res.ok) {
    const readmeBlob = await res.blob();
    readme = await readmeBlob.text();
  } else {
    const readmeURL = `${project.github_url}/blob/master/README.md?raw=true`;
    const res = await fetch(readmeURL);
    if (res.ok) {
      const readmeBlob = await res.blob();
      readme = await readmeBlob.text();
      branch = "master";
    }
  }

  return (
    <main className="py-8 sm:py-12">
      {project.image ? (
        <Image
          width={50}
          height={50}
          className="mr-3 w-[50px] rounded bg-neutral-500"
          alt={project.name || project.fallbackName || "Logo"}
          src={project.image}
        />
      ) : null}
      <h1 className="mt-5 font-display text-3xl">
        {project.name || project.fallbackName}
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {project.languages ? (
          (project.languages as any[]).map(
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
      <div className="mt-5 text-[var(--secondary-color)]">
        {project.description || ""}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <LinkButton href={project.github_url} target="_blank" title="GitHub">
          <IconBrandGithub size={20} />
        </LinkButton>
        {project.url && (
          <LinkButton href={project.url} target="_blank" title="Website">
            <IconWorld size={20} />
          </LinkButton>
        )}
      </div>
      {readme && (
        <>
          <hr
            className="my-5"
            style={{ borderColor: "rgba(var(--foreground-rgb), 1)" }}
          />
          <div
            className="relative overflow-hidden rounded-lg border p-5 pt-[10px]"
            style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
          >
            <div className={styles.description}>
              <Markdown
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        ref={null}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={dracula}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
                className={classNames(styles.markdown, "text-sm")}
                remarkPlugins={[remarkGfm]}
                urlTransform={(url, key, node) => {
                  if (url.startsWith("/")) {
                    return `${project.github_url}/raw/${branch}/${url}`;
                  }
                  return url;
                }}
              >
                {readme}
              </Markdown>
            </div>
            <div
              className="absolute bottom-0 right-0 rounded-tl-md border border-b-0 border-r-0 px-2 py-1 text-xs"
              style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
            >
              README.md
            </div>
          </div>
        </>
      )}
    </main>
  );
}
