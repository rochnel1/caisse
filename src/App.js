import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Caisses } from "./modules/_administration_/caisse";
import { Comptabilisation } from "./modules/_operationPeriodique_/comptabilisation";
import { Exercices } from "./modules/_administration_/exercice";
import { Generalite } from "./modules/_administration_/generalite";
import { GroupesUtilisateurs } from "./modules/_administration_/groupeUtilisateurs";
import { NatureOperation } from "./modules/_administration_/natureOperation";
import { Personnel } from "./modules/_administration_/personnel";
import { Utilisateurs } from "./modules/_administration_/utilisateurs";
import Main from "./modules/_main_/Main";
import { ClotureCaisse } from "./modules/_operationCourant_/clotureCaisse";
import { ControleCaisse } from "./modules/_operationCourant_/controleCaisse";
import { FermetureCaisse } from "./modules/_operationCourant_/fermetureCaisse";
import { OperationCaisse } from "./modules/_operationCourant_/operationsCaisse";
import { OuvertureCaisse } from "./modules/_operationCourant_/ouvertureCaisse";
import { InitBudget } from "./modules/_operationPeriodique_/initBudget";
import { SuiviRealisations } from "./modules/_operationPeriodique_/suiviRealisations";
import NotFound from "./modules/_pagesNotFound/notFound";
import EtatsBudgetaire from "./modules/_etats_/etatsBudgetaire";
import { PlanComptable } from "./modules/_administration_/planComptable";
import { HistoriqueOperations } from "./modules/_etats_/historiqueOperations";
import { Login } from "./modules/_authentification/login";
import { Register } from "./modules/_authentification/register";
import { Home } from "./modules/_main_/home";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          {/* Route pour la partie administration */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/groupe_users" element={<GroupesUtilisateurs />} />
          <Route exact path="/users" element={<Utilisateurs />} />
          <Route exact path="/caisses" element={<Caisses />} />
          <Route exact path="/exercices" element={<Exercices />} />
          <Route exact path="/generalites" element={<Generalite />} />
          <Route exact path="/personnels" element={<Personnel />} />
          <Route exact path="/nature_operation" element={<NatureOperation />} />
          <Route exact path="/plan_comptable" element={<PlanComptable />} />
          <Route
            exact
            path="/comptabilisation"
            element={<Comptabilisation />}
          />

          {/* Route pour la partie opérations périodiques*/}
          <Route exact path="/init_budgets" element={<InitBudget />} />
          <Route
            exact
            path="/suivi_realisations"
            element={<SuiviRealisations />}
          />

          {/* Route pour la partie opérations courantes*/}
          <Route exact path="/ouverture_caisse" element={<OuvertureCaisse />} />
          <Route
            exact
            path="/encaissements"
            element={<OperationCaisse sens={0} />}
          />
          <Route
            exact
            path="/decaissements"
            element={<OperationCaisse sens={1} />}
          />
          <Route exact path="/controle_caisse" element={<ControleCaisse />} />
          <Route exact path="/cloture_caisse" element={<ClotureCaisse />} />
          <Route exact path="/fermeture_caisse" element={<FermetureCaisse />} />

          {/* Route pour la partie etats*/}
          <Route exact path="/etats_budget" element={<EtatsBudgetaire />} />
          <Route exact path="/historique" element={<HistoriqueOperations />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<Register />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
