import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import "./Write.css";

const Write = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handlePublish = async () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề!");
      return;
    }
    if (!content.trim()) {
      alert("Vui lòng nhập nội dung!");
      return;
    }
    setLoading(true);
    try {
      await createPost({
        title: title,
        desc: content,
        img:
          preview ||
          "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg",
      });
      alert("Đăng bài thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng bài:", err);
      alert("Đăng bài thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-page">
      {/* ── Left: Editor ── */}
      <div className="write-content">
        <input
          className="write-title"
          type="text"
          placeholder="Tiêu đề bài viết..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="write-divider" />
        <textarea
          className="write-body"
          placeholder="Chia sẻ câu chuyện của bạn..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="write-wordcount">{wordCount} từ</div>
      </div>

      {/* ── Right: Sidebar ── */}
      <aside className="write-sidebar">
        {/* Ảnh bìa */}
        <div className="write-card">
          <p className="write-card-label">Ảnh bìa</p>
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
          {preview ? (
            <div className="write-preview-wrap">
              <img src={preview} alt="preview" className="write-preview" />
              <label htmlFor="file" className="write-change-img">
                Đổi ảnh
              </label>
            </div>
          ) : (
            <label htmlFor="file" className="write-upload-box">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Tải ảnh lên</span>
            </label>
          )}
        </div>

        {/* Cài đặt */}
        <div className="write-card">
          <p className="write-card-label">Cài đặt</p>
          <div className="write-setting-row">
            <span className="write-setting-key">Trạng thái</span>
            <span className="write-badge write-badge--draft">Bản nháp</span>
          </div>
          <div className="write-setting-row">
            <span className="write-setting-key">Chế độ</span>
            <div
              className="write-toggle"
              onClick={() => setIsPublic(!isPublic)}
            >
              <div
                className={`write-toggle-track ${isPublic ? "write-toggle-track--on" : ""}`}
              >
                <div className="write-toggle-thumb" />
              </div>
              <span className="write-toggle-label">
                {isPublic ? "Công khai" : "Riêng tư"}
              </span>
            </div>
          </div>
        </div>

        {/* Hành động */}
        <div className="write-actions">
          <button className="write-btn-draft">Lưu nháp</button>
          <button
            className="write-btn-publish"
            onClick={handlePublish}
            disabled={loading}
          >
            {loading ? "Đang đăng..." : "Đăng bài viết"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Write;
