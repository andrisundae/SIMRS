import React, { PureComponent } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Trans } from 'react-i18next';
import _ from 'lodash';

class SaveButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="save"
        color="green"
        size="mini"
        {...attributes}
      >
        <Icon name="save" />
        <Trans i18nKey="common:action.save" />
      </Button>
    );
  }
}

class CancelButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="cancel" size="mini" {...attributes}>
        <Icon name="undo" />
        <Trans i18nKey="common:action.cancel" />
      </Button>
    );
  }
}
class CancelTransaksi extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="cancelTransaksi" size="mini" {...attributes}>
        <Icon name="undo" />
        <Trans i18nKey="common:action.batal_transaksi" />
      </Button>
    );
  }
}

class AddButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="add"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="plus" />
        <Trans i18nKey="common:action.add" />
      </Button>
    );
  }
}
class AddTransaksi extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="addTransaksi"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="plus" />
        <Trans i18nKey="common:action.add_transaksi" />
      </Button>
    );
  }
}
class AddItem extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="addItem"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="plus" />
        <Trans i18nKey="common:action.add_item" />
      </Button>
    );
  }
}

class EditButton extends PureComponent {
  render() {
    let { inputRef, title, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="edit"
        color="teal"
        size="mini"
        {...attributes}
      >
        <Icon name="edit" />
        {!_.isEmpty(title) ? (
          <span>{title}</span>
        ) : (
          <Trans i18nKey="common:action.edit" />
        )}
      </Button>
    );
  }
}

class DeleteButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="delete"
        color="red"
        size="mini"
        {...attributes}
      >
        <Icon name="trash" />
        <Trans i18nKey="common:action.delete" />
      </Button>
    );
  }
}
class DeleteTransaksi extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="deleteTransaksi"
        color="red"
        size="mini"
        {...attributes}
      >
        <Icon name="trash" />
        <Trans i18nKey="common:action.hapus_transaksi" />
      </Button>
    );
  }
}

class SearchButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="search"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="search" />
        <Trans i18nKey="common:action.search" />
      </Button>
    );
  }
}

class ResetButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="reset" size="mini" {...attributes}>
        <Icon name="undo alternate" />
        <Trans i18nKey="common:action.reset" />
      </Button>
    );
  }
}

class NextButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="next" size="mini" {...attributes}>
        <Icon name="forward" />
        <Trans i18nKey="common:action.next" />
      </Button>
    );
  }
}

class PrevButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="prev" size="mini" {...attributes}>
        <Icon name="backward" />
        <Trans i18nKey="common:action.prev" />
      </Button>
    );
  }
}

class ImportButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="import"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="file excel" />
        <Trans i18nKey="common:action.import" />
      </Button>
    );
  }
}

class ExportButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="export"
        color="green"
        size="mini"
        {...attributes}
      >
        <Icon name="file excel" />
        <Trans i18nKey="common:action.export" />
      </Button>
    );
  }
}

class DuplicationButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="duplication" size="mini" {...attributes}>
        <Icon name="copy" />
        <Trans i18nKey="common:action.duplication" />
      </Button>
    );
  }
}

class PreviewButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="preview"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="search" />
        <Trans i18nKey="common:action.preview" />
      </Button>
    );
  }
}

class SelectedButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="select"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="check" />
        <Trans i18nKey="common:action.select" />
      </Button>
    );
  }
}

class PrintButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="print" size="mini" {...attributes}>
        <Icon name="print" />
        <Trans i18nKey="common:action.print" />
      </Button>
    );
  }
}

class FinishButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="finish" size="mini" {...attributes}>
        <Icon name="stop" />
        <Trans i18nKey="common:action.finish" />
      </Button>
    );
  }
}

class OkButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button ref={inputRef} name="ok" size="mini" {...attributes}>
        <Icon name="check" />
        <Trans i18nKey="common:action.ok" />
      </Button>
    );
  }
}

class PilihButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;

    return (
      <Button
        ref={inputRef}
        name="Pilih"
        color="blue"
        size="mini"
        {...attributes}
      >
        <Icon name="thumbtack" />
        <Trans i18nKey="common:action.pilih" />
      </Button>
    );
  }
}

export {
  Button,
  SaveButton,
  CancelButton,
  CancelTransaksi,
  AddButton,
  AddTransaksi,
  AddItem,
  EditButton,
  DeleteButton,
  DeleteTransaksi,
  SearchButton,
  NextButton,
  PrevButton,
  ImportButton,
  DuplicationButton,
  ExportButton,
  ResetButton,
  PreviewButton,
  SelectedButton,
  PrintButton,
  FinishButton,
  OkButton,
  PilihButton,
};
