export interface Resource {
  id: string;
  title: string;
  topic: string;
  principle?: string;
  badge?: string;
  blobColor?: string;
  category?: string;
  type: "link" | "video" | "doc" | "pdf";
  color: "#E00027" | "#17E4A1" | "#FF603E" | "#FFE500" | "#56CCF2";
}

export interface FilterState {
  keyFoundationalPrinciples: {
    secureBase: boolean;
    senseOfAppreciation: boolean;
    learningOrganisation: boolean;
    missionAndVision: boolean;
    wellbeing: boolean;
  };
  documentType: {
    doc: boolean;
    link: boolean;
    pdf: boolean;
    video: boolean;
  };
  categories: {
    sample1: boolean;
    sample2: boolean;
    sample3: boolean;
    sample4: boolean;
    sample5: boolean;
  };
}

export interface SearchState {
  query: string;
}
