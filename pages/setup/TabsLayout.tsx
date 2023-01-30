import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import Tabs from "../components/Tabs";

const generateNavItem = (name: string, href: string, pathName: string) => {
  return { name, href, current: pathName == href };
};

interface MyComponentProps {
  children: React.ReactNode;
}

export const TabsLayout: React.FC<MyComponentProps> = (props) => {
  const pathName = usePathname() || "";

  const [tabs, setTabs] = useState([
    generateNavItem("Accounts", "/setup", pathName),
    generateNavItem("Categories", "/setup/categories", pathName),
  ]);

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs} />
      {props.children}
    </>
  );
};
