import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../../services/backendApi";
import { errorEditingBlog, successfullyEditedBlog } from "../../extras/alerts";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
  });

  const [file, setFile] = useState(null); // can be File object or string URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/edit/${id}`);
        const blog = res.data;

        setForm({
          title: blog.title || "",
          description: blog.description || "",
          category: blog.category || "",
          content: blog.content || "",
        });

        setFile(blog.image_path || null); // set existing image URL or null
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog for edit:", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // new uploaded file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("content", form.content);

      if (file instanceof File) {
        formData.append("image", file);
      }

      await api.put(`/api/blog/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      successfullyEditedBlog();
      navigate("/");
    } catch (err) {
      console.error("Error updating blog:", err);
      errorEditingBlog();
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blog data...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2 h-40"
          placeholder="Description"
          required
        />
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Upload Image
          </label>
          <input type="file" onChange={handleFileChange} className="block" />
          {file &&
            (typeof file === "string" ? (
              <img
                src={`${BASE_URL}${file}`}
                alt="Current"
                className="h-48 w-full object-cover rounded-md my-4"
              />
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="h-48 w-full object-cover rounded-md my-4"
              />
            ))}
        </div>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Category"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border rounded p-2 h-40"
          placeholder="Content"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
