import React from "react";

export const BehanceHeaderCardTall: React.FC = () => {
  return (
    <div
      style={{
        width: 3200,
        height: 800,
        backgroundColor: "#E8E3DA",
        color: "#3F352C",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 140px",
        fontFamily: "'Circular Std', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Subtle Card Border Stroke */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(63, 53, 44, 0.12)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* TOP-LEFT URL LINK LABEL */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "140px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontFamily: "'Circular Std', sans-serif",
          fontSize: "42px",
          fontWeight: 450,
          letterSpacing: "-0.01em",
          color: "#3F352C",
        }}
      >
        <span>gmmohit.com</span>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "2.5px solid rgba(63, 53, 44, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#3F352C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
          </svg>
        </div>
      </div>

      {/* Micro Coordinates Header Accent */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "140px",
          display: "flex",
          alignItems: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: "22px",
          letterSpacing: "0.15em",
          color: "rgba(63, 53, 44, 0.45)",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        <span>12.9716° N   77.5946° E</span>
      </div>

      {/* BACKDROP WATERMARK LAYER: "GM" stacked above "MOHIT", matching website footer opacity (12%) */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "80px",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          opacity: 0.12,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "400px",
            fontWeight: 400,
            textTransform: "uppercase",
            lineHeight: 0.74,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "4px #3F352C",
            whiteSpace: "nowrap",
          }}
        >
          GM
        </span>
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "400px",
            fontWeight: 400,
            textTransform: "uppercase",
            lineHeight: 0.74,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "4px #3F352C",
            whiteSpace: "nowrap",
            marginTop: "-40px",
          }}
        >
          MOHIT
        </span>
      </div>

      {/* TOP-RIGHT HERO TEXT: "CREATIVE. DESIGNER. DEVELOPER." in Monument Extended */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "140px",
          zIndex: 10,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "155px",
            fontWeight: 400,
            lineHeight: "1.02",
            letterSpacing: "-0.03em",
            color: "#3F352C",
            textTransform: "uppercase",
          }}
        >
          CREATIVE.
        </span>
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "155px",
            fontWeight: 400,
            lineHeight: "1.02",
            letterSpacing: "-0.03em",
            color: "#3F352C",
            textTransform: "uppercase",
          }}
        >
          DESIGNER.
        </span>
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "155px",
            fontWeight: 400,
            lineHeight: "1.02",
            letterSpacing: "-0.03em",
            color: "#3F352C",
            textTransform: "uppercase",
          }}
        >
          DEVELOPER.
        </span>
      </div>

      {/* Wireframe Globe & Target Crosshair Icon */}
      <div
        style={{
          position: "absolute",
          bottom: "45px",
          right: "140px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "24px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "22px",
          letterSpacing: "0.12em",
          color: "rgba(63, 53, 44, 0.60)",
          textTransform: "uppercase",
        }}
      >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#3F352C" strokeWidth="1.5" style={{ opacity: 0.6 }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
        </svg>
        <span>DESIGN // INTENTION</span>
      </div>

      {/* Content Container */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
        {/* Content will be placed here */}
      </div>
    </div>
  );
};
