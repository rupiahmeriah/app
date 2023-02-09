import { usePathname } from "next/navigation";
import { useState } from "react";
import Tabs from "../../common/Tabs";

const generateNavItem = (name: string, href: string, pathName: string) => {
  return { name, href, current: pathName == href };
};

interface MyComponentProps {
  children: React.ReactNode;
}

export const TabsLayout: React.FC<MyComponentProps> = (props) => {
  const pathName = usePathname() || "";

  const [tabs, setTabs] = useState([
    generateNavItem("Budgets", "/finance", pathName),
    generateNavItem("Transactions", "/finance/transactions", pathName),
  ]);

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs} />
      {props.children}
    </>
  );
};
