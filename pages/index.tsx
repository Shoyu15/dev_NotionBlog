import SinglePost from "@/components/Post/SinglePost";
import { getAllPosts, getPostsForTopPage } from "@/lib/notionAPI";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps = async () => {
  const topPosts = await getPostsForTopPage();

  return {
    props: {
      topPosts: topPosts, //←同じ名前の時は topPosts, のみでいい
    },
    revalidate: 60 * 60 * 6,
  };
};

export default function Home({ topPosts }) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container w-full mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog 🚀
        </h1>
        {topPosts.map((post:any) => (
          <div key={post.id} className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
        <Link href="/posts/page/1" className="mb-6 lg:w-1/2 mx-auto px-5 block text-right">
          もっと見る
        </Link>
      </main>
    </div>
  );
}
