import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          Create Your <span className="highlight">3D Portfolio</span>
        </h1>
        <p>Generate, customize, and host your portfolio in minutes</p>
        <div className="cta-buttons">
          <button
            className="primary-btn"
            onClick={() => router.push("/create")}
          >
            Create Portfolio
          </button>
          <button
            className="secondary-btn"
            onClick={() => router.push("/examples")}
          >
            View Examples
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ title, description, image }) => (
  <motion.div
    className="project-card"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

export default function Home() {
  const [projects] = useState([
    {
      title: "Project 1",
      description: "Description of project 1",
      image: "/project1.jpg",
    },
    {
      title: "Project 2",
      description: "Description of project 2",
      image: "/project2.jpg",
    },
  ]);

  return (
    <main className="container">
      <Hero />

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>3D Templates</h3>
            <p>Choose from various 3D templates</p>
          </div>
          <div className="feature-card">
            <h3>Easy Customization</h3>
            <p>Customize colors, layout, and content</p>
          </div>
          <div className="feature-card">
            <h3>One-Click Deploy</h3>
            <p>Host your portfolio instantly</p>
          </div>
        </div>
      </section>

      <section className="projects">
        <h2>My Projects</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <section className="contact">
        <h2>Contact Me</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}
