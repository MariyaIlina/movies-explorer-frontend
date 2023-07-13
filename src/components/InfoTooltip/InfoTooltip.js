import React from "react";
import checkmark from "../images/checkmark.svg";
import cross from "../images/cross.svg";

export default function InfoTooltip(props) {
  return (
    <section className="infoTooltip infoTooltip_is-opened">
      <div className="infoTooltip__container infoTooltip__container_login">
        <div className="infoTooltip__content infoTooltip__content_login">
          <button
            className="infoTooltip__close infoTooltip__close_login"
            type="button"
            onClick={props.onClose}
          ></button>
          <img
            src={props.status ? checkmark : cross}
            alt={props.status ? "Успех" : "Ошибка"}
            className="infoTooltip__icon"
          />
          <h3 className="infoTooltip__title infoTooltip__title_login">
            {props.status
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h3>
        </div>
      </div>
    </section>
  );
}
