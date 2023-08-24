import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
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
  disable = false,
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
      ) : type === "textarea" ? (
        <label className="input-line">
          <textarea
            name={name}
            checked={value}
            placeholder={placeholder}
            maxLength={maxlength}
            onChange={addChange}
          />
          <font>{label}</font>
        </label>
      ) : disable === false ? (
        <label className="input-line">
          <input
            type={type}
            name={name}
            checked={value}
            placeholder={placeholder}
            maxLength={maxlength}
            onChange={addChange}
          />
          <font>{label}</font>
        </label>
      ) : (
        <label className="input-line">
          <input
            disabled
            type={type}
            name={name}
            checked={value}
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
  render = null,
  addChange,
  disable = false,
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
          disabled={disable}
          // defaultValue={defaultValue}
        >
          <option value="" selected defaultValue>
            Choisissez une option
          </option>
          {items &&
            items.map((o, i) => (
              <option key={i} value={o[columnId]}>
                {render ? render(o) : o[columnDisplay]}
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
  control,
  removeAll,
  validate,
  refresh,
  close,
  all,
  addLabel = "Ajouter",
  logout,
}) => {
  return (
    <>
      <div className="btn-validation">
        {}
        {add && <button onClick={add}>{addLabel}</button>}
        {all && <button onClick={all}>Tous</button>}
        {save && <button onClick={save}>Enregistrer</button>}
        {control && <button onClick={control}>Faire le contrôle</button>}
        {modify && <button onClick={modify}>Modifier</button>}
        {print && <button onClick={print}>Imprimer</button>}
        {cancel && <button onClick={cancel}>Annuler</button>}
        {remove && <button onClick={remove}>Supprimer</button>}
        {validate && <button onClick={validate}>Valider</button>}
        {removeAll && <button onClick={removeAll}>Supprimer Tous</button>}
        {refresh && <button onClick={refresh}>Rafraichir</button>}
        {close && <button onClick={close}>Fermer</button>}
        {logout && (
          <button onClick={logout}>
            <CiLogout />
            Se déconnecter
          </button>
        )}
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
  columns = [{ name: "", render: null }],
  columnsDisplay = [],
  columnsWidth = [],
  lineClick,
}) => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    setlist(items);
  }, [items]);

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
          {list &&
            list.map((o, i) => (
              <tr
                key={i}
                onClick={() => {
                  if (lineClick) lineClick(o, i);
                }}
              >
                {columns &&
                  columns.map((obj, ind) => (
                    <td key={ind}>
                      {obj.render == undefined || obj.render == null
                        ? o[obj.name]
                        : obj.render(o)}
                    </td>
                  ))}
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

export const TDataTable = ({ columns, data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} pagination />
    </>
  );
};
