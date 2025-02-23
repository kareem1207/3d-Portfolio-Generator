"use client";
import { useState, useEffect } from "react";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/contentForm.module.css";

const defaultFormData = {
  name: "",
  title: "",
  bio: "",
  skills: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
};

export default function ContentForm({ onUpdate }) {
  const { setUserData, userData } = usePortfolioStore();
  const [formData, setFormData] = useState(() => ({
    ...defaultFormData,
    ...userData,
    socialLinks: {
      ...defaultFormData.socialLinks,
      ...(userData?.socialLinks || {}),
    },
  }));

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        ...userData,
        socialLinks: {
          ...prev.socialLinks,
          ...(userData.socialLinks || {}),
        },
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    setUserData(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3>Personal Information</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="title">Professional Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Full Stack Developer"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="bio">Professional Summary</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Brief description about yourself..."
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Three.js, Node.js"
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3>Social Links</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="github">GitHub</label>
          <input
            type="url"
            id="github"
            name="socialLinks.github"
            value={formData.socialLinks?.github || ""}
            onChange={handleChange}
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="socialLinks.linkedin"
            value={formData.socialLinks?.linkedin || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourusername"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="url"
            id="twitter"
            name="socialLinks.twitter"
            value={formData.socialLinks?.twitter || ""}
            onChange={handleChange}
            placeholder="https://twitter.com/yourusername"
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Save & Preview
      </button>
    </form>
  );
}
