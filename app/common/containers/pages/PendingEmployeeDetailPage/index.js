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

import { fetchEmployee } from "./redux";

import styles from "./style.scss";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id))
})
@connect(state => state.pages.PendingEmployeeDetailPage)
export default class PendingEmployeeDetailPage extends React.Component {
  render() {
    const { employee = {} } = this.props;

    const fullName = `${employee.party.last_name} ${
      employee.party.first_name
    } ${employee.party.second_name}`;

    return (
      <div id="pending-employee-detail-page">
        <Helmet
          title={`Співробітник - ${fullName}`}
          meta={[
            { property: "og:title", content: `Співробітник - ${fullName}` }
          ]}
        />

        <BackLink to="/pending-employees">
          Повернутися до списку співробітників
        </BackLink>

        <Line />

        <div className={styles.main}>
          <DataList
            list={[
              { name: "Ідентифікатор ", value: employee.id },
              {
                name: "Дата реєстрації",
                value: format(employee.inserted_at, "DD/MM/YYYY")
              },
              {
                name: "Тип працівника",
                value: (
                  <DictionaryValue
                    dictionary="EMPLOYEE_TYPE"
                    value={employee.employee_type}
                  />
                )
              }
            ]}
          />

          <Line />

          <div className={styles.strong}>
            <DataList
              theme="small"
              list={[
                {
                  name: "Позиція",
                  value: (
                    <DictionaryValue
                      dictionary="POSITION"
                      value={employee.position}
                    />
                  )
                },
                { name: "Повне Ім’я", value: fullName },
                {
                  name: "Без ІПН",
                  value: <YesNo bool={employee.party.no_tax_id} />
                },
                { name: "ІПН / Паспорт", value: employee.party.tax_id },
                {
                  name: "Телефони",
                  value: (
                    <InlineList
                      list={employee.party.phones.map(item => item.number)}
                    />
                  )
                }
              ]}
            />
          </div>

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: "Ідентифікатор Юридичної/Фізичної особи",
                value: employee.legal_entity_id
              },
              {
                name: "Юридична/Фізична особа",
                value: employee.legal_entity_name
              },
              { name: "ЕДРПОУ", value: employee.edrpou }
            ]}
          />

          <div className={styles.buttons}>
            <Button
              onClick={() => this.props.history.goBack()}
              theme="border"
              color="blue"
              icon="back"
              block
            >
              Повернутися до списку
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
