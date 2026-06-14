import {
  Link,
} from "react-router-dom";

import {
  BsClipboardCheck,
  BsPeople,
  BsClock,
  BsBarChart,
  BsArrowRight,
} from "react-icons/bs";

import logo from "../assets/logo.png";

import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="landing-page">

      <nav className="landing-navbar">

        <div className="landing-brand">

          <img
            src={logo}
            alt="Celestial Logo"
          />

          <div>
            <h2>
              Student Task Tracker
            </h2>

            <p>
              Turn Chaos Into Clarity
            </p>

            <p>
              by Celestial Team
            </p>
          </div>

        </div>

        <div className="landing-nav-actions">

          <Link
            to="/login"
            className="landing-login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="landing-register"
          >
            Register
          </Link>

        </div>

      </nav>

      <section className="landing-hero">

        <div className="landing-hero-text">

          <span className="landing-badge">
            Academic Project Management
          </span>

          <h1>
            Kelola tugas kuliah dan kerja kelompok dalam satu aplikasi.
          </h1>

          <p>
            Student Task Tracker membantu mahasiswa mengatur tugas pribadi,
            workspace kelompok, checklist progress, deadline risk, dan focus mode.
          </p>

          <div className="landing-hero-actions">

            <Link
              to="/register"
              className="primary-cta"
            >
              Get Started
              <BsArrowRight />
            </Link>

            <Link
              to="/login"
              className="secondary-cta"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="landing-hero-card">

          <img
            src={logo}
            alt="Celestial Logo"
          />

          <h3>
            Focus. Track. Collaborate.
          </h3>

          <p>
            Track your tasks. Focus on priorities. Collaborate effectively.
          </p>

        </div>

      </section>

      <section className="landing-features">

        <div className="feature-card">

          <BsClipboardCheck />

          <h3>
            Task Management
          </h3>

          <p>
            Tambah, edit, filter, dan pantau tugas kuliah dengan prioritas otomatis.
          </p>

        </div>

        <div className="feature-card">

          <BsPeople />

          <h3>
            Team Workspace
          </h3>

          <p>
            Gabung workspace kelompok menggunakan kode task dan pantau member.
          </p>

        </div>

        <div className="feature-card">

          <BsBarChart />

          <h3>
            Checklist Progress
          </h3>

          <p>
            Lihat progres checklist dan kontribusi anggota dalam tugas kelompok.
          </p>

        </div>

        <div className="feature-card">

          <BsClock />

          <h3>
            Focus Mode
          </h3>

          <p>
            Timer Pomodoro tetap berjalan walaupun berpindah halaman.
          </p>

        </div>

      </section>

      <footer className="landing-footer">

        <p>
          Student Task Tracker — Turn Chaos Into Clarity
        </p>

            <p>
                by Celestial Team
            </p>

      </footer>

    </div>
  );
}

export default LandingPage;