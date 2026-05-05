import React from "react";
import "./About.css";

const sections = [
  {
    id: 1,
    label: "01 / Chào mừng",
    dotClass: "dot-1",
    title: "Chào mừng đến với Web Blog",
    body: `Đây là không gian nhỏ của Đặng Ngọc Sơn — nơi mình lưu giữ và chia sẻ những lăng kính cá nhân về sự giao thoa giữa Công nghệ, Nghệ thuật và Ẩm thực đời thường. Dù xuất phát là sinh viên Marketing, thế giới kỹ thuật và những dòng code luôn có một sức hút kỳ lạ. Blog này được xây dựng từ niềm đam mê thực sự — để học, để thực hành, và để kết nối những người có cùng mối quan tâm.`,
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    imgAlt: "Chào mừng đến với Web Blog",
    reverse: false,
  },
  {
    id: 2,
    label: "02 / Khám phá",
    dotClass: "dot-2",
    title: "Những bài viết hay từ mọi người",
    body: `Web Blog là nơi bạn có thể khám phá những bài viết chất lượng, thú vị và đa dạng từ cộng đồng. Từ những góc nhìn về công nghệ, những trải nghiệm sáng tạo trong nghệ thuật, đến những câu chuyện đời thường đáng suy ngẫm — tất cả được tập hợp tại một nơi để bạn dễ dàng đọc, khám phá và tìm thấy điều truyền cảm hứng mỗi ngày.`,
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    imgAlt: "Khám phá bài viết hay",
    reverse: true,
  },
  {
    id: 3,
    label: "03 / Cộng đồng",
    dotClass: "dot-3",
    title: "Viết bài & kết nối mọi người",
    body: `Bạn không chỉ là người đọc — bạn có thể trở thành người viết. Hãy chia sẻ câu chuyện, kiến thức, và góc nhìn của bạn với cộng đồng. Mỗi bài viết là một nhịp cầu kết nối những cá nhân có cùng đam mê, giúp tạo nên một không gian sáng tạo và cởi mở, nơi mọi giọng nói đều có giá trị.`,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    imgAlt: "Viết bài và kết nối",
    reverse: false,
  },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-hero-title">Giới thiệu</h1>
        <p className="about-hero-sub">Web Blog — Nghệ thuật &amp; Công nghệ</p>
      </div>

      {sections.map((sec) => (
        <div
          key={sec.id}
          className={`about-section ${sec.reverse ? "about-section--reverse" : ""}`}
        >
          <div className="about-img-block">
            <img src={sec.img} alt={sec.imgAlt} className="about-img" />
          </div>
          <div className="about-text-block">
            <span className="about-label">{sec.label}</span>
            <div className={`about-dot ${sec.dotClass}`} />
            <h2 className="about-title">{sec.title}</h2>
            <p className="about-body">{sec.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}