import { useState } from "react";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/userDataForm.module.css";

export default function UserDataForm() {
  const { userData, setUserData } = usePortfolioStore();
  const [formData, setFormData] = useState(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">Professional Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="contact">Contact Information</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Save Information
      </button>
    </form>
  );
}
