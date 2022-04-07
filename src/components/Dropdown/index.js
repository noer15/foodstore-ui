import { useState, useEffect } from "react";
import axios from "axios";
import { oneOf, number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";

import { config } from "../../config";

export default function Dropdown({ tingkat, kodeInduk, onChange, value }) {
  let [data, setData] = useState([]);
  let [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    axios
      .get(
        `${config.api_host}/api/v1/wilayah/${tingkat}?kode_induk=${kodeInduk}`
      )
      .then(({ data }) => {
        if (!data.error) {
          setData(data);
        }
      })
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  return (
    <Select
      options={data.map((wilayah) => ({
        label: wilayah.nama,
        value: wilayah.kode,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
}

Dropdown.defaultProps = {
  tingkat: "provinsi",
};

Dropdown.propTypes = {
  tingkat: oneOf(["provinsi", "kabupaten", "kecamatan", "desa"]),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};
