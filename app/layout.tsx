import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CitizenProvider } from "@/lib/context/CitizenContext";
import { CriminalProvider } from "@/lib/context/CriminalDataContext";
import { EmergencyRequestProvider } from "@/lib/context/EmergencyRequestContext";
import { TabControlProvider } from "@/lib/context/TabControlContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoMetroPolis",
  description: "NeoMetroPolis City Management app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <AuthProvider>
        <TabControlProvider>
          <CitizenProvider>
            <CriminalProvider>
              <EmergencyRequestProvider>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  {children}
                </body>
              </EmergencyRequestProvider>
            </CriminalProvider>
          </CitizenProvider>
        </TabControlProvider>
      </AuthProvider>
    </html >
  );
}
