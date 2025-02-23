import { useState } from "react";
import styles from "@/styles/content.module.css";

export default function ContentForm({ onUpdate }) {
  const [content, setContent] = useState({
    personal: {
      name: "",
      title: "",
      bio: "",
      email: "",
      location: "",
    },
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      portfolio: "",
    },
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
        image: null,
      },
    ],
  });

  const handlePersonalChange = (key, value) => {
    setContent((prev) => ({
      ...prev,
      personal: { ...prev.personal, [key]: value },
    }));
    onUpdate({ ...content, personal: { ...content.personal, [key]: value } });
  };

  const handleSocialChange = (platform, value) => {
    setContent((prev) => ({
      ...prev,
      social: { ...prev.social, [platform]: value },
    }));
    onUpdate({ ...content, social: { ...content.social, [platform]: value } });
  };

  const handleProjectChange = (index, key, value) => {
    const updatedProjects = [...content.projects];
    updatedProjects[index] = { ...updatedProjects[index], [key]: value };
    setContent((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
    onUpdate({ ...content, projects: updatedProjects });
  };

  const addProject = () => {
    setContent((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", description: "", technologies: "", link: "", image: null },
      ],
    }));
  };

  return (
    <div className={styles.contentForm}>
      <section className={styles.personalInfo}>
        <h3>Personal Information</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={content.personal.name}
          onChange={(e) => handlePersonalChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Professional Title"
          value={content.personal.title}
          onChange={(e) => handlePersonalChange("title", e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={content.personal.bio}
          onChange={(e) => handlePersonalChange("bio", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={content.personal.email}
          onChange={(e) => handlePersonalChange("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={content.personal.location}
          onChange={(e) => handlePersonalChange("location", e.target.value)}
        />
      </section>

      <section className={styles.socialLinks}>
        <h3>Social Links</h3>
        {Object.keys(content.social).map((platform) => (
          <input
            key={platform}
            type="url"
            placeholder={`${
              platform.charAt(0).toUpperCase() + platform.slice(1)
            } URL`}
            value={content.social[platform]}
            onChange={(e) => handleSocialChange(platform, e.target.value)}
          />
        ))}
      </section>

      <section className={styles.projects}>
        <h3>Projects</h3>
        {content.projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, "description", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) =>
                handleProjectChange(index, "technologies", e.target.value)
              }
            />
            <input
              type="url"
              placeholder="Project Link"
              value={project.link}
              onChange={(e) =>
                handleProjectChange(index, "link", e.target.value)
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleProjectChange(index, "image", e.target.files[0])
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className={styles.addProjectBtn}
        >
          Add Project
        </button>
      </section>
    </div>
  );
}
