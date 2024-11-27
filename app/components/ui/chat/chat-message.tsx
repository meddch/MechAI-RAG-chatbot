import { Check, Copy } from "lucide-react";
import { JSONValue, Message } from "ai";
import Image from "next/image";
import { Button } from "../button";
import ChatAvatar from "./chat-avatar";
import Markdown from "./markdown";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

interface ChatMessageImageData {
  type: "image_url";
  image_url: {
    url: string;
  };
}

function ChatMessageData({ messageData }: { messageData: JSONValue }) {
  const { image_url, type } = messageData as unknown as ChatMessageImageData;
  if (type === "image_url") {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-md max-w-[250px] transition-transform hover:scale-105">
        <Image
          src={image_url.url}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover"
          alt="Shared image"
        />
      </div>
    );
  }
  return null;
}

export default function ChatMessage(chatMessage: Message) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="shrink-0">
        <ChatAvatar role={chatMessage.role} />
      </div>
      <div className="group flex-1 relative">
        <div className="space-y-3">
          {chatMessage.data && (
            <div className="flex justify-start">
              <ChatMessageData messageData={chatMessage.data} />
            </div>
          )}
          <div className="prose prose-neutral max-w-full">
            <Markdown content={chatMessage.content} />
          </div>
        </div>
        
        <Button
          onClick={() => copyToClipboard(chatMessage.content)}
          size="icon"
          variant="outline"
          className="absolute top-0 right-0 
            h-8 w-8 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            bg-white/80 
            hover:bg-gray-100 
            border-gray-200"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>
    </div>
  );
}