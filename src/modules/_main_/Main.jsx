import React, { useState } from "react";
import "react-icons/bs";
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
  FaCalendar,
  FaCashRegister,
  FaCommentsDollar,
  FaFolder,
  FaFolderOpen,
  FaPercent,
  FaUniversity,
  FaUser,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { TGroupeMenu } from "../../utils/__";

import "react-icons/gi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

function Main({ children }) {
  const [menu, setMenu] = useState(false);
  const setMenuOpenClose = (e) => {
    setMenu(!menu);
  };
  return (
    <>
      <div className="appli">
        <div className="appli-header">
          <div className="title">
            <nav>
              <nav className="logo">
                <button title="Afficher le menu" onClick={setMenuOpenClose}>
                  Caisse
                </button>
              </nav>
            </nav>
            <nav className="logo">
              <i>Gestion de la caisse courante</i>
            </nav>
            <nav>Options</nav>
          </div>
          {menu && (
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
                    url: "/",
                    icon: <FaUser />,
                  },
                  {
                    active: true,
                    label: "Généralités",
                    url: "/generalites",
                    icon: <FaWrench />,
                  },
                  { line: true },
                  {
                    active: true,
                    label: "Exercice",
                    url: "/exercices",
                    icon: <FaCalendar />,
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
                    label: "Personnel",
                    url: "/personnels",
                    icon: <BsFillPersonPlusFill />,
                  },
                  { line: true },
                  {
                    active: true,
                    label: "Natures d'opérations",
                    url: "/nature_operation",
                    icon: <BsFillCalculatorFill />,
                  },
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
                    label: "Initialisation du budget",
                    url: "/init_budgets",
                    icon: <FaUniversity />,
                  },
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
          )}
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
