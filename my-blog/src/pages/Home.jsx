import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../api/postApi";
import anhLienQuan from "../assets/lienquan.jpg";

const defaultPosts = [
  {
    id: 1,
    title: "Trái Nho: Biến tấu ngọt ngào trong thế giới ẩm thực",
    desc: "Không chỉ là một loại trái cây thanh mát, những chùm nho căng mọng còn là nguồn cảm hứng tuyệt vời trong gian bếp. Từ món salad nho xanh giòn rụm, bánh tart nho nướng thơm lừng đến những ly phô mai tươi rưới xốt nho đen ngọt lịm, trái nho luôn mang đến hương vị bùng nổ cho người thưởng thức.",
    img: "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: null,
  },
  {
    id: 2,
    title:
      "Hoài niệm về sự tập trung và tối giản: Chiếc máy ảnh cơ giữa dòng chảy công nghệ",
    desc: "Giữa một thế giới luôn tràn ngập thông báo, tin nhắn và email, khi sự phân tâm trở thành một phần của cuộc sống, một nhà thiết kế người Ý đã tìm về quá khứ để tìm kiếm lại sự tập trung.",
    img: "https://images.pexels.com/photos/1769738/pexels-photo-1769738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: null,
  },
  {
    id: 3,
    title: "CHI TIẾT BẢN CẬP NHẬT LỄ HỘI 5v5 08.04.2026",
    desc: "Liên Quân Mobile sẽ tiến hành cập nhật không gián đoạn vào ngày 08.04.2026. Người chơi có thể tự chọn thời điểm cập nhật trong thời gian cho phép.",
    img: anhLienQuan,
    content: null,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Ghép bài từ API vào sau defaultPosts
          setPosts([...defaultPosts, ...res.data]);
        }
      })
      .catch((err) => console.error("Lỗi load bài viết:", err));
  }, []);

  const handleReadMore = (post) => {
    navigate(`/post/${post.id}`, { state: { post } });
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{post.desc}</p>
              <button onClick={() => handleReadMore(post)}>Read More</button>
            </div>
            <div className="img-container">
              <img src={post.img} alt={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
