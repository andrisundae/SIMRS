import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Icon, Header, Grid } from 'semantic-ui-react';

import { filterMaster } from './redux/selector';

import Master from './containers/Master';
import ListData from './containers/ListData';
import localActions from './redux/actions';

const Main = (props) => {
  const dispatch = useDispatch();
  const filter = useSelector(filterMaster);

  const dataSourceList = useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};

        let payload = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          use_tgl: true,
        };

        dispatch(
          localActions.findPemesanan.request(props.resource, payload, params)
        );
      },
    };
  }, [filter, dispatch, localActions]);

  return (
    <Fragment>
      <Segment secondary className="content-header">
        <Header as="h4">
          <Icon name={'bars'} />
          {props.trans('title')}
        </Header>
      </Segment>
      <Segment>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <Segment padded>
                <Master trans={props.trans} resource={props.resource} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ListData
                trans={props.trans}
                resource={props.resource}
                dataSource={dataSourceList}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  trans: PropTypes.func.isRequired,
};

export default Main;
