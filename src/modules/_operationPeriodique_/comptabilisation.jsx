import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export const Comptabilisation = ({ children }) => {
  // const [item, setItem] = useState(OOperation);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState({ comptabiliser: false });

  const [refresh, setRefresh] = useState(false);

  const notify = (msg) => toast.success(msg);

  const rafraichir = () => {
    setRefresh(!refresh);
    notify("Comptabilisation éffectuée avec succès");
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

  const loadItems = () => {
    api(ENDPOINTS.operationsCompta)
      .fetch()
      .then((res) => {
        let temp = res.data;
        let result = [];
        for (let i = 0; temp.length > i; i++) {
          const o = temp[i];
          let natu = {};

          natu["Libelle"] = o.Libelle;
          natu["Id"] = o.Id;
          natu["Sens"] = o.Sens;

          natu["debit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          natu["credit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          natu["cg_num"] = o.Comptenature;

          result.push(natu);

          let caiss = {};

          caiss["Libelle"] = o.Libelle;
          caiss["Id"] = o.Id;
          caiss["Sens"] = o.Sens;
          // caiss["debit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          // caiss["credit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          // caiss["cg_num"] = o.Comptenature;

          caiss["debit"] = o.Sens == "Encaissement" ? 0 : o.Debit;
          caiss["credit"] = o.Sens == "Encaissement" ? o.Debit : 0;
          caiss["cg_num"] = o.Comptecaisse;

          result.push(caiss);
        }
        result = result.sort((a, b) => a.Id - b.Id);
        console.log(result);
        setItems(result);
        // console.log(temp);
      })
      .catch((err) => alert(err));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
    }).format(value);
  };

  const imprimer = () => {
    try {
      // preval`
      //   const fs = require("fs");
      //   fs.writeFile('${process.env.HOME}/Desktop/myfile.txt', "text", "w");
      // `;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const columns = [
    {
      name: "N° Pièce",
      selector: (row) => row.Id,
    },
    {
      name: "N° de Compte",
      selector: (row) => row.cg_num,
    },
    {
      name: "Libellé",
      selector: (row) => row.Libelle,
    },
    {
      name: "Débit",
      selector: (row) => (row.debit == 0 ? "-" : formatCurrency(row.debit)),
    },
    {
      name: "Crédit",
      selector: (row) => (row.credit == 0 ? "-" : formatCurrency(row.credit)),
    },
    {
      name: "Sens",
      selector: (row) => row.Sens,
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
            <button className="buttonAll" onClick={imprimer}>
              Imprimer
            </button>
          </div>
        }
      />
    </>
  );
};
