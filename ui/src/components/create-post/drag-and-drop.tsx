import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { includes } from 'lodash';
import { BsBoxArrowUp, BsXCircleFill } from 'react-icons/bs';
import './post-ad.css';
import { DragAndDropProps, Media } from '.';
import { useAxios } from '../../services/base-service';

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  updateMedia,
}: DragAndDropProps): React.ReactElement => {
  const [media, setMedia] = useState<Media[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [{ data: mediaData }, executeMedia] = useAxios({
    url: '/product/media',
    method: 'POST',
  });

  const uploadFiles = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append('media', file);
      try {
        await executeMedia({ data: formData });
      } catch (error: any) { }
      formData.delete('media');
    }
  }

  useEffect(() => {
    if (mediaData?.Success && !includes(media, {
      token: mediaData?.media.token,
      url: mediaData?.media.token,
      mime: mediaData.media?.mime,
    })) {
      setMedia([
        ...media,
        {
          token: mediaData.media.token,
          url: mediaData.media.url,
          mime: mediaData.media?.mime,
        }
      ]);
    }
  }, [mediaData]);

  useEffect(() => {
    updateMedia(media);
  }, [media]);

  useEffect(() => {
    uploadFiles();
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, video/*',
    onDrop: acceptedFiles => {
      const newFiles: File[] = [];
      newFiles.push(...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setFiles([...newFiles]);
    }
  });

  const handleCloseButtonClick = (index: number) => {
    const newMedia = media;
    newMedia.splice(index, 1);
    setMedia([...newMedia]);
  }

  const imagePreview = () => {
    return media.map((file: any, index: number) => (
      <div key={file.token} className="thumb">
        <div className="thumb-inner">
          {console.log(file.mime, '1112222')}
          {file.mime?.includes('video') ? (
            <video className='video' poster='placeholder.png' controls>
              <source src={file.url} type="video/*" />
            </video>
          ) : (
            <img src={file.url} className="img" />
          )}
          <BsXCircleFill
            onClick={() => handleCloseButtonClick(index)}
            className="close-button"
          />
        </div>
      </div>
    ));
  }

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