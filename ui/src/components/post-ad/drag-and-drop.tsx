import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsBoxArrowUp } from 'react-icons/bs';
import './post-ad.css';

export const DragAndDrop: React.FC = (): React.ReactElement => {

  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  });

  const thumbs = files.map((file: any) => (
    <div key={file.name} className="thumb">
      <div className="thumb-inner">
        <img
          src={file.preview}
          className="img"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="shadow p-3 p-lg-5 h-100">
      <div {...getRootProps({ className: 'drag-n-drop' })}>
        <BsBoxArrowUp style={{ width: "40px", height: "40px" }} />
        <input {...getInputProps()} />
        <p>Select or drag photos/videos here</p>
        <p className="upload-limit-text">(Up to 10 files)</p>
      </div>
      <aside className="thumbs-container">
        {thumbs}
      </aside>
    </div>
  );
};