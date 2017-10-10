import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';
import MedicationsCreateForm from 'containers/forms/MedicationsCreateForm';
import { getAllInnmDosages, getDictionary } from 'reducers';

import { onSubmit } from './redux';

@withRouter
@translate()
@connect(state => ({
  innm_dosages: getAllInnmDosages(state),
  medication_unit: getDictionary(state, 'MEDICATION_UNIT'),
  medication_form: getDictionary(state, 'MEDICATION_FORM'),
  countries: getDictionary(state, 'COUNTRY'),
}), { onSubmit })
export default class MedicationCreatePage extends React.Component {

  render() {
    const {
      t,
      router,
      innm_dosages = [],
      medication_unit = [],
      medication_form = [],
      countries = [],
      onSubmit,
    } = this.props;

    return (
      <div id="medicaion-create-page">
        <Helmet
          title={t('Medicaion create page')}
          meta={[
            { property: 'og:title', content: t('Medication create page') },
          ]}
        />
        <BackLink onClick={() => router.goBack()}>Додати торгову назву</BackLink>
        <Line />

        <MedicationsCreateForm
          onSubmit={onSubmit}
          data={{ innm_dosages, medication_unit, medication_form, countries }}
        />
      </div>
    );
  }
}