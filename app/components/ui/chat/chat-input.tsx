import { useState } from "react";
import { Button } from "../button";
import FileUploader from "../file-uploader";
import { Input } from "../input";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import { Send, Paperclip } from "lucide-react";

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
  > & {
    multiModal?: boolean;
  },
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (imageUrl) {
      props.handleSubmit(e, {
        data: { imageUrl: imageUrl },
      });
      setImageUrl(null);
      return;
    }
    props.handleSubmit(e);
  };

  const onRemovePreviewImage = () => setImageUrl(null);

  const handleUploadImageFile = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    setImageUrl(base64);
  };

  const handleUploadFile = async (file: File) => {
    try {
      if (props.multiModal && file.type.startsWith("image/")) {
        return await handleUploadImageFile(file);
      }
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={onSubmit}
        className="
          bg-white 
          border 
          border-gray-200 
          rounded-2xl 
          shadow-sm 
          overflow-hidden 
          transition-all 
          duration-300 
          hover:shadow-md
        "
      >
        {imageUrl && (
          <div className="p-3 border-b border-gray-100">
            <UploadImagePreview 
              url={imageUrl} 
              onRemove={onRemovePreviewImage} 
            />
          </div>
        )}
        
        <div className="flex items-center p-3 space-x-2">
          <FileUploader
            onFileUpload={handleUploadFile}
            onFileError={props.onFileError}
          >
            <div className="
              text-gray-500 
              hover:text-gray-700 
              hover:bg-gray-100 
              p-2 
              rounded-full 
              transition-colors
              cursor-pointer
            ">
              <Paperclip className="h-5 w-5" />
            </div>
          </FileUploader>
          
          <Input
            autoFocus
            name="message"
            placeholder="Type a message"
            className="
              flex-1 
              border-none 
              focus:ring-0 
              focus:outline-none 
              placeholder-gray-400
            "
            value={props.input}
            onChange={props.handleInputChange}
          />
          
          <Button
            type="submit"
            disabled={props.isLoading}
            className="
              bg-blue-500 
              text-white 
              hover:bg-blue-600 
              rounded-full 
              p-2 
              transition-colors
              group
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <Send 
              className="
                h-5 
                w-5 
                group-hover:scale-105 
                transition-transform
              " 
            />
          </Button>
        </div>
      </form>
    </div>
  );
}