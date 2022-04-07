import React from "react";
import { LayoutOne, Text, Table, Button } from "upkit";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";

import { useAddressData } from "../../hooks/address";

export default function UserAddress() {
  let { data, limit, page, status, count, setPage } = useAddressData();
  const column = [
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Detail",
      accessor: (alamat) => {
        return (
          <div>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
            {alamat.kelurahan} <br />
            {alamat.detail}
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-4">
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Alamat pengiriman </Text>
        <br />
        <div className="my-4">
          {status === "success" && !data.length ? (
            <div>
              <span>Kamu belum menambahkan alamat baru</span>
              <br />
              <Link to="/tambah/alamat-pengirim">
                <Button>Tambah Alamat</Button>
              </Link>
            </div>
          ) : null}
        </div>
        <Table
          items={data}
          columns={column}
          totalItems={count}
          page={page}
          isLoading={status === "process"}
          perPage={limit}
          onPageChange={(page) => setPage(page)}
        />
      </LayoutOne>
    </div>
  );
}
