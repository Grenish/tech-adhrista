import type { Metadata } from "next";

import { Montserrat } from "next/font/google";
import "./globals.css";

const Mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Adrishta | SMIT",
  description:
    "Discover Tech Adrishta, the flagship annual technical festival of Sikkim Manipal Institute of Technology (SMIT). Join us for one of the biggest and most prestigious tech fests, showcasing innovation, creativity, and cutting-edge technology. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Mont.className}>{children}</body>
    </html>
  );
}
