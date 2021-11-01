import InputWithCounter, {
  TextAreaWithCounter,
} from './partial-component/InputWithCounter';

import SelectData, {
  Label,
  SelectedData,
  DataList,
} from './partial-component/SelectData';

const CustomComponent = {
  InputWithCounter: {
    OneLine: InputWithCounter,
    MultiLine: TextAreaWithCounter,
  },
  SelectData: {
    FormGroup: SelectData,
    Label: Label,
    SelectedData: SelectedData,
    DataList: DataList,
  },
};

export default CustomComponent;
