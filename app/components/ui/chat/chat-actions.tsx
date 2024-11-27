import { PauseCircle, RefreshCw } from "lucide-react";

import { Button } from "../button";
import { ChatHandler } from "./chat.interface";

export default function ChatActions(
  props: Pick<ChatHandler, "stop" | "reload"> & {
    showReload?: boolean;
    showStop?: boolean;
  },
) {
  return (
    <div className="flex items-center space-x-3 w-full">
      {props.showStop && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={props.stop}
          className="
            flex items-center 
            bg-white 
            border-gray-300 
            text-gray-700 
            hover:bg-gray-50 
            hover:border-gray-400 
            transition-all 
            duration-200 
            group
          "
        >
          <PauseCircle 
            className="
              mr-2 
              h-4 
              w-4 
              text-gray-500 
              group-hover:text-gray-700 
              transition-colors
            " 
          />
          Stop generating
        </Button>
      )}
      {props.showReload && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={props.reload}
          className="
            flex items-center 
            bg-white 
            border-gray-300 
            text-gray-700 
            hover:bg-gray-50 
            hover:border-gray-400 
            transition-all 
            duration-200 
            group
          "
        >
          <RefreshCw 
            className="
              mr-2 
              h-4 
              w-4 
              text-gray-500 
              group-hover:text-gray-700 
              group-hover:animate-spin 
              transition-colors
            " 
          />
          Regenerate
        </Button>
      )}
    </div>
  );
}