import React, { useState } from "react";
import { LayoutOne, Steps, Responsive, Button, Table, Text } from "upkit";
import TopBar from "../../components/TopBar";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import FaAddressCard from "@meronex/icons/fa/FaAddressCard";
import FaInfoCircle from "@meronex/icons/fa/FaInfoCircle";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import FaArrowLeft from "@meronex/icons/fa/FaArrowLeft";
import FaRegCheckCircle from "@meronex/icons/fa/FaRegCheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { config } from "../../config";
import { formatPrice } from "../../utils/formatPrice";
import { sumPrice } from "../../utils/sumPrice";
import { Link } from "react-router-dom";
import { useAddressData } from "../../hooks/address";
import { createOrder } from "../../api/order";
import { clearItems } from "../../features/Cart/action";

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const cart = useSelector((state) => state.cart);
  const IconWrapper = ({ children }) => {
    return <div className="text-3xl flex justify-center">{children}</div>;
  };
  let { data, status, limit, page, count, setPage } = useAddressData();
  //   handle submit
  let dispatch = useDispatch();
  let navigate = useNavigate();
  async function handleCreateOrder() {
    let payload = {
      delivery_fee: config.global_ongkir,
      delivery_address: selectedAddress._id,
    };
    let { data } = await createOrder(payload);
    if (data?.error) return;

    navigate(`/invoice/${data._id}`);
    dispatch(clearItems());
  }

  if (!cart.length) {
    navigate("/");
  }
  //   definisi table
  const columns = [
    {
      Header: "Nama produk",
      accessor: (item) => (
        <div className="flex items-center">
          <img
            src={`${config.api_host}/upload/${item.image_url}`}
            width={48}
            alt={item.name}
          />
          {item.name}
        </div>
      ),
    },
    {
      Header: "Jumlah",
      accessor: "qty",
    },
    {
      Header: "Harga satuan",
      id: "price",
      accessor: (item) => <span> @ {formatPrice(item.price)} </span>,
    },
    {
      Header: "Harga total",
      id: "subtotal",
      accessor: (item) => {
        return <div>{formatPrice(item.price * item.qty)}</div>;
      },
    },
  ];

  const addressColumns = [
    {
      Header: "Nama alamat",
      accessor: (alamat) => {
        return (
          <div>
            {alamat.nama} <br />
            <small>
              {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
              {alamat.kelurahan} <br />
              {alamat.detail}
            </small>
          </div>
        );
      },
    },
  ];

  const steps = [
    {
      label: "Item",
      icon: (
        <IconWrapper>
          <FaCartPlus />
        </IconWrapper>
      ),
    },
    {
      label: "Alamat",
      icon: (
        <IconWrapper>
          <FaAddressCard />
        </IconWrapper>
      ),
    },
    {
      label: "Konfirmasi",
      icon: (
        <IconWrapper>
          <FaInfoCircle />
        </IconWrapper>
      ),
    },
  ];
  return (
    <>
      <LayoutOne>
        <TopBar />
        <div className="py-4">
          <Text as="h3">Checkout</Text>
        </div>
        <Steps steps={steps} active={activeStep} />
        <div className="my-5">
          {activeStep === 0 ? (
            <div>
              <Table
                items={cart}
                columns={columns}
                perPage={cart.length}
                showPagination={false}
              />
              <div className="text-right">
                <Text as="h4">Subtotal: {formatPrice(sumPrice(cart))}</Text>

                <br />
                <Button
                  onClick={(_) => setActiveStep(activeStep + 1)}
                  color="red"
                  iconAfter={<FaArrowRight />}
                >
                  {" "}
                  Selanjutnya{" "}
                </Button>
              </div>
            </div>
          ) : null}

          {/* step 2 */}
          {activeStep === 1 ? (
            <div>
              <br /> <br />
              <Table
                items={data}
                columns={addressColumns}
                perPage={limit}
                page={page}
                onPageChange={(page) => setPage(page)}
                totalItems={count}
                isLoading={status === "process"}
                selectable
                primaryKey={"_id"}
                selectedRow={selectedAddress}
                onSelectRow={(item) => setSelectedAddress(item)}
              />
              {!data.length && status === "success" ? (
                <div className="text-center my-10">
                  <Link to="/alamat-pengiriman/tambah">
                    Kamu belum memiliki alamat pengiriman <br /> <br />
                    <Button> Tambah alamat </Button>
                  </Link>
                </div>
              ) : null}
              <br /> <br />
              <Responsive desktop={2} tablet={2} mobile={2}>
                <div>
                  <Button
                    onClick={(_) => setActiveStep(activeStep - 1)}
                    color="gray"
                    iconBefore={<FaArrowLeft />}
                  >
                    Sebelumnya
                  </Button>
                </div>

                <div className="text-right">
                  <Button
                    onClick={(_) => setActiveStep(activeStep + 1)}
                    disabled={!selectedAddress}
                    color="red"
                    iconAfter={<FaArrowRight />}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </Responsive>
            </div>
          ) : null}

          {/* step 3 */}
          {activeStep === 2 ? (
            <div>
              <Table
                columns={[
                  {
                    Header: "",
                    accessor: "label",
                  },
                  {
                    Header: "",
                    accessor: "value",
                  },
                ]}
                items={[
                  {
                    label: "Alamat",
                    value: (
                      <div>
                        {selectedAddress.nama} <br />
                        {selectedAddress.provinsi}, {selectedAddress.kabupaten},{" "}
                        {selectedAddress.kecamatan}, {selectedAddress.kelurahan}{" "}
                        <br />
                        {selectedAddress.detail}
                      </div>
                    ),
                  },
                  { label: "Subtotal", value: formatPrice(sumPrice(cart)) },
                  {
                    label: "Ongkir",
                    value: formatPrice(config.global_ongkir),
                  },
                  {
                    label: "Total",
                    value: (
                      <b>
                        {formatPrice(
                          sumPrice(cart) + parseInt(config.global_ongkir)
                        )}
                      </b>
                    ),
                  },
                ]}
                showPagination={false}
              />
              <div className="mt-5">
                <Responsive desktop={2} tablet={2} mobile={2}>
                  <div>
                    <Button
                      onClick={(_) => setActiveStep(activeStep - 1)}
                      color="gray"
                      iconBefore={<FaArrowLeft />}
                    >
                      Sebelumnya
                    </Button>
                  </div>
                  <div className="text-right">
                    <Button
                      onClick={handleCreateOrder}
                      color="red"
                      size="large"
                      iconBefore={<FaRegCheckCircle />}
                    >
                      Bayar
                    </Button>
                  </div>
                </Responsive>
              </div>
            </div>
          ) : null}
        </div>
      </LayoutOne>
    </>
  );
}
