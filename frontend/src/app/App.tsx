"use client";

import {useEffect} from "react";
import {useConfigStore} from "@/app/store/configStore";
import ApiDomainService from "@/app/api/api-domain-service";

export default function App({ children, }: { children: React.ReactNode; }) {
  const setConfig = useConfigStore(state => state.setConfig);

  useEffect(() => {
    const apiUrl = new ApiDomainService().getRestUrl();
    fetch(`${apiUrl}/contract/config`)
      .then(response => response.json())
      .then(data => {
        setConfig(data);
      })
      .catch(error => console.error('Failed to load configuration', error));
  }, [setConfig]);

  return children;
}