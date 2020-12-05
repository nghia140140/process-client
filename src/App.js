import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastProvider, useToasts } from 'react-toast-notifications'

import AppRouter from './routes';
import { LocaleWrapper } from './views/container/commons';
import store, { persistor } from './state/store';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';
import { getObject } from './views/utilities/helpers/utilObject';

class App extends React.Component {
  async componentDidMount() {
    [
      "./static/js/main.js" ,
      "./static/js/vendor/jquery/jquery-1.11.2.min.js" ,
      "./static/js/vendor/bootstrap/bootstrap.min.js",
      "./static/js/vendor/jRespond/jRespond.min.js",
      "./static/js/vendor/d3/d3.min.js",
      "./static/js/vendor/d3/d3.layout.min.js",
      "./static/js/vendor/rickshaw/rickshaw.min.js",
      "./static/js/vendor/sparkline/jquery.sparkline.min.js",
      "./static/js/vendor/slimscroll/jquery.slimscroll.min.js",
      "./static/js/vendor/animsition/js/jquery.animsition.min.js",
      "./static/js/vendor/daterangepicker/moment.min.js",
      "./static/js/vendor/daterangepicker/daterangepicker.js",
      "./static/js/vendor/screenfull/screenfull.min.js",
      "./static/js/vendor/flot/jquery.flot.min.js",
      "./static/js/vendor/flot-tooltip/jquery.flot.tooltip.min.js",
      "./static/js/vendor/flot-spline/jquery.flot.spline.min.js",
      "./static/js/vendor/easypiechart/jquery.easypiechart.min.js",
      "./static/js/vendor/raphael/raphael-min.js",
      "./static/js/vendor/morris/morris.min.js",
      "./static/js/vendor/owl-carousel/owl.carousel.min.js",
      "./static/js/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js",
      "./static/js/vendor/datatables/js/jquery.dataTables.min.js",
      "./static/js/vendor/datatables/extensions/dataTables.bootstrap.js",
      "./static/js/vendor/chosen/chosen.jquery.min.js",
      "./static/js/vendor/summernote/summernote.min.js",
      "./static/js/vendor/coolclock/coolclock.js",
      "./static/js/vendor/coolclock/excanvas.js",
    ].map(item=>{
      const script = document.createElement("script");
      script.src = item
      script.async = true;
      document.body.appendChild(script);
    })
  }

  handleReceiveNotify = (message) => {
    console.log(message)
    // ToastsStore.success("Hey, you just clicked!")

    toast.notify(JSON.stringify(getObject(message, 'data.firebaseMessagingData.notification')), { position: 'top-right' })
  }

  render() {
    return (
      <ToastProvider>
        
        <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocaleWrapper>
            <AppRouter {...this.props} />
          </LocaleWrapper>
        </PersistGate>
      </ReduxProvider>
      </ToastProvider>
    );
  }
}

export default App;
