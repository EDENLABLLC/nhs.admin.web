import React from "react";
import { Signer } from "vendor/react-iit-digital-signature/src";
import { SIGN_URL } from "config";

import Button from "components/Button";
import styles from "./styles.scss";

export default class SignContract extends React.Component {
  state = {
    contract: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.contract && nextProps.contract.printout_content) {
      const contractFrame = window.frames["contract"];
      if (contractFrame) {
        contractFrame.document.write(nextProps.contract.printout_content);
      }
    }
    this.setState(({ contract }) => ({
      contract: {
        ...contract,
        printout_content: nextProps.contract.printout_content
      }
    }));
  }
  componentDidMount() {
    const { contract } = this.props;
    /*TODO: Ugly ugly hack. We need to modify backend to avoid this*/
    delete contract.urgent;
    delete contract.contract_id;
    delete contract.contractor_legal_entity_id;
    delete contract.contractor_owner_id;
    delete contract.nhs_legal_entity_id;
    delete contract.nhs_signer_id;
    this.setState({ contract });
  }
  render() {
    const {
      getPrintoutContent,
      signNhs,
      isOpenedSignForm,
      openSignForm
    } = this.props;
    const { contract } = this.state;
    return (
      <div>
        <Button
          size="middle"
          color="orange"
          type="button"
          onClick={() => {
            if (!isOpenedSignForm) {
              getPrintoutContent(contract.id);
            }
            openSignForm();
          }}
        >
          Оформити, наклавши ЕЦП
        </Button>
        {isOpenedSignForm && (
          <div>
            <iframe className={styles.iframe} id="contract" name="contract" />
            <Signer.Parent
              url={SIGN_URL}
              features={{ width: 640, height: 589 }}
            >
              {({ signData }) => (
                <div>
                  <br />
                  <div className={styles.buttonGroup}>
                    <div className={styles.button}>
                      <Button
                        theme="border"
                        size="middle"
                        color="orange"
                        onClick={() => openSignForm()}
                      >
                        Відміна
                      </Button>
                    </div>
                    <div className={styles.button}>
                      <Button
                        size="middle"
                        color="orange"
                        onClick={() => {
                          signData(contract).then(({ signedContent }) => {
                            if (signedContent) {
                              signNhs(contract.id, {
                                signed_content: signedContent,
                                signed_content_encoding: "base64"
                              });
                            }
                          });
                        }}
                      >
                        Затвердити, наклавши ЕЦП
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Signer.Parent>
          </div>
        )}
      </div>
    );
  }
}
