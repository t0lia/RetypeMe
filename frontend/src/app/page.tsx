"use client";

export default function Home() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("The button was clicked.");
  }
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen py-2">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleClick}
        >
          Start your journey here
        </button>
      </div>
    </main>
  );
}
