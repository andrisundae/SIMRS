import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Progress } from 'semantic-ui-react';

class ProgressMessage extends Component {
    render() {
        let { progress, progressGlobal, progressMessage } = this.props;
        
        return (
            <Fragment>
                <Progress
                    percent={progress}
                    indicating
                    progress
                    success={progress >= 100}
                >
                    {progressMessage}
                </Progress>
                <Progress
                    percent={progressGlobal}
                    indicating
                    progress
                    success={progressGlobal >= 100}
                >
                    {progressGlobal >= 15 &&
                        <span>Upload file</span>
                    }
                    {progressGlobal >= 50 &&
                        <span>Baca file</span>
                    }
                    {progressGlobal >= 75 &&
                        <span>Proses simpan</span>
                    }
                    {progressGlobal >= 100 &&
                        <span>Sukses</span>
                    }
                </Progress>
            </Fragment>
        )
    }
}

ProgressMessage.defaultProps = {
    progress: 0,
    progressGlobal: 0,
    progressMessage: '',
}

ProgressMessage.propTypes = {
    progress: PropTypes.number,
    progressGlobal: PropTypes.number,
    progressMessage: PropTypes.string,
};

export default ProgressMessage;
