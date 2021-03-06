import React from "react";
import { compose } from "redux";
import withStyles from "withStyles";
import { connect } from "react-redux";
import Portal from "react-portal";

import { dismissError } from "redux/error";

import ShowMore from "containers/blocks/ShowMore";

import { H3, H5 } from "components/Title";

import styles from "./styles.scss";

const ErrorMessage = ({
  isErrored,
  error: { message, invalid },
  dismissError
}) => (
  <Portal
    isOpened={isErrored}
    onClose={dismissError}
    closeOnEsc
    closeOnOutsideClick
  >
    <div className={styles.root}>
      <H3>An error has occured</H3>
      <p className={styles.message}>{message}</p>
      {invalid && (
        <ShowMore name="Details" show_block>
          {invalid.map(({ entry, rules }) => (
            <div key={entry} className={styles.error}>
              <H5>{entry}</H5>
              <ul>
                {rules.map(({ rule, description }, index) => (
                  <li key={index}>
                    {rule}: {description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ShowMore>
      )}
    </div>
  </Portal>
);

export default compose(
  withStyles(styles),
  connect(
    ({ error }) => ({
      isErrored: !!error,
      error: error || {}
    }),
    { dismissError }
  )
)(ErrorMessage);
