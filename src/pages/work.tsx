import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Work() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#work");
  }, [router]);

  return (
    <Head>
      <title>Work - Shabrina Amalia Safaana</title>
      <meta
        name="description"
        content="Working experience of Shabrina Amalia Safaana."
      />
    </Head>
  );
}
