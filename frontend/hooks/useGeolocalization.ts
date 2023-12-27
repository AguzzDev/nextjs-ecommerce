import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://apis.datos.gob.ar/georef/api/";

export const useGeolocalization = (provinceId: string) => {
  const [province, setProvince] = useState<any[]>([]);
  const [citys, setCitys] = useState<any[]>([]);

  const getCitys = async () => {
    try {
      const resp = await axios.get(
        `${url}localidades?provincia=${provinceId}&campos=id,nombre&max=2000&orden=nombre`
      );

      setCitys(resp.data.localidades);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProvince = async () => {
      try {
        const resp = await axios.get(`${url}provincias`);
        setProvince(resp.data.provincias);
      } catch (error) {
        console.log(error);
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    if (provinceId) {
      getCitys();
    }
  }, [provinceId]);

  return { province, citys };
};
