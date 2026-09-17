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
          alignItems: "center",
          justifyContent: "center",
          color: "#e42313",
          fontSize: 34,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        H
      </div>
    ),
    size,
  );
}
