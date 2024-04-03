import { getCachedData } from "@/actions/getCachedData";
import Link from "next/link";
import Project from "../components/Project/Project";

export default async function Home() {
  const { info, projects } = await getCachedData("home");

  return (
    <main className="py-8 sm:py-12">
      <h1 className="font-display text-3xl">{info.name}</h1>
      <p className="text-[var(--secondary-color)]">{info.designation}</p>
      <div
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: info.description }}
      ></div>
      <hr
        className="my-8"
        style={{ borderColor: "rgba(var(--foreground-rgb), .2)" }}
      />
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="mt-5">
        {projects.map((project: any) => {
          return <Project key={project.github_url} project={project} />;
        })}
        <div className="flex items-center justify-center pt-5">
          <Link href={"/projects"}>View more</Link>
        </div>
      </div>
    </main>
  );
}
