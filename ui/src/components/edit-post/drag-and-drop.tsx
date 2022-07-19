import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { includes } from 'lodash';
import { BsBoxArrowUp, BsXCircleFill } from 'react-icons/bs';
import { DragAndDropProps, Media } from './types';
import { useAxios } from '../../services/base-service';
import { ProductMedia } from '../product-detail/types';

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  updateMedia,
  productDetail,
}: DragAndDropProps): React.ReactElement => {
  const [media, setMedia] = useState<Media[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { productId } = useParams<{ productId: string }>();

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
    const newProductMedia: Media[] = [];
    const newProductFile: File[] = [];
    if (!!productDetail?.productMedia?.length) {
      for (const productMedia of productDetail?.productMedia) {
        newProductMedia.push({
          ...productMedia?.file,
          token: productMedia?.token
        });
      }
    }
    setMedia([...newProductMedia]);
  }, []);

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

  const productMedia = () => {
    return (
      <>
        {productDetail?.productMedia?.map((media: ProductMedia, index: number) => (
          <div key={media.fileId} className="thumb">
            <div className="thumb-inner">
              {media.file.mime.includes('video') ? (
                <video className='video' controls>
                  <source src={media.file.url} type="video/mp4" />
                  <source src={media.file.url} type="video/webm" />
                </video>
              ) : (
                <div>
                  <img
                    src={media.file.url}
                    className="img"
                    onClick={() => handlePrimaryMedia(index)}
                  />
                </div>
              )}
              <BsXCircleFill
                onClick={() => handleCloseButtonClick(index)}
                className="close-button"
              />
              {!!productDetail?.productMedia?.length && media?.isPrimary &&
                <div className="primary-label">
                  Primary
                </div>
              }
            </div>
          </div>
        ))}
      </>
    );
  }

  const imagePreview = () => {
    return (
      <>
        {files.map((file: any, index: number) => (
          <div key={file.name} className="thumb">
            <div className="thumb-inner">
              {file.type?.includes('video') ? (
                <video className='video' controls>
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
        ))}
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
        {!!files.length ? imagePreview() : productMedia()}
        {mediaLoading ? (
          <div><Spinner animation="border" />Uploading... Please wait</div>
        ) : <div>{''}</div>}
      </aside>
    </div>
  );
};