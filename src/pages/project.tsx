import Head from "next/head";
import ProjectsSection from "@/components/ProjectsSection";
import { getProjects } from "@/lib/queries";

export default function Project({ projects }: { projects: Awaited<ReturnType<typeof getProjects>> }) {
  return (
    <>
      <Head>
        <title>Projects - Shabrina Amalia Safaana</title>
        <meta
          name="description"
          content="Featured projects by Shabrina Amalia Safaana - Backend Developer."
        />
      </Head>
      <ProjectsSection projects={projects} />
    </>
  );
}

export async function getStaticProps() {
  const projects = await getProjects();
  return { props: { projects }, revalidate: 30 };
}
