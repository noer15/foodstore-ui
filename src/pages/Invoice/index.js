import React, { useEffect } from "react";
import { useParams } from "react-router";
import { LayoutOne, Table, Button, Text } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";
import { getInvoiceByOrderId } from "../../api/invoice";
import TopBar from "../../components/TopBar";
import { config } from "../../config";
import { formatPrice } from "../../utils/formatPrice";
import StatusLabel from "../../components/StatusLabel";
import axios from "axios";

export default function Invoice() {
  const [invoice, setInvoice] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [initiatingPayment, setInitiating] = React.useState(false);
  const [requestError, setRequestError] = React.useState(false);

  let params = useParams();
  useEffect(() => {
    getInvoiceByOrderId(params?.order_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan saat mengambil data");
        }
        setInvoice(data);
      })
      .finally(() => setStatus("idle"));
  }, []);

  let handlePayment = async function () {
    setInitiating(true);

    let { data } = await axios.get(
      `${config.api_host}/api/v1/invoices/${params?.order_id}/initiate-payment`
    );
    console.log(data);

    if (!data.token) {
      setRequestError(true);
      return;
    }

    setInitiating(false);
    window.snap.pay(data.token);
  };

  if (error) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }
  return (
    <div>
      <LayoutOne>
        <TopBar />
        <Text as="h3">Invoice</Text>
        <br />
        <Table
          showPagination={false}
          items={[
            {
              label: "Status",
              value: <StatusLabel status={invoice?.payment_status} />,
            },
            { label: "Order ID", value: "#" + invoice?.order?.order_number },
            { label: "Total amount", value: formatPrice(invoice?.total) },
            {
              label: "Billed to",
              value: (
                <div>
                  <b>{invoice?.user?.full_name} </b> <br />
                  {invoice?.user?.email} <br /> <br />
                  {invoice?.delivery_address?.detail} <br />
                  {invoice?.delivery_address?.kelurahan},
                  {invoice?.delivery_address?.kecamatan} <br />
                  {invoice?.delivery_address?.kabupaten} <br />
                  {invoice?.delivery_address?.provinsi}
                </div>
              ),
            },
            {
              label: "Payment to",
              value: (
                <div>
                  {config.owner} <br />
                  {config.contact} <br />
                  {config.billing.account_no} <br />
                  {config.billing.bank_name}
                </div>
              ),
            },
          ]}
          columns={[
            { Header: "Invoice", accessor: "label" },
            { Header: "", accessor: "value" },
          ]}
        />
        {invoice.payment_status !== "paid" ? (
          <>
            <Button onClick={handlePayment} disabled={initiatingPayment}>
              {" "}
              {initiatingPayment
                ? "Loading ... "
                : "Bayar dengan Midtrans"}{" "}
            </Button>
          </>
        ) : null}
      </LayoutOne>
    </div>
  );
}
