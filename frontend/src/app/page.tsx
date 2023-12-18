"use client";
import { CREATE } from "./api/route";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await CREATE({"players": 1});
    const data = await response.json();
    console.log(data);

    if (data) {
      router.push(`/game/${data.id}`);
    }
  }

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen py-2">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded transform active:translate-y-0.5"
          onClick={handleClick}
        >
          Retype Me
        </button>
      </div>
    </main>
  );
}
