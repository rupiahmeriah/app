import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import Tabs from "../components/Tabs";

const generateNavItem = (name: string, href: string, pathName: string) => {
  return { name, href, current: pathName == href };
};

export function getLayout(page: ReactElement) {
  const pathName = usePathname() || "";

  const [tabs, setTabs] = useState([
    generateNavItem("Accounts", "/setup", pathName),
    generateNavItem("Categories", "/setup/categories", pathName),
  ]);

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs} />
      {page}
    </>
  );
}
