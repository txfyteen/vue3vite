export interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface TableStateProps {
  tableData: any[];
  pageable: Pageable;
  queryParam: {
    [key: string]: any;
  };
  queryInitParam: {
    [key: string]: any;
  };
  totalParam: {
    [key: string]: any;
  };
  icon?: {
    [key: string]: any;
  };
}

export namespace HandleData {
  export type MessageType = "" | "success" | "warning" | "info" | "error";
}

export namespace Theme {
  export type GreyOrWeakType = "grey" | "weak";
}
