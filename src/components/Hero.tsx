import React from "react";
import Container from "./Container";
import Image from "next/image";

const Hero = () => {
  return (
    <Container className="mt-9 grid md:grid-cols-2">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          FrontEnd Developer and a quick learner.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          My name is Hamza Nasir, and I am the creator and writer behind this
          blog website. As a passionate frontend developer and tech enthusiast, I love
          sharing my knowledge, experiences, and insights about the world of web
          development, technology, and beyond. This blog website is my creative space
          where I explore ideas, break down complex concepts, and share tips and
          tutorials to inspire and empower others. Whether you are a beginner, a
          fellow developer, or just curious about technology, I hope my posts
          add value to your learning journey.
        </p>
      </div>
      <div className="hidden md:block">
        <Image src={"/croods 1.png"} className="ml-16" alt="Image" height={323} width={476}/>
      </div>
    </Container>
  );
};

export default Hero;
