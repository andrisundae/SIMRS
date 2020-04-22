import React, { PureComponent } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

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

class EditButton extends PureComponent {
  render() {
    let { inputRef, ...attributes } = this.props;
    return (
      <Button
        ref={inputRef}
        name="edit"
        color="teal"
        size="mini"
        {...attributes}
      >
        <Icon name="edit" />
        <Trans i18nKey="common:action.edit" />
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
                <Icon name='check' />
                <Trans i18nKey="common:action.ok" />
            </Button>
        )
    }
}

export {
<<<<<<< HEAD
    Button,
    SaveButton,
    CancelButton,
    AddButton,
    EditButton,
    DeleteButton,
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
    OkButton
}
=======
  Button,
  SaveButton,
  CancelButton,
  AddButton,
  EditButton,
  DeleteButton,
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
};
>>>>>>> origin/dev
