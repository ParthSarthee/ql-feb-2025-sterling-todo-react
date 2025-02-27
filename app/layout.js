import "./globals.css";

export const metadata = {
  title: "React Todo",
  description: "A simple todo app built with React.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
