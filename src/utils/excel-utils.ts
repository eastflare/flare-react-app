import * as XLSX from "xlsx";

export function readExcelFile(file: File) {
  return new Promise<string[][]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target?.result;

      if (!data) {
        reject("File is empty");
        return;
      }

      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      }) satisfies string[][];

      resolve(parsedData);
    };

    reader.readAsArrayBuffer(file);
  });
}
