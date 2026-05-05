import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SinglePost.css';

const SinglePost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;

  if (!post) {
    return (
      <div className="sp-notfound">
        <p>Không tìm thấy bài viết.</p>
        <button onClick={() => navigate('/')}>← Về trang chủ</button>
      </div>
    );
  }

  const isGamePost = !!post.content;

  return (
    <article className={`sp-page ${isGamePost ? 'sp-page--game' : ''}`}>
      {/* Ảnh bìa */}
      <div className="sp-hero">
        <img src={post.img} alt={post.title} className="sp-hero-img" />
        <div className="sp-hero-overlay" />
        {isGamePost && (
          <h1 className="sp-hero-title">{post.title}</h1>
        )}
      </div>

      {/* Nội dung */}
      <div className={`sp-body ${isGamePost ? 'sp-body--game' : ''}`}>
        {/* Meta */}
        <div className="sp-meta">
          <button className="sp-back" onClick={() => navigate(-1)}>← Quay lại</button>
          <span className={`sp-category ${isGamePost ? 'sp-category--game' : ''}`}>
            {isGamePost ? 'Liên Quân Mobile' : 'Bài viết'}
          </span>
        </div>

        {/* Tiêu đề (chỉ hiện nếu không phải game post) */}
        {!isGamePost && <h1 className="sp-title">{post.title}</h1>}

        {/* Tác giả */}
        <div className="sp-author-row">
          <div className={`sp-avatar ${isGamePost ? 'sp-avatar--game' : ''}`}>ĐS</div>
          <div>
            <p className="sp-author-name">Đặng Ngọc Sơn</p>
            <p className="sp-author-date">08 tháng 4, 2026 · 3 phút đọc</p>
          </div>
        </div>

        <div className="sp-divider" />

        {/* Nội dung */}
        {isGamePost ? (
          <div
            className="sp-rich-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="sp-content">
            <p>{post.desc}</p>
            <p>
              Đây là nơi bạn có thể mở rộng nội dung bài viết. Trong tương lai, khi kết nối
              với database, toàn bộ nội dung đầy đủ sẽ được tải và hiển thị tại đây.
            </p>
            <p>
              Mỗi bài viết là một câu chuyện — được chia sẻ từ trải nghiệm thực tế, niềm đam
              mê cá nhân, và mong muốn kết nối với những người có cùng mối quan tâm.
            </p>
          </div>
        )}

        <div className="sp-divider" />

        {/* Tags */}
        <div className="sp-tags">
          {isGamePost ? (
            <>
              <span className="sp-tag sp-tag--game">Liên Quân Mobile</span>
              <span className="sp-tag sp-tag--game">Cập nhật</span>
              <span className="sp-tag sp-tag--game">LỄ HỘI 5v5</span>
            </>
          ) : (
            <>
              <span className="sp-tag">Công nghệ</span>
              <span className="sp-tag">Nghệ thuật</span>
              <span className="sp-tag">Ẩm thực</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default SinglePost;