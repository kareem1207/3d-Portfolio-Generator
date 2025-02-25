import { useState } from "react";
import MongoDBConnectionTest from "../components/MongoDBConnectionTest";

export default function MongoDBDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">MongoDB Connection Demo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">MongoDB Connection Setup</h2>
        <p className="mb-4">
          Follow these steps to properly set up your MongoDB connection:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Sign in to your MongoDB Atlas account</li>
          <li>Click "Connect" on your cluster</li>
          <li>Select "Connect your application"</li>
          <li>Copy the connection string</li>
          <li>Replace &lt;password&gt; with your actual password</li>
          <li>
            Add the connection string to your .env.local file as MONGODB_URI
          </li>
          <li>Restart your Next.js server</li>
        </ol>
      </div>

      <MongoDBConnectionTest />
    </div>
  );
}
