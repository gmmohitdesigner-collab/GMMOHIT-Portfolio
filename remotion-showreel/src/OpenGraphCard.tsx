import React from "react";

export const OpenGraphCard: React.FC = () => {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#E8E3DA",
        color: "#3F352C",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
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

      {/* Micro Coordinates Header Accent */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "70px",
          right: "65px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "rgba(63, 53, 44, 0.45)",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        <span>01 — PORTFOLIO</span>
        <span>12.9716° N   77.5946° E</span>
      </div>

      {/* BACKDROP WATERMARK LAYER: "GM" stacked above "MOHIT", matching website footer opacity (12%) */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "30px",
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
            fontSize: "250px",
            fontWeight: 400,
            textTransform: "uppercase",
            lineHeight: 0.76,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "2.2px #3F352C",
            whiteSpace: "nowrap",
          }}
        >
          GM
        </span>
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "250px",
            fontWeight: 400,
            textTransform: "uppercase",
            lineHeight: 0.76,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "2.2px #3F352C",
            whiteSpace: "nowrap",
            marginTop: "-20px",
          }}
        >
          MOHIT
        </span>
      </div>

      {/* TOP-LEFT FOOTER STATEMENT: "Crafting digital / legacies through / intentional design." */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "70px",
          zIndex: 10,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontFamily: "'Circular Std', sans-serif",
            fontSize: "42px",
            fontWeight: 450,
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            color: "#3F352C",
          }}
        >
          Crafting digital
        </span>
        <span
          style={{
            fontFamily: "'Circular Std', sans-serif",
            fontSize: "42px",
            fontWeight: 450,
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            color: "#3F352C",
          }}
        >
          legacies through
        </span>
        <span
          style={{
            fontFamily: "'Circular Std', sans-serif",
            fontSize: "42px",
            fontWeight: 450,
            fontStyle: "italic",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            color: "#3F352C",
            opacity: 0.65,
          }}
        >
          intentional design.
        </span>
      </div>

      {/* TOP-RIGHT HERO TEXT: "CREATIVE. DESIGNER. DEVELOPER." in Monument Extended */}
      <div
        style={{
          position: "absolute",
          top: "65px",
          right: "65px",
          zIndex: 10,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: "1.05",
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
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: "1.05",
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
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: "1.05",
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
          bottom: "35px",
          right: "65px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          color: "rgba(63, 53, 44, 0.60)",
          textTransform: "uppercase",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3F352C" strokeWidth="1.5" style={{ opacity: 0.6 }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
        </svg>
        <span>DESIGN // INTENTION</span>
      </div>

      {/* Content Container (Layer 10 - Ready for next step) */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
        {/* Content will be placed here */}
      </div>
    </div>
  );
};
