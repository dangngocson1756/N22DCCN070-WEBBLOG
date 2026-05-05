import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/postApi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgot = (e) => {
    e.preventDefault();
    setForgotSent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          alert("Mật khẩu xác nhận không khớp!");
          setLoading(false);
          return;
        }
        await register({ name, email, password });
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setMode("login");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const res = await login({ email, password });
        localStorage.setItem("user", JSON.stringify(res.data));
        alert(`Chào mừng ${res.data.name}!`);
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data) {
        alert(err.response.data);
      } else {
        alert("Có lỗi xảy ra, thử lại nhé!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showForgot) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-brand">
            <span className="login-logo">Web Blog</span>
            <p className="login-tagline">Nghệ thuật &amp; Công nghệ</p>
          </div>

          {forgotSent ? (
            <div className="login-success">
              <div className="login-success-icon">✓</div>
              <h2 className="login-success-title">Đã gửi email!</h2>
              <p className="login-success-body">
                Kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.
              </p>
              <button
                className="login-btn"
                onClick={() => {
                  setShowForgot(false);
                  setForgotSent(false);
                }}
              >
                Quay lại đăng nhập
              </button>
            </div>
          ) : (
            <>
              <div className="login-header">
                <h1 className="login-title">Quên mật khẩu?</h1>
                <p className="login-subtitle">
                  Nhập email và mình sẽ gửi link đặt lại mật khẩu.
                </p>
              </div>
              <form className="login-form" onSubmit={handleForgot}>
                <div className="login-field">
                  <label className="login-label">Email</label>
                  <input
                    className="login-input"
                    type="email"
                    placeholder="ten@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="login-btn" type="submit">
                  Gửi link đặt lại
                </button>
              </form>
              <p className="login-switch">
                <button
                  className="login-link"
                  onClick={() => setShowForgot(false)}
                >
                  ← Quay lại đăng nhập
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo">Web Blog</span>
          <p className="login-tagline">Nghệ thuật &amp; Công nghệ</p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${mode === "login" ? "login-tab--active" : ""}`}
            onClick={() => setMode("login")}
          >
            Đăng nhập
          </button>
          <button
            className={`login-tab ${mode === "register" ? "login-tab--active" : ""}`}
            onClick={() => setMode("register")}
          >
            Đăng ký
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="login-field">
              <label className="login-label">Họ và tên</label>
              <input
                className="login-input"
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="ten@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label">Mật khẩu</label>
              {mode === "login" && (
                <button
                  type="button"
                  className="login-link"
                  onClick={() => setShowForgot(true)}
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === "register" && (
            <div className="login-field">
              <label className="login-label">Xác nhận mật khẩu</label>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? "Đang xử lý..."
              : mode === "login"
                ? "Đăng nhập"
                : "Tạo tài khoản"}
          </button>
        </form>

        <p className="login-switch">
          {mode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button
            className="login-link"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </p>
      </div>
    </div>
  );
}
