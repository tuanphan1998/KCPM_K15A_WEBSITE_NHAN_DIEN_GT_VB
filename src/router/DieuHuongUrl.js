import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import FormTextBack from '../components/FormTextBack';
import FormText from '../components/FormText';
import ListTable from '../components/ListTable';
import FormInForVsEdit from '../components/FormInForVsEdit';
import Language_speed_ai from '../components/AI/Language_speed_ai';
import DataLanguage from '../components/DataLanguage';
import New from '../components/ShowData/New';
import NewDeltal from '../components/ShowData/NewDeltal';
import Palte from '../components/ANPR/Palte';
import Infos from '../components/InfoSystem/Infos';
import Qrcode from '../components/DecodeQR/Qrcode';
class DieuHuongUrl extends Component {
    render() {
        return (
            <Router>
            <div>
                <Route exact path="/mat-truoc" component={FormText} />
                <Route path="/mat-sau" component={FormTextBack} />
                <Route path="/danh-sach" component={ListTable} />
                <Route path="/thong-ke" component={FormInForVsEdit} />
                <Route path="/giong-noi" component={Language_speed_ai} />
                <Route path="/hien-thi-danh-sach" component={New} />
                <Route path="/du-lieu-giong-noi" component={DataLanguage} />
                <Route path="/chi-tiet-tai-lieu/:slug.:id.html" component={NewDeltal} />
                <Route path="/du-lieu-update-no-ai" component={Palte} />
                <Route path="/thong-tin-he-thong"  component={Infos} />
								<Route path="/kiem-tra-qr"  component={Qrcode} />
            </div>
          </Router>
        );
    }
}

export default DieuHuongUrl;
