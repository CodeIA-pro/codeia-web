import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { IconButton, TextareaAutosize } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { EditGuide } from '../../interfaces/guide/guide.interface';
import { useEditMarkdown } from '../../queries/useGuide';
import { validateMarkdown } from '../../utils/filtered';
import { useNotification } from '../../hooks/useNotification';

interface MarkdownProps {
  markdownText: EditGuide;
  onUpdate?: (updatedMarkdown: EditGuide) => void;
}

const MarkdownShare: React.FC<MarkdownProps> = ({ markdownText, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {mutate} = useEditMarkdown();
  const {getError} = useNotification();
  const [editableText, setEditableText] = useState(markdownText.markdownText || '');

  useEffect(() => {
    setEditableText(markdownText.markdownText || '');
  }, [markdownText]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdate) {
      if(markdownText.asset_id !== 0){
        if(!validateMarkdown(editableText)){
          mutate({ markdownText: editableText, asset_id: markdownText.asset_id });
        }else{
          getError('Invalid markdown syntax');
        }
      }
      onUpdate({ markdownText: editableText, asset_id: markdownText.asset_id });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(event.target.value);
  };

  const getMarkdownText = () => {
    const safeText = markdownText.markdownText || '';
    const rawMarkup = marked(safeText);
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup.toString());
    return { __html: sanitizedMarkup };
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextareaAutosize
            value={editableText}
            onChange={handleChange}
            style={{ width: '60vw', height: '300px' }}
          />
          <IconButton onClick={handleSave} color="primary">
            <CheckIcon />
          </IconButton>
        </div>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={getMarkdownText()} />
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default MarkdownShare;
