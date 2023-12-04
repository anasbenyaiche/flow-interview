import { format } from "date-fns";
import { useMemo } from "react";

export const useMarketColumn = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Time",
        accessor: "time",
        Cell: ({ value }) => (
          <span>{format(new Date(value), "MM/dd/yyyy, HH:mm:ss")}</span>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Quantity",
        accessor: "qty",
      },
    ],
    []
  );

  return columns;
};
