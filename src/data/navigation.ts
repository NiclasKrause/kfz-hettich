export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Service", href: "/#leistungen" },
  { label: "HU", href: "/#hu" },
  { label: "Unfall", href: "/#unfall" },
  { label: "Werkstatt", href: "/#werkstatt" },
  { label: "Ratgeber", href: "/ratgeber" },
];

export const footerNav: NavLink[] = [
  { label: "Service", href: "/#leistungen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Karriere", href: "/karriere" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
