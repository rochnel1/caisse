import { useNavigate, useNavigation } from "react-router-dom";

export const TInput = ({
  children,
  type = "text",
  name,
  label,
  value,
  placeholder,
  maxlength,
  addChange,
}) => {
  return (
    <>
      {type !== "checkbox" ? (
        <label className="input">
          <font>{label}</font>
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            maxLength={maxlength}
            onChange={addChange}
          />
        </label>
      ) : (
        <label className="input-line">
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            maxLength={maxlength}
            onChange={addChange}
          />
          <font>{label}</font>
        </label>
      )}
      {children}
    </>
  );
};

export const TSelect = ({
  children,
  name,
  label,
  value,
  placeholder,
  maxlength,
  items = [
    { c1: 1, c2: 2 },
    { c1: 5, c2: 1 },
  ],
  columnId = "c1",
  columnDisplay = "c2",
  addChange,
}) => {
  return (
    <>
      <label className="input">
        <font>{label}</font>
        <select
          name={name}
          value={value}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={addChange}
        >
          {items &&
            items.map((o, i) => (
              <option key={i} value={o[columnId]}>
                {o[columnDisplay]}
              </option>
            ))}
        </select>
      </label>
      {children}
    </>
  );
};

export const TValidationButton = ({
  children,
  add,
  modify,
  print,
  cancel,
  remove,
  save,
  saveAndPrint,
  removeAll,
  validate,
  close,
}) => {
  return (
    <>
      <div className="btn-validation">
        {add && <button onClick={add}>Ajouter</button>}
        {save && <button onClick={save}>Enregistrer</button>}
        {saveAndPrint && (
          <button onClick={saveAndPrint}>Enregistrer & imprimer</button>
        )}
        {modify && <button onClick={modify}>Modifier</button>}
        {print && <button onClick={print}>Imprimer</button>}
        {cancel && <button onClick={cancel}>Annuler</button>}
        {remove && <button onClick={remove}>Supprimer</button>}
        {validate && <button onClick={validate}>Valider</button>}
        {removeAll && <button onClick={removeAll}>Supprimer Tous</button>}
        {close && <button onClick={close}>Fermer</button>}
        {children}
      </div>
    </>
  );
};

export const TLabelTitle = ({ children, title = "Titre de l'entité" }) => {
  return (
    <>
      <div className="label-title">
        <nav>
          <h3>{title}</h3>
        </nav>
        <div>{children}</div>
      </div>
    </>
  );
};

export const TFormulaire = ({
  children,
  title = "Titre écran",
  icone,
  valPanel,
}) => {
  return (
    <>
      <div className="form">
        <nav className="form-header">
          <nav className="form-title">
            {icone && <i>{icone}</i>}
            <h3>{title}</h3>
          </nav>
          <nav className="form-title">{valPanel}</nav>
        </nav>
        <div className="form-body">{children}</div>
      </div>
    </>
  );
};

export const TLayout = ({ children, cols, rows }) => {
  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: cols, gridTemplateRows: rows }}
      >
        {children}
      </div>
    </>
  );
};

export const TModal = ({ children }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-contain">{children}</div>
      </div>
    </>
  );
};

export const TTable = ({
  children,
  items,
  columns = [],
  columnsDisplay = [],
  columnsWidth = [],
}) => {
  return (
    <>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {columnsDisplay &&
              columnsDisplay.map((o, i) => (
                <td key={i} style={{ width: columnsWidth[i] }}>
                  {o}
                </td>
              ))}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((o, i) => (
              <tr key={i}>
                {columns &&
                  columns.map((obj, ind) => <td key={ind}>{o[obj]}</td>)}
              </tr>
            ))}
        </tbody>
        <tfoot>{children}</tfoot>
      </table>
    </>
  );
};

export const TGroupeMenu = ({
  children,
  groupTitle = "Groupe de menu",
  menus = [{ active: true, label: "fonction", url: "", icon: null }],
  quitHandler,
}) => {
  const navigate = useNavigate();
  const gotoURL = (url) => {
    navigate(url);
    if (quitHandler) {
      quitHandler(url);
    }
  };
  return (
    <>
      <div className="menu-group">
        <h4>{groupTitle}</h4>
        <div className="menu-group-list">
          {menus &&
            menus.map((o, i) => (
              <nav key={i}>
                {o["line"] ? (
                  <>
                    <hr />
                  </>
                ) : (
                  <button
                    disabled={o["active"] === false}
                    onClick={(e) => gotoURL(o["url"])}
                  >
                    {o["icon"] ? (
                      <nav className="menu-icon">{o["icon"]}</nav>
                    ) : (
                      <nav></nav>
                    )}
                    <font>{o["label"]}</font>
                  </button>
                )}
              </nav>
            ))}
        </div>
        <small>{children}</small>
      </div>
    </>
  );
};

export const TFormList = ({
  children,
  title = "Titre de l'entité",
  options,
}) => {
  return (
    <>
      <div>
        <div className="form-list">
          <nav>
            <TLabelTitle title={title} />
          </nav>
          <nav>{options}</nav>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
