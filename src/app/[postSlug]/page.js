import React from "react";
import BlogHero from "@/components/BlogHero";
import { loadBlogPost } from "@/helpers/file-helpers";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import { notFound } from 'next/navigation';
import { BLOG_TITLE } from "@/constants";
const DivisionGroupsDemo = dynamic(() => import("@/components/DivisionGroupsDemo"));
const CircularColorsDemo = dynamic(() => import("@/components/CircularColorsDemo"));

export async function generateMetadata({ params }) {
  let postData = await loadBlogPost(params.postSlug);

  if (!postData) {
    return null;
  }

  const { frontmatter } = postData;
  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  let param = params.postSlug;

  let postData = await loadBlogPost(param);
  if (!postData) {
    notFound();
  }
  
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={postData.frontmatter.title}
        publishedOn={postData.frontmatter.publishedOn}
      />
      <div className={styles.page}>
      
        <MDXRemote
          source={postData.content}
          components={{pre: CodeSnippet,CircularColorsDemo,DivisionGroupsDemo}}
        />
        
      </div>
    </article>
  );
}

{
  /*  */
}

export default BlogPost;
