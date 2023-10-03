import { toast } from "react-toastify";

export const jsonDateConvert = (val = "") => {
  try {
    let temp = new Date(val).toJSON().substring(0, 10);
    // console.log(temp);
    return temp;
  } catch (error) {
    return new Date().toJSON().substring(0, 10);
  }
};

// code de formatage de la date sous forme 01/01/2023
export const dateRefactor = (date) => {
  const d = new Date(date);
  // return d.toJSON().slice(0, 10);
  return `${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()}/${
    d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
  }/${d.getFullYear()}`;
};

export const dateRefactorJJMMAA = (date) => {
  const d = new Date(date);
  // return d.toJSON().slice(0, 10);
  return `${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()}/${
    d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
  }/${("" + d.getFullYear()).substring(2, 4)}`;
};

export const dateRefactorYear = (date) => {
  const d = new Date(date);
  // return d.toJSON().slice(0, 10);
  return `${d.getFullYear()}`;
};

export const stringRefractor = (value, size, left) => {
  const vSize = value.length;
  const v = value.toString();
  if (vSize < size) {
    return left ? v.padStart(size, " ") : v.padEnd(size, " ");
  } else {
    return v.substring(0, size); //size > 0 ? size - 1 : 0);
  }
};

export const tableRefractor = (list, columns, titre) => {
  let tempH = `
    <style>
    /*export de table sous excel*/
    .export-excel {
      border: 1px solid gray;
      background-color: transparent;
    }
    .export-excel tr td {
      border: 1px solid gray;
      background-color: transparent;
    }
    .export-excel thead tr th {
      background-color: royalblue;
      color: white;
    }
    </style>
    <table class="export-excel"><h2>${titre}</h2><thead><tr>
    `;
  columns.forEach((o) => {
    tempH += `<th>${o.name}</th>`;
  });
  tempH += "</tr></thead>";

  let tempB = "<tbody>";
  list.forEach((o) => {
    tempB += "<tr>";
    columns.forEach((p) => {
      tempB += `<td>${p.selector(o)}</td>`;
    });
    tempB += "</tr>";
  });
  tempB += "</tbody></table>";
  return `${tempH}${tempB}`;
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
  }).format(value);
};

export const imprimer = (liste, colonnes, titre) => {
  // var win = window.open();

  var win = window.open(
    null,
    "targetWindow",
    `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=no,
      resizable=yes,
      width=0,
      height=0`
  );
  var body = win.document.createElement("div");
  var elHtml = tableRefractor(liste, colonnes, titre);
  body.innerHTML = elHtml;
  win.document.body.appendChild(body);
  win.print();
  win.close();
};

export const telechargerExcelFile = (list, cols, nomFichier = "export") => {
  var elHtml = tableRefractor(list, cols);

  var link = document.createElement("a");
  var mimeType = "application/vnd.ms-excel"; //'text/plain'; // text/html; application/pdf application/vnd.ms-excel

  var fileName = window.prompt("Insérer le nom du fichier", nomFichier);
  if (fileName == null) return;
  fileName += ".xls";

  link.setAttribute(
    "download",
    fileName === ".xls" ? nomFichier + ".xls" : fileName
  );

  link.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
  );
  link.click();
};

export const telechargerSage = (list, nomFichier = "export_sage") => {
  var elHtml = tableRefractorSage(list);

  var link = document.createElement("a");
  var mimeType = "text/plain"; // text/html; application/pdf application/vnd.ms-excel

  var fileName = window.prompt("Insérer le nom du fichier", nomFichier);
  if (fileName == null) return;
  fileName += ".txt";

  link.setAttribute(
    "download",
    fileName === ".txt" ? nomFichier + ".txt" : fileName
  );

  link.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
  );
  link.click();
};

export const tableRefractorSage = (list) => {
  const columns = [
    { id: "journal", name: "Journal" },
    { id: "date", name: "Date", render: (o, i) => dateRefactor(o[i]) },
    { id: "Id", name: "N° Pièce" },
    { id: "cg_num", name: "N° de Compte" },
    { id: "Libelle", name: "Libellé" },
    { id: "debit", name: "Débit" },
    { id: "credit", name: "Crédit" },
  ];

  let tempH = "";
  columns.forEach((o) => {
    tempH += `${o.name}\t`;
  });
  tempH += "\n";

  let tempB = "";
  list.forEach((o) => {
    columns.forEach((p) => {
      tempB += `${p.render === undefined ? o[p.id] : p.render(o, p.id)}\t`;
    });
    tempB += "\n";
  });

  return `${tempH}${tempB}`;
};

export const setBabalScript = (bab) => {
  return <>{bab}</>;
};

export const notifySuccess = (msg) => toast.success(msg);
export const notifyError = (msg) => toast.error(msg);
export const notifyWarning = (msg) => toast.warn(msg);
