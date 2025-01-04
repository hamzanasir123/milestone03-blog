import { Card } from "@/components/Card";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Photos from "@/components/Photos";
import Resume from "@/components/Resume";
import { ArticleWithSlug, getAllArticles } from "@/lib/article";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";



const Article = ({ article }: { article: ArticleWithSlug }) => {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow>{article.publishedAt}</Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
};


export default async function Home() {
  const query = groq`*[_type == "post"]{
    title, description, publishedAt, "slug": slug.current
  }`;

  const posts: Post[] = await client.fetch(query);
  return (
    <main>
      <Hero />
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts.length > 0 ? (
              <>
            {posts.map((post:Post) => (
              <Article key={post.slug} article={post} />
            ))}
            </>
          ):(
            <p>No Blogs Found.</p>
          )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </main>
  );
}
