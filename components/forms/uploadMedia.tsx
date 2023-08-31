import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import ReactPlayer from 'react-player';

interface MediaUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };


  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center ">
        {value.map((url) => (
          <div
            key={url}
            className={url.endsWith('.mp4')?`relative w-[600px] h-[300px] flex items-center justify-center rounded-md overflow-hidden`:`relative w-[200px] h-[200px] flex items-center justify-center rounded-md overflow-hidden`}
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  size="icon"
                  variant="destructive"
              >
                <Trash className="h-4 w-4 " />
              </Button>
            </div>

            {url.endsWith('.mp4') ? (
              <ReactPlayer
                url={url}
                controls={true}
                width="600"
                height="600"
              />
            ) : (
              <Image className="object-cover" fill alt="Image" src={url} />
            )}
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="fqkmvzt5">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default MediaUpload;
