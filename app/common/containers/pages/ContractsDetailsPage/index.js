import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { provideHooks } from "redial";

import ContractDetail from "containers/blocks/ContractDetail";
import TerminateContractForm from "containers/forms/TerminateContractForm";

import { getContract } from "reducers";
import { terminateContract } from "redux/contracts";

import { hasScope } from "helpers/scope";

import { fetchContract, getContractPrintoutContent } from "./redux";

class ContractDetailsPage extends React.Component {
  render() {
    const {
      contract = {},
      getContractPrintoutContent,
      terminateContract
    } = this.props;
    return (
      <div id="contract-detail-page">
        <ContractDetail
          contract={contract}
          type="contract"
          getPrintoutContent={getContractPrintoutContent}
        />
        {contract.status === "VERIFIED" && (
          <TerminateContractForm
            id={contract.id}
            terminateContract={terminateContract}
          />
        )}
      </div>
    );
  }
}

export default compose(
  provideHooks({
    fetch: ({ dispatch, getState, params: { id } }) =>
      dispatch(fetchContract(id))
  }),
  connect(
    (state, { params: { id } }) => ({
      contract: getContract(state, id)
    }),
    { getContractPrintoutContent, terminateContract }
  )
)(ContractDetailsPage);
