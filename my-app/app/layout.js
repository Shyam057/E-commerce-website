import "./globals.css";

export const metadata = {
  title: "hamro-mini-daraz | Nepal Marketplace",
  description: "A Daraz-style e-commerce marketplace for products, sellers, checkout, and orders.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}
