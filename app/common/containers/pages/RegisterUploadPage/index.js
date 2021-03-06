import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import { H1 } from "components/Title";
import RegisterUploadForm from "containers/forms/RegisterUploadForm";
import BackLink from "containers/blocks/BackLink";
import { Alert } from "components/Popup";
import Button from "components/Button";

import { uploadRegister } from "redux/registers";
import { getDictionaryValues } from "reducers";

@connect(
  state => ({
    registerTypes: getDictionaryValues(state, "REGISTER_TYPE")
  }),
  { uploadRegister }
)
export default class RegisterUploadPage extends React.Component {
  state = {
    uploaded: false
  };
  render() {
    const { uploadRegister = () => {}, registerTypes, router } = this.props;

    return (
      <div id="register-upload-page">
        <Helmet
          title="Сторінка завантаження файлу"
          meta={[
            { property: "og:title", content: "Сторінка завантаження файлу" }
          ]}
        />
        <BackLink onClick={() => router.push("/registers")}>
          Завантажити файл
        </BackLink>

        <RegisterUploadForm
          data={{ registerTypes }}
          onSubmit={v =>
            uploadRegister(v).then(
              e =>
                !e.error &&
                this.setState({
                  uploaded: true
                })
            )
          }
        />
        <Alert
          ok="Повернутись до списку реєстрів"
          active={this.state.uploaded}
          title="Файл успішно завантаженно"
          onClose={() => router.push("/registers")}
        />
      </div>
    );
  }
}
