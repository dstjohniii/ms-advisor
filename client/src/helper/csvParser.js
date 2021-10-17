import Papa from "papaparse";
import { parse } from "csv-parse/lib/sync";

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
  return data;
}

// export default function parseCSVFile(csvFile) {
//   return parse(csvFile, {
//     columns: true,
//     skip_empty_lines: true,
//   });
// }
