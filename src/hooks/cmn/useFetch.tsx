import { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const useFetch = (service: any) => {
  const location = useLocation();
  const [data, setData] = useState<{ rows: any[], columns: ColDef[] }>({ rows:[], columns:[] });

  useEffect(() => {
    setData(service());
  }, [location]);

  return data;
}

export default useFetch;