"use client";

import Footer from "../components/footer/footer";
import GamePageHeader from "../components/game-page-header/gamePageHeader";

export default function SingleModePage() {
  return (
    <>
      <GamePageHeader />
      <main className="h-screen flex flex-col relative">single mode</main>
      <Footer />
    </>
  );
}
