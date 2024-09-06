'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import LoadMore from '../Components/LoadMore';
import { host_post_image_domain } from './env';

const MiniProfile = dynamic(() => import('../../app/Components/Dialog/MiniProfile.js'), { ssr: false });
const EditUserName = dynamic(() => import('../../app/Components/Dialog/EditUserName.js'), { ssr: false });

const Page = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [page, setPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true); // State to track if there are more posts to load
  const [loadState, setLoadState] = useState(false); // State to manage the load more button state
  const limit = 20; // Number of posts per page

  // Use a ref to ensure fetch runs only once
  const initialFetchCompleted = useRef(false);

  // Function to fetch posts
  const fetchPosts = async (currentPage) => {
    setLoading(true);
    setLoadState(true);
    try {
      const response = await axios.get(`https://video.miwabox.live/post?page=${currentPage}&limit=${limit}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]); // Append new posts to the existing list
      if (response.data.posts.length < limit) {
        setHasMore(false); // If current page is the last page, set hasMore to false
      }
    } catch (error) {
      console.error('Error fetching posts:', error); // Handle errors
    } finally {
      setLoading(false);
      setLoadState(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    if (!initialFetchCompleted.current) { // Prevent double fetching
      fetchPosts(1); // Fetch the first page of posts on mount
      initialFetchCompleted.current = true; // Mark the initial fetch as completed
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle load more using the LoadMore component
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1; // Calculate the next page number
      setPage(nextPage); // Update the page state
      fetchPosts(nextPage); // Fetch posts for the next page
    }
  };

  // Define the button action for the LoadMore component
  const LoadMoreBtn = () => {
    setLoadState('loading');
    handleLoadMore();
  };

  return (
    <div className='main'>

      <div className='list-posts'>
        {posts.map((post, index) => ( // Map over fetched posts to render them dynamically
          <Link key={index} href={'/posts/'+post.idFile}>
          <div className='item-post' key={post._id.$oid}>
            <div className="aspect-ratio-container">
              <img src={`${host_post_image_domain}/?id=${post.idImageFile}`} className="post-image" alt="Post Image" />
            </div>
            <div className="post-details">
              <div className="post-footer">
                <ul className="post-footer-list">
                  <li className="post-username">{post.displayName}</li>
                  <li className="post-date">{new Date(post.time).toLocaleDateString()}</li> {/* Format the date */}
                </ul>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.stitle}</p>
            </div>
          </div>
          </Link>
        ))}
        {loading && <p>Loading posts...</p>} {/* Display a loading indicator while fetching data */}
      </div>

      {hasMore && (
        <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={LoadMoreBtn} />
      )}

      <MiniProfile />
      <EditUserName />
    </div>
  );
}

export default Page;