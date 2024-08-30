import React, { useState, useEffect, useRef } from 'react';

const EditableSpan = ({ placeholder, fontSize, fontWeight, onChangeText, onReset=null }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [text, setText] = useState('');
  const spanRef = useRef(null);

  useEffect(() => {
    spanRef.current.focus();
  }, []);

  useEffect(() => {
    setIsEmpty(text.trim() === '');
  }, [text]);

  useEffect(() => {
    if(onReset) document.getElementsByClassName('add-post-title').item(0).innerHTML = '';
  }, [onReset])

  const handleInput = (e) => {
    setText(e.target.textContent);
    onChangeText(e.target.textContent);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));

    // Move the cursor to the end of the inserted text
    selection.collapseToEnd();

    // Update the state with the new text content
    setText(spanRef.current.textContent);
    onChangeText(spanRef.current.textContent);
  };

  const handleKeyPress = (e) => {
    // if (e.key === 'Enter') {
    //   e.preventDefault();
    // }
  };

  return (
    <span
      ref={spanRef}
      className={`add-post-title ${isEmpty ? 'empty' : ''}`}
      contentEditable="true"
      placeholder={placeholder}
      onInput={handleInput}
      onPaste={handlePaste}
      onKeyPress={handleKeyPress}
      tabIndex="21"
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
    ></span>
  );
};

export default EditableSpan;