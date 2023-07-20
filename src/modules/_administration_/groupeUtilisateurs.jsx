import { useState, useEffect } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TModal,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OGroupeUtilisateur } from "./_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { Alert } from "../_pagesNotFound/alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Load } from "../../utils/load";

export const GroupesUtilisateurs = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({
    groupeUtilisateur: false,
    Idgpeutilisateur: 0,
  });

  const [refresh, setRefresh] = useState(false);
  const notify = () => toast.warning("Serveur non disponible !");

  const add = (e) => {
    setOpen({ ...open, groupeUtilisateur: true, Idgpeutilisateur: 0 });
  };

  const quit = (e) => {
    setOpen({ ...open, groupeUtilisateur: false, groupe: false });
  };

  const modify = (id) => {
    setOpen({ ...open, groupeUtilisateur: true, Idgpeutilisateur: id });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadGpeUtilisateurs = () => {
    api(ENDPOINTS.groupeUtilisateur)
      .fetch()
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => notify());
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    loadGpeUtilisateurs();
  }, [refresh]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Load loading={loading} />
      ) : (
        <TFormList
          title="Liste des groupes utilisateurs"
          options={<TValidationButton add={add} refresh={rafraichir} />}
        >
          <TTable
            items={items}
            columns={[{ name: "Nomgroupe" }]}
            columnsDisplay={["Nom du Groupe"]}
            lineClick={(o) => {
              modify(o.Idgpeutilisateur);
            }}
          ></TTable>
        </TFormList>
      )}

      {open.groupeUtilisateur && (
        <TModal>
          <EGroupeUtilisateur
            itemId={open.Idgpeutilisateur}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EGroupeUtilisateur = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [itemGrp, setItemGrp] = useState(OGroupeUtilisateur);

  const changeHandler = (e) => {
    setItemGrp({ ...itemGrp, [e.target.name]: e.target.value });
  };

  // const onSubmit = async;
  const save = async (e) => {
    if (itemGrp.Idgpeutilisateur === 0) {
      //nouvel enregistrement
      delete itemGrp.Idgpeutilisateur;
      await api(ENDPOINTS.groupeUtilisateur).post(itemGrp);
    } else {
      //modification
      await api(ENDPOINTS.groupeUtilisateur).put(
        itemGrp.Idgpeutilisateur,
        itemGrp
      );
    }
    setItemGrp({ ...OGroupeUtilisateur });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (itemGrp.Idgpeutilisateur === 0) return;
    const res = await api(ENDPOINTS.groupeUtilisateur).delete(
      itemGrp.Idgpeutilisateur,
      itemGrp
    );
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItemGrp({ ...OGroupeUtilisateur });
    if (itemId !== 0) {
      api(ENDPOINTS.groupeUtilisateur)
        .fetchById(itemId)
        .then((res) => setItemGrp(res.data))
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <TFormulaire
      title="Nouveau Groupe d'utlisateur"
      valPanel={
        <TValidationButton
          add={save}
          addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
          remove={(e) =>
            itemGrp.Idgpeutilisateur !== 0 ? remove() : undefined
          }
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Nom du groupe"
        name="Nomgroupe"
        value={itemGrp.Nomgroupe}
        maxlength={60}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
