import { format } from "date-fns";
import { useMemo } from "react";
import { ITrade } from "../types/allTypes";

export const useMarketColumn = () => {
  const columns = useMemo(
    () => [
      {
        name: "Time",
        selector: "time",
        cell: (row: ITrade) => (
          <span>{format(new Date(row.time), "MM/dd/yyyy, HH:mm:ss")}</span>
        ),
      },
      {
        name: "Price",
        selector: "price",
      },
      {
        name: "Quantity",
        selector: "qty",
      },
    ],
    []
  );

  return columns;
};
