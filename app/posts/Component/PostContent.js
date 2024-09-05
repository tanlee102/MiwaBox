import { RootLayoutContext } from '@/app/Context/RootLayoutContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import axios from 'axios'; // Import axios

import { converTime } from '@/app/videos/helper/converTime';

const PostContent = ({ postData, idFile }) => {
  const { logged, myUser } = useContext(RootLayoutContext);
  const router = useRouter();

  // Function to handle the delete operation using POST method with Axios
  const onDelete = async () => {
    if (!idFile) {
      alert('File ID is missing.');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
        const token = myUser.access_token; // Adjust if you use a different cookie name
      const response = await axios.post('http://localhost:55900?idFile='+idFile, null, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add the auth token if needed
        },
      });

      if (response.status === 200) {
        alert('Post deleted successfully.');
        // Optionally, redirect or update state after deletion
        router.push('/'); // Redirect to home or another page
      } else {
        alert('Failed to delete the post.');
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
      alert('An error occurred while trying to delete the post.');
    }
  };

  return (
    <>
      <div className='mypost-info'>
        <span>{postData.displayName}</span> <span className='delimiter'>•</span>{' '}
        <span>{converTime(postData.time)}</span>
      </div>

      <div className='mypost-title'>{postData.title}</div>

      <div className='mypost-stitle'>{postData.stitle}</div>

      <div className='mypost-main-content'>
        {postData?.content?.map((media) => (
          <React.Fragment key={media.id}>
            <div className='mypost-content-media'>
              <img src={`https://image.lehienthanh1.workers.dev/?id=${media.id}`} alt='' />
            </div>
            <div
              className='mypost-content-media-description'
              dangerouslySetInnerHTML={{
                __html:
                  media.description !== 'undefined' &&
                  media.description !== 'null' &&
                  media?.description
                    ? media.description
                    : '',
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className='mypost-list-tags'>
        {postData?.tags?.map((tag) => (
          <span key={tag} onClick={() => { router.push('/?tagname=' + tag); }}>
            #{tag}
          </span>
        ))}
      </div>

      <button className='delete-button-post' onClick={onDelete}>Delete</button>
    </>
  );
};

export default PostContent;
