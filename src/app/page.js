"use client";
import Modal from "@/components/modal";
import { useState } from "react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export default function Home() {
  const SERVER_URL = "http://localhost:3000";

  const [email, setEmail] = useState("");
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const openModal = (message) => {
    setModalText(message);
    setIsModalOpen(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const initResponse = await fetch(`/api/init-register?email=${email}`, {
        credentials: "include",
      });

      const options = await initResponse.json();
      if (!initResponse.ok) {
        openModal(options.error || "Registration initiation failed.");
        return;
      }

      const registrationJSON = await startRegistration(options);

      const verifyResponse = await fetch(`${SERVER_URL}/api/verify-register`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationJSON),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        openModal(verifyData.error || "Registration verification failed.");
      } else if (verifyData.verified) {
        openModal("User registered successfully");
      } else {
        openModal("User registration failed");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      openModal("An unexpected error occurred.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const initResponse = await fetch(`/api/init-auth?email=${email}`, {
        credentials: "include",
      });

      const options = await initResponse.json();
      if (!initResponse.ok) {
        openModal(options.error || "Authentication initiation failed.");
        return;
      }

      const authJSON = await startAuthentication(options);

      const verifyResponse = await fetch(`${SERVER_URL}/api/verify-auth`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authJSON),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        openModal(verifyData.error || "Authentication verification failed.");
      } else if (verifyData.verified) {
        openModal("User logged in successfully");
      } else {
        openModal("User login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      openModal("An unexpected error occurred.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <h3 className="text-3xl font-bold">Enter your Email</h3>
      <form onSubmit={handleSignUp} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-gray-300 p-2 rounded-md mt-2"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <div className="flex space-x-4 mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>

      {isModalOpen && (
        <Modal open={isModalOpen} text={modalText} onClose={handleCloseModal} />
      )}
    </div>
  );
}
