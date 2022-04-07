import { useCallback, useEffect, useState } from "react";
import { getAddress } from "../api/address";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export function useAddressData() {
  let [data, setData] = useState([]);
  let [count, setCount] = useState(0);
  let [status, setStatus] = useState(statuslist.idle);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);

  let fetchAddress = useCallback(
    async function () {
      setStatus(statuslist.process);
      let {
        data: { data, count, error },
      } = await getAddress({ page, limit });
      console.log(data);
      if (error) {
        setStatus(statuslist.error);
        return;
      }
      setStatus(statuslist.success);
      setData(data);
      setCount(count);
    },
    [page, limit]
  );

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
    data,
    count,
    status,
    page,
    limit,
    setPage,
    setLimit,
  };
}
