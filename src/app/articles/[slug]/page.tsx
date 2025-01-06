import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Post {
  title: string;
  description: string;
  author: string;
  publishedAt: any;
  slug: string;
  mainImage: any;
  body: any;
}

export async function generateMetadata({params} : PageProps) : Promise<Metadata> {
  const {slug} = await params;

  const query = `*[_type == "post" && slug.current=="${slug}"]{
  title,description,mainImage,body,publishedAt,
    author->{
      name
    }
}[0]`;

  const post: Post = await client.fetch(query);

  return {
    title: post ? post.title : "Post Not Found",
  }

}


const AriclePage = async ({  params }: PageProps) => {

  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == "${slug}"]{
    title,
    description,
    mainImage,
    body,
    publishedAt,
    author->{
      name
    }
  }[0]`;

  const post = await client.fetch(query);

  if (!post) {
    return (
      <div>
        <h1>Post Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="m-10">
        <p className="text-gray-400 my-5">{post.publishedAt}</p>
        <p className="text-6xl font-bold my-5">{post.title}</p>
        <div>
          <Image
            src={urlFor(post.mainImage)}
            alt={post.title}
            width={800}
            height={300}
            className="object-cover"
          />
        </div>
        <div>
          <PortableText value={post.body} />
        </div>
      </div>
      <form
        action="/thank-you"
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 w-[400px]"
      >
        <div className=" border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
          <h1 className="text-center text-slate-200 text-xl font-bold col-span-6">
            Send Feedback
          </h1>
          <textarea
            placeholder="Your feedback..."
            required
            className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          ></textarea>
          <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
            </svg>
          </button>
          <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
            </svg>
          </button>
          <span className="col-span-2"></span>
          <button className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              ></path>
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default AriclePage;
