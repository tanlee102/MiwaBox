import React, { useRef, useState } from 'react';
import '../css/style/Tag/TagInput.css';

const TagInput = ({tags, setTags}) => {

  const [maxTags, setMaxTags] = useState(10);
  const inputRef = useRef(null);

  const countTags = () => maxTags - tags.length;

  const createTag = () => {
    return tags?.slice().reverse().map((tag, index) => (
      <li key={index}>
        {tag} <i className="uit uit-multiply" onClick={() => removeTag(tag)}></i>
      </li>
    ));
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      const newTag = e.target.value.replace(/\s+/g, ' ').trim();
      if (newTag.length > 1 && !tags.includes(newTag)) {
        if (tags.length < maxTags) {
          setTags([...newTag.split(','), ...tags]);
        }
      }
      e.target.value = '';
    }
  };

  const removeAllTags = () => {
    setTags([]);
  };

  return (
    <div className="wrapper">
      <div className="input-tag-content">
        <p>Press enter or add a comma after each tag</p>
        <ul>
          {createTag()}
          <input
            type="text"
            spellCheck="false"
            onKeyUp={addTag}
            ref={inputRef}
          />
        </ul>
      </div>
      <div className="details">
        <p>
          <span>{countTags()}</span> tags are remaining
        </p>
        <button onClick={removeAllTags}>Remove All</button>
      </div>
    </div>
  );
};


export default TagInput;
