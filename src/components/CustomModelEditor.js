import { useState } from "react";
import { validateModelCode } from "@/utils/modelValidator";
import styles from "@/styles/customModelEditor.module.css";

export default function CustomModelEditor({ onCodeSubmit }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = validateModelCode(code);
    if (result.isValid) {
      onCodeSubmit(result.code);
      setError("");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.editor}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Enter your Three.js model code here
// Example:
new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#ff0000' })
)"
        rows={10}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button onClick={handleSubmit}>Add Custom Model</button>
    </div>
  );
}
