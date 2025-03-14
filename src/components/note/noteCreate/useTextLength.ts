import { useState, useEffect, useCallback } from 'react';
import type ReactQuillType from 'react-quill-new';

export default function useTextLength(
  quillInstance: React.RefObject<ReactQuillType | null>,
) {
  const [textLength, setTextLength] = useState(0);
  const [trimmedTextLength, setTrimmedTextLength] = useState(0);

  const updateTextLength = useCallback(() => {
    if (!quillInstance.current) return;
    const quillEditor = quillInstance.current.getEditor();
    const text = quillEditor.getText();
    const nonSpaceLength = text.replace(/\s/g, '').length;
    const length = quillEditor.getLength();
    setTextLength(length > 1 ? length - 1 : 0);
    setTrimmedTextLength(nonSpaceLength);
  }, [quillInstance]);

  useEffect(() => {
    if (quillInstance.current) {
      updateTextLength();
    }
  }, [quillInstance, updateTextLength]);

  return { textLength, trimmedTextLength, updateTextLength };
}
