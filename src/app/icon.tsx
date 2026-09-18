import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#141414",
          display: "flex",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="13" width="9" height="38" fill="#e42313" />
          <rect x="40" y="13" width="9" height="38" fill="#e42313" />
          <polygon points="24,29 40,24 40,31 24,36" fill="#e42313" />
        </svg>
      </div>
    ),
    size,
  );
}
