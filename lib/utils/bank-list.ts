export interface Bank {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  /** Path to logo in public/banks/ — served as static asset */
  logoPath: string;
}

export const indianBanks: Bank[] = [
  {
    id: "sbi",
    name: "State Bank of India",
    shortName: "SBI",
    primaryColor: "#2D5BE3",
    logoPath: "/banks/sbi.svg",
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    shortName: "HDFC",
    primaryColor: "#004C8F",
    logoPath: "/banks/hdfc.svg",
  },
  {
    id: "icici",
    name: "ICICI Bank",
    shortName: "ICICI",
    primaryColor: "#F57F20",
    logoPath: "/banks/icici.svg",
  },
  {
    id: "axis",
    name: "Axis Bank",
    shortName: "AXIS",
    primaryColor: "#97144D",
    logoPath: "/banks/axis.svg",
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    shortName: "KOTAK",
    primaryColor: "#EF4123",
    logoPath: "/banks/kotak.svg",
  },
  {
    id: "pnb",
    name: "Punjab National Bank",
    shortName: "PNB",
    primaryColor: "#E31E24",
    logoPath: "/banks/pnb.svg",
  },
  {
    id: "bob",
    name: "Bank of Baroda",
    shortName: "BOB",
    primaryColor: "#F7931E",
    logoPath: "/banks/bob.png",
  },
  {
    id: "canara",
    name: "Canara Bank",
    shortName: "CANARA",
    primaryColor: "#007DC5",
    logoPath: "/banks/canara.svg",
  },
  {
    id: "union",
    name: "Union Bank of India",
    shortName: "UNION",
    primaryColor: "#6D2077",
    logoPath: "/banks/union.svg",
  },
  {
    id: "indusind",
    name: "IndusInd Bank",
    shortName: "INDUS",
    primaryColor: "#0072BC",
    logoPath: "/banks/indusind.svg",
  },
];
