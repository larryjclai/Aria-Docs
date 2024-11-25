// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "如何使用本服務",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "介紹", href: "/introduction" },
    ],
  },
  {
    title: "Ｍeta 廣告",
    href: "/meta-ads",
    noLink: true,
    items: [
      { title: "企業管理平台", href: "/business-manager" },
      { title: "廣告管理員", href: "/ads-manager" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
