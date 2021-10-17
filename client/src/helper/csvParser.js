import Papa from "papaparse";

export default function parseCSVFile(csvFile) {
  var data = [];
  Papa.parse(csvFile, {
    download: true,
    header: true,
    complete: function (input) {
      const records = input.data;
      data.push(records);
    },
  });
  console.log(`datasss`, data);
  return data;
}
