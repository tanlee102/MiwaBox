import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import TagInput from './TagInput';
import '../css/style/Post/AddPost.css';
import EditableSpan from './EditableSpan';
import { useRouter } from 'next/navigation';
import { RootLayoutContext } from '@/app/Context/RootLayoutContext';

const AddPost = () => {

  const [mediaFiles, setMediaFiles] = useState([]);
  const mediaDescriptionsRef = useRef([]);

  const title = useRef('');
  const stitle = useRef('');
  const [onResetTitle, setOnResetTitle] = useState(false)
  const [tags, setTags] = useState(['posts']);

  const {myUser, logged} = useContext(RootLayoutContext);

  const [displayRotateUpload, setDisplayRotateUpload] = useState(false);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    mediaDescriptionsRef.current.splice(index, 1);
  };

  const handleDescriptionChange = (index, newDescription) => {
    mediaDescriptionsRef.current[index] = newDescription;
  };

  const handleTitleChange = (text) => {
    title.current = text;
  };

  const handleSTitleChange = (text) => {
    stitle.current = text;
  };

  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


    const resetAttributes = () => {
      setMediaFiles([]);
      mediaDescriptionsRef.current = [];
      setTags(['posts']);
      setOnResetTitle(true);
    };
  
    const uploadPost = async () => {
      try {
        setDisplayRotateUpload(true);
        const formData = new FormData();

        // Clean the title by removing HTML tags
        const cleanTitle = title.current.replace(/<[^>]*>?/gm, ''); // Removes all HTML tags
        formData.append('title', cleanTitle);

        const cleanSTitle = stitle.current.replace(/<[^>]*>?/gm, ''); // Removes all HTML tags
        formData.append('stitle', cleanSTitle);

        formData.append('tags', JSON.stringify(tags));
    
        // Append files and descriptions in order
        mediaFiles.forEach((file, index) => {
          formData.append('files', file); // Append each file
          formData.append('descriptions', mediaDescriptionsRef.current[index] || ''); // Append corresponding description
        });
    
        const token = myUser.access_token; // Adjust if you use a different cookie name
        const response = await axios.post('https://my-upload-post.caculus103.workers.dev', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Add the auth token if needed
          },
        });
    
        if (response.status === 200) {
          console.log('Post uploaded successfully:', response.data);
          resetAttributes();
          // router.push('/success-page'); // Redirect after successful upload
        } else {
          console.error('Unexpected response:', response);
        }
        
      } catch (error) {
        console.error('Error uploading post and media files:', error);
      } finally {
        setDisplayRotateUpload(false);
      }
    };
    
  

  return (
    <div className="add-post">

      {
        displayRotateUpload ?
        <div className='background-overlay-loading'>
          <div className="loader-overlay-loading"></div>
        </div>
        : ""
      }

      <EditableSpan placeholder="Give your post a unique title..." fontSize="1.8em" fontWeight="normal" onChangeText={handleTitleChange} onReset={onResetTitle} isAllowEnter={false}/>

      <br />
      <br />

      <EditableSpan placeholder="Share your thoughts..." fontSize="medium" fontWeight="normal" onChangeText={handleSTitleChange} onReset={onResetTitle} isAllowEnter={false}/>

      <div className="list-media">
        {mediaFiles.map((file, index) => (
          <div key={index} className="media-item">
            {file.type.startsWith('image') && <img src={URL.createObjectURL(file)} alt="Uploaded" />}
            <button className="remove-button" onClick={() => handleRemoveFile(index)}><svg fill="#000000" viewBox="-3.5 0 19 19" className="cf-icon-svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg></button>
            <EditableSpan placeholder="Give your media a description..." fontSize="normal" fontWeight="normal" onChangeText={(newDescription) => {handleDescriptionChange(index, newDescription)}} />
          </div>
        ))}
      </div>

      <div className="add-media-button">
        <button type="button" onClick={handleButtonClick}>
          <svg fill="#000000" viewBox="0 0 45.402 45.402"><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></svg>
          Choose Photo
      </button>
      <input type="file" accept="image/*" multiple onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }}/>
      </div>

      <TagInput tags={tags} setTags={setTags} />

      {logged &&
      <div className='modal-footer'>
        <div className='group-button-modal non-select' style={{float: 'left'}}>
            <span onClick={uploadPost}> 
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"> <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path></svg>
                Create Post
            </span>
        </div>
      </div>
      }

    </div>
  );
};

export default AddPost;