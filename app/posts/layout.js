import React, { Suspense } from 'react'

import WindowProvider from '../posts/Context/WindowContext';
import PostProvider from './Context/PostContext';
import Nav from './Component/Nav';

import "./css/Nav/Menu.css";
import "./css/Nav/MenuRes.css";
import "./css/style/Post/ItemPost.css";

export const metadata = {
  title: "Posts - Share Your Thoughts, Discover New Ideas, and Engage",
  description: "MiwaBox.live offers a diverse range of content including the latest news, anime updates, art showcases, cosplay features, and multimedia content. Discover engaging articles, creative visuals, and updates on popular culture trends.",
  icons: {
    icon: '/miwabox_icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <WindowProvider>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/thinline.css"/>
        <Suspense>
          <Nav/>
        </Suspense>
        <PostProvider>
          <main>{children}</main>
        </PostProvider>
    </WindowProvider>
  );
}
