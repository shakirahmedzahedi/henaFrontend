import React from "react";
import { IconButton } from "@mui/material"; // Material-UI for the button
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // WhatsApp Icon from Material-UI Icons
import ChatIcon from "@mui/icons-material/Chat";

const FloatingWhatsupButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "8801903652681"; // Replace with the target WhatsApp number
    const message = "Hello! I need assistance."; // Default message
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappURL, "_blank");
  };
  const handleLiveChatClick = () => {
    // Logic to open your Live Chat functionality
    alert("Live Chat button clicked! Under construction");
    // Example: Open a live chat widget or redirect to a live chat page
  };

  return (
    <div style={styles.floatingButtonsContainer}>
      {/* WhatsApp Button */}
      <IconButton
        color="info"
        onClick={handleWhatsAppClick}
        style={styles.whatsappButton}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>

      {/* Live Chat Button */}
      <IconButton
        color="primary"
        onClick={handleLiveChatClick}
        style={styles.liveChatButton}
      >
        <ChatIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

const styles = {
    floatingButtonsContainer: {
        position: "fixed", // Ensures the buttons float
        bottom: "200px", // Distance from the bottom of the screen
        right: "20px", // Distance from the right of the screen
        zIndex: 1000, // Ensures the buttons appear above other elements
        display: "flex",
        flexDirection: "column", // Stack buttons vertically
        alignItems: "center", // Center align buttons horizontally
        gap: "10px", // Add spacing between the buttons
      },
      whatsappButton: {
        backgroundColor: "#25D366", // WhatsApp green
        color: "white",
        width: "60px",
        height: "60px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
      },
      liveChatButton: {
        backgroundColor: "#25D366", // Live Chat blue
        color: "white",
        width: "60px",
        height: "60px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
      },
};

export default FloatingWhatsupButton;
