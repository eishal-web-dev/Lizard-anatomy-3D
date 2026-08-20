import type { Metadata } from "next";
import "./globals.css";
import "./refinement.css";
export const metadata: Metadata = { title:"Lizard Layers — Ashes Stack", description:"An interactive anatomical study of the common house gecko, brought to life by Ashes Stack.", openGraph:{title:"Lizard Layers — Ashes Stack",description:"Four layers. One living system. Explore an interactive digital specimen."}, twitter:{card:"summary_large_image",title:"Lizard Layers — Ashes Stack",description:"Four layers. One living system."} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
