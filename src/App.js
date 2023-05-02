import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Caisses } from "./modules/_administration_/caisse";
import { Comptabilisation } from "./modules/_administration_/comptabilisation";
import { Exercices } from "./modules/_administration_/exercice";
import { Generalite } from "./modules/_administration_/generalite";
import { GroupesUtilisateurs } from "./modules/_administration_/groupeUtilisateurs";
import { NatureOperation } from "./modules/_administration_/natureOperation";
import { Personnel } from "./modules/_administration_/personnel";
import { Utilisateurs } from "./modules/_administration_/utilisateurs";
import Main from "./modules/_main_/Main";
import { ClotureCaisse } from "./modules/_operationCourant_/clotureCaisse";
import { ControleCaisse } from "./modules/_operationCourant_/controleCaisse";
import { InitBudget } from "./modules/_operationPeriodique_/initBudget";
import NotFound from "./modules/_pagesNotFound/notFound";
import { OuvertureCaisse } from "./modules/_operationCourant_/ouvertureCaisse";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          {/* Route pour la partie administration */}

          <Route exact path="/" element={<Utilisateurs />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/groupe_users" element={<GroupesUtilisateurs />} />
          <Route exact path="/caisses" element={<Caisses />} />
          <Route exact path="/exercices" element={<Exercices />} />
          <Route exact path="/generalites" element={<Generalite />} />
          <Route exact path="/personnels" element={<Personnel />} />
          <Route exact path="/nature_operation" element={<NatureOperation />} />
          <Route
            exact
            path="/comptabilisation"
            element={<Comptabilisation />}
          />

          {/* Route pour la partie opérations périodiques*/}
          <Route exact path="/init_budgets" element={<InitBudget />} />

          {/* Route pour la partie opérations courantes*/}
          <Route exact path="/ouverture_caisse" element={<OuvertureCaisse />} />
          <Route exact path="/save_encaiss" element={<OuvertureCaisse />} />
          <Route exact path="/save_decaiss" element={<OuvertureCaisse />} />

          <Route exact path="/controle_caisse" element={<ControleCaisse />} />
          <Route exact path="/cloture_caisse" element={<ClotureCaisse />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
