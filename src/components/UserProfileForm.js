"use client";
import { useState } from "react";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/userProfileForm.module.css";

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

export default function UserProfileForm() {
  const { setUserData, userData } = usePortfolioStore();
  const [formData, setFormData] = useState(() => ({
    ...defaultFormData,
    ...userData,
    socialLinks: {
      ...defaultFormData.socialLinks,
      ...(userData?.socialLinks || {}),
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
  };

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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
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

      <div className={styles.formGroup}>
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

      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="skills">Skills (comma separated)</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="React, Node.js, Three.js"
        />
      </div>

      <div className={styles.socialLinks}>
        <label>Social Links</label>
        <input
          type="url"
          name="socialLinks.github"
          value={formData.socialLinks.github}
          onChange={handleChange}
          placeholder="GitHub URL"
        />
        <input
          type="url"
          name="socialLinks.linkedin"
          value={formData.socialLinks.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
        />
        <input
          type="url"
          name="socialLinks.twitter"
          value={formData.socialLinks.twitter}
          onChange={handleChange}
          placeholder="Twitter URL"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Save Profile
      </button>
    </form>
  );
}
