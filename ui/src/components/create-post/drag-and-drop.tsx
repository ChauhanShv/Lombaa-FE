import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsBoxArrowUp } from 'react-icons/bs';
import './post-ad.css';

interface DragAndDropProps {
  onFilesUpload: (files: Array<Blob>) => void;
};

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  onFilesUpload
}: DragAndDropProps): React.ReactElement => {
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const newFiles: any[] = files;
      newFiles.push(...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setFiles([...newFiles]);
    }
  });

  const imagePreview = () => {
    return files.map((file: any) => (
      <div key={file.name} className="thumb">
        <div className="thumb-inner">
          <img
            src={file.preview}
            className="img"
          />
        </div>
      </div>
    ));
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    if (files.length) {
      onFilesUpload(files);
    }
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
        {imagePreview()}
      </aside>
    </div>
  );
};