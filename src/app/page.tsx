import Image from "next/image";
import AnimatedName from "./components/AnimatedName";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import TextLink from "./components/TextLink";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <header>
        <AnimatedName name="Hi, I'm JC | 俊成。" />
        <Image
          src="/jcang-headshot-watercolours.png"
          alt="JC"
          width={220}
          height={220}
          priority
          className="headshot-defringe mt-6 h-auto w-[220px] max-w-full"
        />
      </header>

      {/* Bio */}
      <section className="mt-8 space-y-5 text-base leading-relaxed">
        <p>I&apos;m a dad of three kids and a furkid named Chestnut.</p>
        <p>
          For over a decade, I held commercial roles at{" "}
          <TextLink href="https://www.keppel.com/">Keppel</TextLink> and{" "}
          <TextLink href="https://www.esr.com/">ESR</TextLink>, connecting the
          hard infrastructure behind the internet, from data centres to subsea
          cables.
        </p>
        <p>
          Then I joined{" "}
          <TextLink href="https://hiddenxp.com/">HIDDEN</TextLink>, a
          location-based entertainment studio, connecting the stories behind
          people, places and brand IPs.
        </p>
        <p>
          My third little one woke me up to slow down, be present. So I started{" "}
          <TextLink href="https://www.youtube.com/@BotakBricks">
            Botak Bricks
          </TextLink>{" "}
          to capture these fleeting years and their growing confidence, Airbender
          Aang{" "}
          <TextLink href="https://www.instagram.com/p/DPs0i72kicz/">
            look
          </TextLink>{" "}
          and all.
        </p>
        <p>
          After months of parenting-in-the-trenches, I now co-write{" "}
          <TextLink href="https://knorii.substack.com/">Sealion Scan</TextLink>.
          Each week I share 1 wild story, 1 practical AI workflow, and 3 world
          currents, so we can know our kids and the world, a little better.
        </p>
        <p>
          You can follow my builder journey on{" "}
          <TextLink href="https://www.instagram.com/skyvaulter19/">
            Instagram
          </TextLink>
          ,{" "}
          <TextLink href="https://www.linkedin.com/in/jcang-sg/">
            LinkedIn
          </TextLink>{" "}
          and{" "}
          <TextLink href="https://github.com/jcang-sg">GitHub</TextLink>.
        </p>
      </section>

      {/* Latest posts (live, self-maintaining) */}
      <PostList />

      {/* Favourites call-to-action */}
      <section className="mt-14 text-lg">
        Some of my <TextLink href="/favourites">favourites →</TextLink>
      </section>

      <Footer />
    </main>
  );
}
