'use client';

import React, { useState, useEffect, useRef } from 'react';

const EditableSpan = ({ placeholder, fontSize, fontWeight, onChangeText, onReset = null, isAllowEnter = true, isEditable = false  }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');
  const spanRef = useRef(null);

  useEffect(() => {
    spanRef.current.focus();
  }, []);

  useEffect(() => {
    setIsEmpty(htmlContent.trim() === '');
  }, [htmlContent]);

  useEffect(() => {
    if (onReset){ 
      document.getElementsByClassName('add-post-title').item(0).innerHTML = '';
      document.getElementsByClassName('add-post-title').item(1).innerHTML = '';
      setIsEmpty(true);
    }
  }, [onReset]);

  const handleInput = (e) => {
    setHtmlContent(e.target.innerHTML);
    onChangeText(e.target.innerHTML); // Capture HTML content instead of plain text
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    selection.collapseToEnd();

    setHtmlContent(spanRef.current.innerHTML);
    onChangeText(spanRef.current.innerHTML);
  };

  const handleKeyDown = (e) => {
    if (!isAllowEnter && (e.key === 'Enter' || e.key === 'Return')) {
      e.preventDefault(); // Prevent new line
    }
  };


  // Toggle bold formatting
  const toggleBold = () => {
    document.execCommand('bold');
  };

  // Toggle italic formatting
  const toggleItalic = () => {
    document.execCommand('italic');
  };

  // Embed raw video URL
  const embedVideo = () => {
    const url = prompt('Enter the raw video URL (e.g., .mp4)');
    if (url) {
      const videoHTML = `<video controls width="100%" height="auto">
                          <source src="${url}" type="video/mp4">
                          Your browser does not support the video tag.
                         </video>`;
      document.execCommand('insertHTML', false, videoHTML);
    }
  };


  return (
    <>
      {isEditable && (
      <div className="toolbar-editable-span">
        <button onClick={toggleBold}><b>B</b></button>
        <button onClick={toggleItalic}><i>I</i></button>
        <button onClick={embedVideo}><i class="fa fa-video-camera" aria-hidden="true"></i></button>
      </div>
      )}
      <span
        ref={spanRef}
        className={`add-post-title ${isEmpty ? 'empty' : ''}`}
        contentEditable="true"
        placeholder={placeholder}
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        tabIndex="21"
        style={{
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
      ></span>
    </>
  );
};

export default EditableSpan;