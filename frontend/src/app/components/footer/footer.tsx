import Link from "next/link";

import { Twitter } from "@/app/public/icons/twitter";
import { useEffect, useState } from "react";
import RestApiService from "@/app/api/rest-api-service";
import { TWITTER_LINK } from "@/app/constants/links";

export default function Footer() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    fetchGitTag();
  }, []);

  async function fetchGitTag() {
    const restApiService = new RestApiService();
    const tag = await restApiService.getVersion();
    setVersion(tag);
  }
  return (
    <footer className="pb-2 px-3">
      <div className="flex justify-between">
        <Link
          className="fill-current text-gray-600 hover:text-black pl-2"
          href={TWITTER_LINK}
          target="_blank"
        >
          <Twitter width={18} height={20} />
        </Link>
        <div className="h-4">{version}</div>
      </div>
    </footer>
  );
}
