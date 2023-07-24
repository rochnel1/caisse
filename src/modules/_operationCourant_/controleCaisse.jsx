import React, { useEffect, useState } from "react";
import {
  TFormulaire,
  TInput,
  TLayout,
  TModal,
  TSelect,
  TValidationButton,
} from "../../utils/__";
import { OOperation } from "../_administration_/_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";

export const ControleCaisse = ({ children, idPer, idCaiss }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(OOperation);
  const [open, setOpen] = useState({ control: false, Idoperation: 0 });
  const [refresh, setRefresh] = useState(false);
  const [montantTotal, setMontantTotal] = useState(0);

  const notify = (msg) => toast.success(msg);
  const rafraichir = () => {
    setRefresh(!refresh);
    notify("Contrôle éffectué avec succès");
    validate();
  };
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const validate = async (e) => {
    idPer = item.Idpersonnel;
    idCaiss = item.Idcaisse;
    console.log(idCaiss + " + " + idPer);
    loadItems(idPer, idCaiss);
  };

  const control = async (e) => {
    setOpen({ ...open, control: true, Idoperation: 0 });
  };
  const quit = (e) => {
    setOpen({ ...open, control: false });
  };
  const closeCaisse = (e) => {
    localStorage.removeItem("myData");
  };

  const [caisse, setCaisse] = useState([]);
  const [personnel, setPersonnel] = useState([]);

  const loadItemsPersonnel = () => {
    api(ENDPOINTS.personnels)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.Profil == "Caissier");
        setPersonnel(temp);
      })
      .catch((err) => alert(err));
  };

  const loadItemsCaisse = () => {
    api(ENDPOINTS.caisses)
      .fetch()
      .then((res) => setCaisse(res.data))
      .catch((err) => alert(err));
  };

  const loadItems = (idPer, idCaiss) => {
    api(ENDPOINTS.operations)
      .fetchBy2Ids(idCaiss, idPer)
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.etat == "OP");
        setItems(temp);
        const sum = temp.reduce((acc, op) => acc + op.montant, 0);
        setMontantTotal(sum);
        console.log("Prix total est : ", sum);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    closeCaisse();
    loadItemsCaisse();
    loadItemsPersonnel();
  }, []);

  useEffect(() => {
    validate();
  }, [item.Idcaisse, item.Idpersonnel]);

  const columns = [
    {
      name: "Caisse",
      selector: (row) => row.caisse,
    },
    {
      name: "Caissier",
      selector: (row) => row.caissier,
    },
    {
      name: "Date de l'opération",
      selector: (row) => new Date(row.date).toLocaleString(),
    },
    {
      name: "Montant de l'opération",
      selector: (row) => row.montant,
    },
    {
      name: "Nature d'opération",
      selector: (row) => row.nature,
      sortable: true,
    },
    {
      name: "Sens",
      selector: (row) => row.sens,
    },
    {
      name: "Etat",
      selector: (row) => row.etat,
    },
  ];
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
    }).format(value);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <TFormulaire title="Contrôle des opérations sur la caisse ouverte">
        <TLayout cols="1fr 1fr">
          <TSelect
            label="Caisse"
            name="Idcaisse"
            items={caisse}
            columnId="Idcaisse"
            columnDisplay="Codecaisse"
            value={item.Idcaisse}
            addChange={changeHandler}
          />
          <TSelect
            label="Caissier(e)"
            name="Idpersonnel"
            items={personnel}
            columnId="Idpersonnel"
            columnDisplay="Codepersonnel"
            value={item.Idpersonnel}
            addChange={changeHandler}
          />
        </TLayout>
        <div>
          <DataTable
            title={`Montant des opérations : ${
              formatCurrency(montantTotal) || 0
            }`}
            columns={columns}
            data={items}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            highlightOnHover
            actions={
              <button className="buttonAll" onClick={control}>
                Faire le contrôle
              </button>
            }
          />
        </div>
      </TFormulaire>
      {open.control && (
        <TModal>
          <EControleCaisse
            itemId={open.Idoperation}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
            idcaisse={item.Idcaisse}
            idPer={item.Idpersonnel}
            montantEnreg={montantTotal}
          />
        </TModal>
      )}
    </>
  );
};

export const EControleCaisse = ({
  children,
  addQuiHandler,
  addRefreshHandler,
  idcaisse = 0,
  idPer = 0,
  montantEnreg = 0,
}) => {
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const changeCheckboxHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.checked });
  };

  const save = async (e) => {
    item.Idcaisse = idcaisse;
    item.Idpersonnel = idPer;
    let controleur = item.Controlerpar;

    if (item.MontantPercu == montantEnreg) {
      await api(ENDPOINTS.operationsCtrl).postOps(idcaisse, idPer, controleur);
    } else {
      if (item.Regularise == true) {
        if (item.MontantPercu < montantEnreg) {
          item.Sens = "Encaissement";
          item.Montant = montantEnreg - item.MontantPercu;
        } else {
          item.Sens = "Décaissement";
          item.Montant = montantEnreg - item.MontantPercu;
        }
        item.Dateoperation = new Date();
        item.Description = "Régularisation";
        item.Etat = "CTRL";
        delete item.Idoperation;
        delete item.Regularise;
        delete item.MontantPercu;
        try {
          await api(ENDPOINTS.operationsCtrl).postOps(
            idcaisse,
            idPer,
            controleur
          );
          await api(ENDPOINTS.operations).post(item);
        } catch (error) {
          console.log(error);
        }
        setItem({ ...OOperation });
      } else {
        return;
      }
    }
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const [controleur, setCtrl] = useState([]);
  const [exercice, setExercice] = useState([]);
  const [periode, setPeriode] = useState([]);
  const [nature, setNature] = useState([]);

  const loadItemsControleur = () => {
    api(ENDPOINTS.personnels)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.Profil == "Contrôleur");
        setCtrl(temp);
      })
      .catch((err) => alert(err));
  };
  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.Typenature == 1);
        console.log(temp);
        setNature(temp);
      })
      .catch((err) => alert(err));
  };
  const loadItemsExercice = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExercice(res.data))
      .catch((err) => alert(err));
  };
  const loadItemsPeriode = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => setPeriode(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItemsControleur();
    loadItemsExercice();
    loadItemsPeriode();
    loadItemsNature();
  }, []);

  return (
    <>
      <TFormulaire
        title="Indiquer le contrôleur de caisse"
        valPanel={<TValidationButton validate={save} cancel={addQuiHandler} />}
      >
        <TLayout cols="1fr 1fr 1fr 1fr">
          <TSelect
            label="Contrôleur"
            name="Controlerpar"
            items={controleur}
            columnId="Idpersonnel"
            columnDisplay="Codepersonnel"
            value={item.Controlerpar}
            addChange={changeHandler}
          />
          <TSelect
            label="Exercice"
            name="Idexercice"
            items={exercice}
            columnId="Idexercice"
            columnDisplay="Code"
            value={item.Idexercice}
            addChange={changeHandler}
          />
          <TSelect
            label="Periode"
            name="Idperiode"
            items={periode}
            columnId="Idperiode"
            columnDisplay="Codeperiode"
            value={item.Idperiode}
            addChange={changeHandler}
          />
          <TSelect
            label="Nature de régularisation"
            name="Idnatureoperation"
            items={nature}
            columnId="Idnatureoperation"
            columnDisplay="Codenature"
            value={item.Idnatureoperation}
            addChange={changeHandler}
          />
        </TLayout>

        <TLayout cols="1fr 1fr">
          <TInput
            label="Montant théorique"
            name="montantEnreg"
            value={montantEnreg}
            maxlength={10}
            addChange={changeHandler}
            disable={true}
          />
          <TInput
            label="Montant physique"
            name="MontantPercu"
            value={item.MontantPercu}
            maxlength={10}
            addChange={changeHandler}
          />
        </TLayout>

        <TInput
          label="Regulariser"
          type="checkbox"
          name="Regularise"
          value={item.Regularise}
          maxlength={60}
          addChange={changeCheckboxHandler}
        />
        {children}
      </TFormulaire>
    </>
  );
};
