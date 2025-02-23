"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import styles from "@/styles/auth.module.css";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = async (provider) => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }

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
            disabled={isLoading}
          >
            <FcGoogle size={24} />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSignIn("github")}
            className={styles.githubBtn}
            disabled={isLoading}
          >
            <FaGithub size={24} />
            Continue with GitHub
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
