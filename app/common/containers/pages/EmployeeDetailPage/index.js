import React from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import Line from "components/Line";
import DataList from "components/DataList";
import InlineList from "components/InlineList";
import Button from "components/Button";
import YesNo from "components/YesNo";

import BackLink from "containers/blocks/BackLink";
import DictionaryValue from "containers/blocks/DictionaryValue";
import DoctorDetails from "containers/blocks/DoctorDetails";

import { fetchEmployee } from "./redux";

import styles from "./style.scss";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id))
})
@connect(state => state.pages.EmployeeDetailPage)
export default class EmployeeDetailPage extends React.Component {
  render() {
    const {
      employee: {
        id,
        status,
        start_date,
        end_date,
        position,
        doctor = "",
        party: {
          id: partyId,
          last_name,
          first_name,
          second_name,
          no_tax_id,
          tax_id,
          birth_date,
          gender,
          phones,
          documents = []
        } = {}
      } = {}
    } = this.props;

    const fullName = `${last_name} ${first_name} ${second_name}`;

    return (
      <div id="employee-detail-page">
        <Helmet
          title={`Співробітник - ${fullName}`}
          meta={[
            { property: "og:title", content: `Співробітник - ${fullName}` }
          ]}
        />

        <BackLink to="/employees">
          Повернутися до списку співробітників
        </BackLink>

        <Line />

        <div className={styles.main}>
          <DataList
            list={[{ name: "Ідентифікатор співробітника", value: id }]}
          />

          <Line />

          <div className={styles.strong}>
            <DataList
              theme="small"
              list={[
                { name: "Повне Ім’я", value: fullName },
                { name: "Без ІПН", value: <YesNo bool={no_tax_id} /> },
                { name: "ІПН / Паспорт", value: tax_id }
              ]}
            />
          </div>

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: "Дата народження",
                value: format(birth_date, "DD/MM/YYYY")
              },
              {
                name: "Стать",
                value: <DictionaryValue dictionary="GENDER" value={gender} />
              }
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: "Телефони",
                value: <InlineList list={phones.map(item => item.number)} />
              },
              {
                name: "Документи",
                value: (
                  <ul className={styles.docs}>
                    {documents.map(({ number, type }) => (
                      <li key={number}>
                        <DictionaryValue
                          dictionary="DOCUMENT_TYPE"
                          value={type}
                        />
                        &nbsp; № {number}
                      </li>
                    ))}
                  </ul>
                )
              }
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              { name: "Ідентифікатор особи", value: partyId },
              {
                name: "Статус",
                value: (
                  <DictionaryValue
                    dictionary="EMPLOYEE_STATUS"
                    value={status}
                  />
                )
              },
              {
                name: "Дата початку роботи",
                value: format(start_date, "DD/MM/YYYY")
              },
              {
                name: "Дата завершення роботи",
                value: end_date ? format(end_date, "DD/MM/YYYY") : "-"
              },
              {
                name: "Позиція",
                value: (
                  <DictionaryValue dictionary="POSITION" value={position} />
                )
              },
              doctor && {
                name: "Навчання та кваліфікація",
                value: <DoctorDetails doctor={doctor} />
              }
            ]}
          />

          <div className={styles.buttons}>
            <Button
              onClick={() => this.props.router.goBack()}
              theme="border"
              color="blue"
              icon="back"
              block
            >
              Повернутися
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
