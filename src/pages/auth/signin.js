import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import styles from "@/styles/auth.module.css";
import { useRouter } from "next/router";
import { useSession, useEffect } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = (provider) => {
    signIn(provider, {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (session) return null;

  return (
    <div className={styles.authContainer}>
      <motion.div
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to manage your 3D portfolio</p>

        <div className={styles.oauthButtons}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSignIn("google")}
            className={styles.googleBtn}
          >
            <FcGoogle size={24} />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSignIn("github")}
            className={styles.githubBtn}
          >
            <FaGithub size={24} />
            Continue with GitHub
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
