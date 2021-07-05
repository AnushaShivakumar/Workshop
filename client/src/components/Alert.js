import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div className="container alertContainer">
    <div key={alert.id} className={`alert alert--${alert.alertType}`} role="alert">
        { alert.msg }
    </div>
    </div>
));


const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);