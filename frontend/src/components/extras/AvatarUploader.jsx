import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

function AvatarUploader() {
  const { user, setUser } = useUser();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await api.post(
        `/api/upload-avatar/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setUser((prev) => ({ ...prev, avatar_url: res.data.imageUrl }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // If the user is still loading, show a loading indicator or return null
  if (!user) return <div>Loading...</div>; // or null if you prefer to hide the component

  return (
    <div className="relative w-auto h-auto text-center text-xs">
      <img
        src={user?.avatar_url || "/default-avatar.png"}
        alt="avatar"
        className="w-8 h-8 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-center"
      />

      {/* Overlay upload button */}
      <label className="absolute bottom-0 left-0 bg-transparent rounded-full p-5 cursor-pointer shadow-sm">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <span className="text-xs"></span>
      </label>

      {uploading && (
        <div className="relative inset-0 bg-white/50 flex items-center justify-center text-sm rounded-full">
          Uploading...
        </div>
      )}
    </div>
  );
}

export default AvatarUploader;
