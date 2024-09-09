import React from 'react';

import '../css/style/Post/Post.css';

import { host_post_image_domain } from '../env';
import PostContent from '../Component/PostContent';


const stopWords = ['a', 'an', 'the', 'of', 'and', 'in', 'on', 'to', 'for', 'with', 'at', 'by', 'from', 'as', 'is', 'that', 'this', 'it', 'does', 'he', 'she', 'they', 'we', 'you'];
export async function generateMetadata({ params }) {
  const { index } = params;
  const postData = await fetch(`https://html-back.abelonokieepmi.workers.dev?id=${index}`).then((res) => res.json());

  const fullTitle = postData.title;
  const sentences = fullTitle.match(/[^.!?]+[.!?]*/g) || [];
  const words = fullTitle
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word && !stopWords.includes(word));
  const keywords = [fullTitle, ...sentences, ...words].join(', ');

  return {
    title: postData.title,
    description: postData.stitle,
    keywords,
    openGraph: {
      images: [`${host_post_image_domain}/?id=${postData?.content[0]?.id}`],
    },
  };
}


export default async function Page({ params }) {
  const { index } = params;

  // Fetch data for page rendering
  const postData = await fetch(`https://html-back.abelonokieepmi.workers.dev?id=${index}`).then((res) => res.json());

  return (
    <div className='contain-mypost-content'>
      <div className="mypost-content">
        <PostContent postData={postData} idFile={index} />
      </div>
    </div>
  );
}
