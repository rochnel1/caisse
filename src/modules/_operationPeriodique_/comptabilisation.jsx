import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  dateRefactor,
  dateRefactorJJMMAA,
  imprimer,
  notifyError,
  notifySuccess,
  stringRefractor,
  tableRefractor,
  telechargerExcelFile,
  telechargerSage,
} from "../../utils/utils";

export const Comptabilisation = ({ children }) => {
  // const [item, setItem] = useState(OOperation);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState({ comptabiliser: false });

  const [refresh, setRefresh] = useState(false);

  const rafraichir = () => {
    setRefresh(!refresh);
    loadItems();
  };

  const telechargerSagePNM = (list, nomFichier = "export_sage") => {
    var elHtml = tableRefractorSagePNM(list);

    var link = document.createElement("a");
    var mimeType = "text/plain"; // text/html; application/pdf application/vnd.ms-excel

    var fileName = window.prompt("Insérer le nom du fichier", nomFichier);
    if (fileName == null) return;
    fileName += ".pnm";

    link.setAttribute(
      "download",
      fileName === ".pnm" ? nomFichier + ".pnm" : fileName
    );

    link.setAttribute(
      "href",
      "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
    );
    link.click();
  };

  const tableRefractorSagePNM = (list) => {
    const columns = [
      { id: "journal", name: "Journal" },
      { id: "date", name: "Date", render: (o, i) => dateRefactor(o[i]) },
      { id: "Id", name: "N° Pièce" },
      { id: "cg_num", name: "N° de Compte" },
      { id: "Libelle", name: "Libellé" },
      { id: "debit", name: "Débit" },
      { id: "credit", name: "Crédit" },
    ];

    let tempH = `${stringRefractor("Bijou SA ", 30)}\n`;

    let tempB = "";
    list.forEach((o) => {
      tempB += `${stringRefractor(o["journal"], 3)}`;
      tempB += `${dateRefactorJJMMAA(o["date"]).replaceAll("/", "")}`;
      tempB += `OD`;
      tempB += `${stringRefractor(o["cg_num"], 13)}`;
      tempB += ` `;
      tempB += `${stringRefractor("", 13)}`;
      tempB += `${stringRefractor("123", 13)}`;
      tempB += `${stringRefractor(o["Libelle"], 25)}`;
      tempB += `S`;
      tempB += `${stringRefractor("", 6)}`;
      // tempB += `${dateRefactorJJMMAA(o["date"]).replaceAll("/", "")}`;
      tempB += `${o["debit"] === 0 ? "C" : "D"}`;
      tempB += `${stringRefractor(
        (o["debit"] === 0 ? o["credit"] : o["debit"]) + "",
        20,
        true
      )}`;
      tempB += `N`;
      tempB += `${stringRefractor("", 7)}`;
      tempB += `${stringRefractor("", 26)}`;
      tempB += `${stringRefractor("EUR", 3)}`;
      // tempB += `${stringRefractor(o["Id"], 7)}`;
      tempB += "\n";
    });
    tempB += "\n";

    return `${tempH}${tempB}`;
  };

  const add = (e) => {
    // setOpen({ ...open, comptabiliser: true });
    Swal.fire({
      title: "Etes vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        save();
        Swal.fire(
          "Effectuer !",
          "Les opérations ont été comptabilisé",
          "success"
        );
      }
      rafraichir();
    });
  };

  const save = async (e) => {
    try {
      //
      await api(ENDPOINTS.operationsComptabiliser).post();
    } catch (error) {
      Swal.fire("Erreur !", "La comptabilisation a échouée", "error");
    }
    refresh();
  };

  const comptabiliserSage = async (e) => {
    Swal.fire({
      title: "Vous allez ouvrir un journal dans Sage !!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.value) {
        functionSage();
      }
    });
  };

  const functionSage = async () => {
    await api(ENDPOINTS.operationsComptabiliserSage)
      .post()
      .then((result) =>
        result != null
          ? notifySuccess("Ecriture(s) comptable(s) enregistrée(s) dans Sage !")
          : notifyError("Erreur lors de la comptabilisation !")
      );
  };

  const loadItems = () => {
    api(ENDPOINTS.operationsCompta)
      .fetch()
      .then((res) => {
        let temp = res.data;
        let result = [];
        for (let i = 0; temp.length > i; i++) {
          const o = temp[i];
          let natu = {};

          natu["journal"] = o.journal;
          natu["date"] = o.dateOperation;
          natu["Libelle"] = o.Libelle;
          natu["Id"] = o.Id;
          natu["Sens"] = o.Sens;

          natu["debit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          natu["credit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          natu["cg_num"] = o.Comptenature;

          result.push(natu);

          let caiss = {};
          caiss["journal"] = o.journal;
          caiss["date"] = o.dateOperation;
          caiss["Libelle"] = o.Libelle;
          caiss["Id"] = o.Id;
          caiss["Sens"] = o.Sens;
          // caiss["debit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          // caiss["credit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          // caiss["cg_num"] = o.Comptenature;

          caiss["debit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          caiss["credit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          caiss["cg_num"] = o.Comptecaisse;

          result.push(caiss);
        }
        result = result.sort((a, b) => a.Id - b.Id);
        // console.log(result);
        setItems(result);
        // console.log(temp);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
  }, [refresh]);

  const columns = [
    {
      name: "Journal",
      selector: (row) => row.journal,
      id: "journal",
    },
    {
      name: "Date",
      selector: (row) => dateRefactor(row.date),
      id: "date",
    },
    {
      name: "N° Pièce",
      selector: (row) => row.Id,
      id: "Id",
    },
    {
      name: "N° de Compte",
      selector: (row) => row.cg_num,
      id: "cg_num",
    },
    {
      name: "Libellé",
      selector: (row) => row.Libelle,
      id: "Libelle",
    },
    {
      name: "Débit (FCFA)",
      selector: (row) => row.debit,
      id: "debit",
    },
    {
      name: "Crédit (FCFA)",
      selector: (row) => row.credit,
      id: "credit",
    },
    {
      name: "Sens",
      selector: (row) => row.Sens,
      id: "sens",
    },
  ];
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <DataTable
        title="Comptabilisation des opérations de caisse"
        columns={columns}
        data={items}
        pagination
        fixedHeader
        highlightOnHover
        actions={
          <div>
            <button
              className="buttonAll"
              style={{
                marginRight: "10px",
              }}
              onClick={add}
            >
              Comptabiliser
            </button>
            <button
              className="buttonAll"
              style={{
                marginRight: "10px",
              }}
              onClick={(e) => comptabiliserSage(e)}
            >
              Comptabiliser dans Sage
            </button>
            <button
              className="buttonAll"
              style={{
                marginRight: "10px",
              }}
              onClick={(e) =>
                imprimer(items, columns, "liste des pièces comptable")
              }
            >
              Imprimer
            </button>
            <button
              className="buttonAll"
              onClick={(e) => telechargerExcelFile(items, columns)}
              style={{
                marginRight: "10px",
              }}
            >
              Export Excel
            </button>
            <button
              className="buttonAll"
              style={{
                marginRight: "10px",
              }}
              onClick={(e) => telechargerSage(items)}
            >
              Export Sage(.txt)
            </button>
            <button
              className="buttonAll"
              onClick={(e) => telechargerSagePNM(items)}
            >
              Export Sage (PNM)
            </button>
          </div>
        }
      />
    </>
  );
};
