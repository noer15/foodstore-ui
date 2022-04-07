import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutOne, Table, Button, Text } from "upkit";
import { getOrder } from "../../api/order";
// import StatusLabel from "../../components/StatusLabel";
import TopBar from "../../components/TopBar";
// import { formatPrice } from "../../utils/formatPrice";
// import { sumPrice } from "../../utils/sumPrice";

import FaFileInvoiceDollar from "@meronex/icons/fa/FaFileInvoiceDollar";

const columns = [
  {
    Header: "",
    id: "Status",
    accessor: (order) => {
      return (
        <div>
          #{order.order_number} <br />
        </div>
      );
    },
  },
  {
    Header: "Items",
    accessor: (order) => {
      return (
        <div>
          {order.order_items.map((item) => {
            return (
              <div key={item._id}>
                {item.name} {item.qty}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: "Invoice",
    accessor: (order) => {
      return (
        <div>
          <Link to={`/invoice/${order._id}`}>
            <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
              Invoice
            </Button>
          </Link>
        </div>
      );
    },
  },
];
export default function UserOrders() {
  let [pesanan, setPesanan] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState("idle");
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);

  const fetchPesanan = useCallback(async () => {
    setStatus("process");
    let { data } = await getOrder({ page, limit });
    if (data.eror) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit]);
  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);
  return (
    <div>
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Pesanan Anda </Text>
        <br />

        <Table
          items={pesanan}
          totalItems={count}
          columns={columns}
          onPageChange={(page) => setPage(page)}
          page={page}
          isLoading={status === "process"}
        />
      </LayoutOne>
    </div>
  );
}
