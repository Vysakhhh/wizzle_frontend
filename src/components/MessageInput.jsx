import React, { useRef, useState } from 'react';
import { X, FileImage, Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

function MessageInput({ isGroup = false }) {
  const [text, setText] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    sendMessages,
    sendGroupMessages,
    selectedUser,
    selectedGroup
  } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgPreview) return;

    try {
      await (isGroup
        ? sendGroupMessages(selectedGroup._id, {
          text: text.trim(),
          image: imgPreview,
        })
        : sendMessages({
          receiverId: selectedUser._id,
          text: text.trim(),
          image: imgPreview,
        }));

      setText('');
      setImgPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };


  return (
    <div className="p-4 w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt=""
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder={isGroup ? "Message the group..." : "Type a message..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex btn btn-circle ${imgPreview ? "text-emerald-500" : "text-zinc-400"
              } sm:text-lg text-sm`}
            onClick={() => fileInputRef.current?.click()} >
            <FileImage size={20} />
            
          </button>

        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imgPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
