import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
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

  const [{ data: mediaData, loading: mediaLoading }, executeMedia] = useAxios({
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
    if (mediaData?.success && !includes(media, {
      token: mediaData?.media.token,
      url: mediaData?.media.token,
      mime: mediaData.media?.mime,
      isPrimary: false,
    })) {
      setMedia([
        ...media,
        {
          token: mediaData.media.token,
          url: mediaData.media.url,
          mime: mediaData.media?.mime,
          isPrimary: !!media.length ? false : true,
        }
      ]);
    }
  }, [mediaData]);

  useEffect(() => {
    updateMedia(media);
  }, [media]);

  useEffect(() => {
    setMedia([]);
    uploadFiles();
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/jpg, video/mp4',
    onDrop: acceptedFiles => {
      const newFiles: File[] = files;
      newFiles.push(...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setFiles([...newFiles]);
    },
    maxFiles: 10,
  });

  const handlePrimaryMedia = (index: number) => {
    const newMedia = media;
    newMedia.map((mediaFile: Media, index: number) => {
      mediaFile.isPrimary = false;
    });
    newMedia[index].isPrimary = true;
    setMedia([...newMedia]);
  }

  const handleCloseButtonClick = (index: number) => {
    const newMedia = media;
    newMedia.splice(index, 1);
    setMedia([...newMedia]);
    const newFiles = files;
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  }

  const imagePreview = () => {
    return (
      <>
        {files.map((file: any, index: number) => (
          <div key={file.name} className="thumb">
            <div className="thumb-inner">
              {file.type?.includes('video') ? (
                <video className='video' controls onClick={() => handlePrimaryMedia(index)}>
                  <source src={file.preview} type="video/mp4" />
                  <source src={file.preview} type="video/webm" />
                </video>
              ) : (
                <div>
                  <img src={file.preview} className="img" onClick={() => handlePrimaryMedia(index)} />
                </div>
              )}
              <BsXCircleFill
                onClick={() => handleCloseButtonClick(index)}
                className="close-button"
              />
              {!!media.length && media[index]?.isPrimary && <div className="primary-label">Primary</div>}
            </div>
          </div>
        )
        )}
      </>
    );
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
        {mediaLoading ? (
          <div><Spinner animation="border" />Uploading... Please wait</div>
        ) : <div>{''}</div>}
      </aside>
    </div>
  );
};