import React from 'react';
import ReactDOM from 'react-dom';

// external css
import 'normalize.css';
import 'antd/dist/antd.css';

// interal css

import '~/static/scss/style.scss';
import 'react-quill/dist/quill.snow.css';
import 'perfect-scrollbar-react/dist/style.min.css';
import'bootstrap/dist/css/bootstrap.min.css';
import "~/static/css/vendor/bootstrap.css"
import "~/static/css/vendor/animate.css"
import "~/static/css/vendor/font-awesome.css"
import "~/static/js/vendor/animsition/css/animsition.css"
import "~/static/js/vendor/daterangepicker/daterangepicker-bs3.css"
import "~/static/js/vendor/morris/morris.css"
import "~/static/js/vendor/owl-carousel/owl.carousel.css"
import "~/static/js/vendor/owl-carousel/owl.theme.css"
import "~/static/js/vendor/rickshaw/rickshaw.min.css"
import "~/static/js/vendor/datetimepicker/css/bootstrap-datetimepicker.min.css"
import "~/static/js/vendor/datatables/css/jquery.dataTables.css"
import "~/static/js/vendor/datatables/datatables.bootstrap.min.css"
import "~/static/js/vendor/chosen/chosen.css"
import "~/static/js/vendor/summernote/summernote.css"
import 'font-awesome/css/font-awesome.min.css'


import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
