import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Provider } from "./helpers/web3-provider";
import { ThemeProvider } from "./helpers/theme-provider";
import "./globals.css";
import App from "@/app/App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetypeMe - Learn | Play | Own",
  description:
    "Master blind typing skills, race against friends, and own your achievements as NFTs on RetypeMe. Elevate your typing experience with engaging competitions and a community-driven platform. Start your journey to faster, more accurate typing today!",
  keywords: ["blind typing", "type racer", "monkey type", "klavogonki"],
};

const walletConnectProjectId = process.env
  .ENV_LOCAL_WALLETCONNECT_PROJECT_ID as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-screen`}
      suppressHydrationWarning
    >
      <body className="flex flex-col h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-[1440px] self-center w-full flex flex-col h-screen">
            <App>
              <Web3Provider walletConnectProjectId={walletConnectProjectId}>
                {children}
              </Web3Provider>
            </App>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
