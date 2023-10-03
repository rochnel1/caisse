import React, { useEffect, useState } from "react";
import "react-icons/bs";
import "react-icons/ci";
import "react-icons/im";
import {
  BsBarChartLineFill,
  BsCardChecklist,
  BsFillCalculatorFill,
  BsFillClockFill,
  BsFillJournalBookmarkFill,
  BsFillLockFill,
  BsFillPersonPlusFill,
  BsListColumnsReverse,
} from "react-icons/bs";
import {
  FaBuilding,
  FaCalendar,
  FaCashRegister,
  FaCommentsDollar,
  FaFolder,
  FaFolderOpen,
  FaHome,
  FaPercent,
  FaUniversity,
  FaUser,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { TGroupeMenu, TModalv2, TValidationButton } from "../../utils/__";
import "react-icons/gi";
import {
  GiHamburgerMenu,
  GiHomeGarage,
  GiPayMoney,
  GiReceiveMoney,
} from "react-icons/gi";
import Swal from "sweetalert2";
import { CiLogout } from "react-icons/ci";

function Main({ children }) {
  const [menu, setMenu] = useState(false);
  const [logout, setLogOut] = useState(false);

  const setMenuOpenClose = (e) => {
    setMenu(!menu);
  };

  const LogOut = (e) => {
    Swal.fire({
      title: "Vous allez être déconnecter",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        const obj = {
          etat: "off",
        };
        localStorage.setItem("connexion", JSON.stringify(obj));
        setLogOut(true);
        //redirection
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    // const objString = localStorage.getItem("connexion");
    // const obj = JSON.parse(objString);
    // if (obj.etat == "off") {
    //   setLogOut(true);
    // }
  }, []);

  const menuHandler = (e) => {
    setMenu(false);
  };

  return (
    <>
      <div className="appli">
        <div className="appli-header">
          <div className="title">
            <nav>
              <nav className="logo">
                {logout == false && (
                  <button title="Afficher le menu" onClick={setMenuOpenClose}>
                    <GiHamburgerMenu />
                    <p style={{ marginLeft: "5px" }}>Menu</p>
                  </button>
                )}
              </nav>
            </nav>
            <nav className="logo">
              <h3>Gestion de la caisse courante</h3>
            </nav>
            <nav>
              {logout == false && (
                <button title="Accueil" className="buttonAll" onClick={LogOut}>
                  Se Déconnecter
                </button>
              )}
            </nav>
          </div>
          <>
            <div
              className="modal-v2"
              style={{
                display: menu ? "block" : "none",
              }}
            >
              <div className="modal-v2-wrapper" onClick={menuHandler}></div>
              <div className="menu">
                <TGroupeMenu
                  quitHandler={setMenuOpenClose}
                  groupTitle="Administration"
                  menus={[
                    {
                      active: true,
                      label: "Groupes d'utilisateurs",
                      url: "/groupe_users",
                      icon: <FaUsers />,
                    },
                    {
                      active: true,
                      label: "Utilisateurs",
                      url: "/users",
                      icon: <FaUser />,
                    },
                    {
                      active: true,
                      label: "Ma Société",
                      url: "/generalites",
                      icon: <FaBuilding />,
                    },
                    { line: true },
                    {
                      active: true,
                      label: "Caisses",
                      url: "/caisses",
                      icon: <FaCashRegister />,
                    },
                    {
                      active: true,
                      label: "Opérateurs de caisse",
                      url: "/personnels",
                      icon: <BsFillPersonPlusFill />,
                    },
                    { line: true },

                    {
                      active: true,
                      label: "Comptes généraux",
                      url: "/plan_comptable",
                      icon: <BsListColumnsReverse />,
                    },
                  ]}
                >
                  Administrer l'application de gestion de la caisse
                </TGroupeMenu>

                <TGroupeMenu
                  quitHandler={setMenuOpenClose}
                  groupTitle="Initialisation"
                  menus={[
                    {
                      active: true,
                      label: "Exercice",
                      url: "/exercices",
                      icon: <FaCalendar />,
                    },
                    {
                      active: true,
                      label: "Prévision de trésorerie",
                      url: "/init_budgets",
                      icon: <FaUniversity />,
                    },
                    {
                      active: true,
                      label: "Natures d'opérations",
                      url: "/nature_operation",
                      icon: <BsFillCalculatorFill />,
                    },
                  ]}
                >
                  Créez vos exercices et vos prévisions de trésorerie
                </TGroupeMenu>

                <TGroupeMenu
                  quitHandler={setMenuOpenClose}
                  groupTitle="Opérations courantes"
                  menus={[
                    {
                      active: true,
                      label: "Ouverture de caisse",
                      url: "/ouverture_caisse",
                      icon: <FaFolderOpen />,
                    },
                    {
                      active: true,
                      label: "Enregistrer un encaissement",
                      url: `/encaissements`,
                      icon: <GiReceiveMoney />,
                    },
                    {
                      active: true,
                      label: "Enregistrer un décaissement",
                      url: `/decaissements`,
                      icon: <GiPayMoney />,
                    },
                    {
                      active: true,
                      label: "Fermeture de la caisse",
                      url: "/fermeture_caisse",
                      icon: <FaFolder />,
                    },
                    { line: true },
                    {
                      active: true,
                      label: "Contrôle de caisse",
                      url: "/controle_caisse",
                      icon: <BsCardChecklist />,
                    },
                    {
                      active: true,
                      label: "Clôture de caisse",
                      url: "/cloture_caisse",
                      icon: <BsFillLockFill />,
                    },
                  ]}
                >
                  Faites vos traitements quotidiens de caisse
                </TGroupeMenu>

                <TGroupeMenu
                  quitHandler={setMenuOpenClose}
                  groupTitle="Opérations périodiques"
                  menus={[
                    {
                      active: true,
                      label: "Suivi des réalisations",
                      url: "/suivi_realisations",
                      icon: <FaPercent />,
                    },
                    { line: true },
                    {
                      active: true,
                      label: "Comptabilisation des opérations de caisse",
                      url: "/comptabilisation",
                      icon: <BsFillJournalBookmarkFill />,
                    },
                  ]}
                >
                  Faites vos traitements périodiques
                </TGroupeMenu>

                <TGroupeMenu
                  quitHandler={setMenuOpenClose}
                  groupTitle="Etats"
                  menus={[
                    {
                      active: true,
                      label: "Historique des encaissements et décaissement",
                      url: "/historique",
                      icon: <BsFillClockFill />,
                    },
                    {
                      active: true,
                      label: "Etats budgetaire",
                      url: "/etats_budget",
                      icon: <FaCommentsDollar />,
                    },
                    { line: true },
                    {
                      active: true,
                      label: "Tableau de bord",
                      url: "/dasboard",
                      icon: <BsBarChartLineFill />,
                    },
                  ]}
                >
                  Générer vos rapport
                </TGroupeMenu>
              </div>
            </div>
          </>
        </div>

        <div className="appli-body">{children}</div>

        <div className="appli-footer">
          <nav>&copy; GROUPE SIA - 2023 |</nav>
          <nav>Powered by Rochnel Software Engeneer.</nav>
        </div>
      </div>
    </>
  );
}

export default Main;
