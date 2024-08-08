import * as XLSX from "xlsx";

function readExcelFile(file: File): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = event.target?.result;

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
      }) as string[][];

      resolve(parsedData);
    };

    reader.readAsArrayBuffer(file);
  });
}

export default readExcelFile;
