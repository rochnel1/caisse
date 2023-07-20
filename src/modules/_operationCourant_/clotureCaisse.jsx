import { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TModal,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import DataTable from "react-data-table-component";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { OOperation } from "../_administration_/_init_";
import { ToastContainer, toast } from "react-toastify";

export const ClotureCaisse = ({ children, idPer, idCaiss }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [montantTotal, setMontantTotal] = useState(0);
  const notify = (msg) => toast.success(msg);
  const [open, setOpen] = useState({ clotureCaisse: false, Idoperation: 0 });
  const [item, setItem] = useState(OOperation);

  const fermetureCaisse = (e) => {
    localStorage.removeItem("myData");
  };

  const rafraichir = () => {
    setRefresh(!refresh);
    notify("Clôture éffectué avec succès");
    validate();
  };

  const quit = (e) => {
    setOpen({ ...open, clotureCaisse: false });
  };

  const validate = (e) => {
    idPer = item.Idpersonnel;
    idCaiss = item.Idcaisse;
    loadItems(idPer, idCaiss);
  };

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const cloturer = async (e) => {
    setOpen({ ...open, clotureCaisse: true, Idoperation: 0 });
  };

  const loadItems = (idPer, idCaiss) => {
    api(ENDPOINTS.operationsClo)
      .fetchBy2Ids(idCaiss, idPer)
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.etat == "CTRL");
        setItems(temp);
        const sum = temp.reduce((acc, op) => acc + op.montant, 0);
        setMontantTotal(sum);
        console.log(sum);
      })
      .catch((err) => alert(err));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
    }).format(value);
  };

  const columns = [
    {
      name: "Caisse",
      selector: (row) => row.caisse,
    },
    {
      name: "Contrôler par",
      selector: (row) => row.controlerpar,
    },
    {
      name: "Caissier",
      selector: (row) => row.caissier,
    },
    {
      name: "Date de contrôle",
      selector: (row) => new Date(row.date).toLocaleString(),
    },
    {
      name: "Montant au contrôle",
      selector: (row) => row.montant,
    },
    {
      name: "Etat",
      selector: (row) => row.etat,
    },
  ];

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

  useEffect(() => {
    validate();
  }, [item.Idcaisse, item.Idpersonnel]);

  useEffect(() => {
    loadItemsPersonnel();
    loadItemsCaisse();
    fermetureCaisse();
  }, []);

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
      <TFormulaire title="Clôture de caisse ">
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
            label="Caissier"
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
              <button className="buttonAll" onClick={cloturer}>
                Clôturer
              </button>
            }
          />
        </div>
      </TFormulaire>
      {open.clotureCaisse &&
        (montantTotal != 0 ? (
          <TModal>
            <EClotureCaisse
              itemId={open.Idoperation}
              addQuiHandler={quit}
              addRefreshHandler={rafraichir}
              idcaisse={item.Idcaisse}
              idPer={item.Idpersonnel}
              montantEnreg={montantTotal}
            />
          </TModal>
        ) : (
          notify("Aucune opération de caisse à validé !!")
        ))}
    </>
  );
};

export const EClotureCaisse = ({
  children,
  addQuiHandler,
  addRefreshHandler,
  idcaisse = 0,
  idPer = 0,
}) => {
  const [item, setItem] = useState(OOperation);

  const save = async (e) => {
    item.Idcaisse = idcaisse;
    item.Idpersonnel = idPer;
    try {
      //
      await api(ENDPOINTS.operationsClo).postOpsClo(idcaisse, idPer);
    } catch (error) {
      console.log(error);
    }

    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  return (
    <>
      <TFormulaire title="Clôturer la caisse">
        <div className="centered">
          <TValidationButton validate={save} cancel={addQuiHandler} />
        </div>
        {children}
      </TFormulaire>
    </>
  );
};
