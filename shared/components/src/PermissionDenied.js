import React, { PureComponent } from 'react';

class PermissionDenied extends PureComponent {
    render() {

        return (
            <div className="row margin-top-10">
                <div className="col-md-12">
                    <span>Anda tidak mempunyai hak akses pada halaman ini!</span>
                </div>
            </div>
        );
    }
}

export default PermissionDenied;
