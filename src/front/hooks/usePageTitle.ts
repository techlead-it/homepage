import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | 株式会社テックリード`;
  }, [title]);
}
