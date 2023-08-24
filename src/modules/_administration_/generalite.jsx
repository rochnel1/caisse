import { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TValidationButton,
} from "../../utils/__";
import { OGeneralite } from "./_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";

export const Generalite = ({ children }) => {
  const [item, setItem] = useState(OGeneralite);
  const notifySuccess = (msg) => toast.success(msg);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    console.log(item.Idgeneralite);
    if (item.Idgeneralite === undefined) {
      delete item.Idgeneralite;
      delete item.Monnaie;
      await api(ENDPOINTS.generalites).post(item);
      notifySuccess("Enregister");
    } else {
      await api(ENDPOINTS.generalites).put(item.Idgeneralite, item);
      notifySuccess("Enregister");
    }
  };

  useEffect(() => {
    setItem({ ...OGeneralite });
    api(ENDPOINTS.generalites)
      .fetchById(6)
      .then((res) => {
        setItem(res.data);
        // item.Monnaie == "FCFA";
      })
      .catch((err) => alert(err));
    item.Monnaie = "FCFA";
  }, []);

  const print = (e) => {
    console.log("Imprimer = " + item);
  };

  return (
    <>
      <div>
        <TFormulaire title="Informations sur l'entreprise">
          <TLayout cols="1fr 1fr">
            <TInput
              label="Raison sociale"
              name="Raisonsocial"
              value={item.Raisonsocial}
              maxlength={10}
              addChange={changeHandler}
            />
            <TInput
              label="Adresse"
              name="Adresse"
              value={item.Adresse}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr 1fr">
            <TInput
              label="Ville"
              name="Ville"
              value={item.Ville}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Région"
              name="Region"
              value={item.Region}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Pays"
              name="Pays"
              value={item.Pays}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Monnaie"
              name="Monnaie"
              value={item.Monnaie}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr">
            <TInput
              label="Format"
              name="Format"
              value={item.Format}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="NIU"
              name="Niu"
              value={item.Niu}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Registre de commerce"
              name="Registrecommerce"
              value={item.Registrecommerce}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr">
            <TInput
              label="Telephone"
              name="Telephone"
              value={item.Telephone}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Adresse Mail"
              name="Adressemail"
              value={item.Adressemail}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Site internet"
              name="Siteinternet"
              value={item.Siteinternet}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
        </TFormulaire>
        <TValidationButton print={print} save={save} />
      </div>
      <ToastContainer
        autoClose={1400}
        position="top-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      ;
    </>
  );
};
