import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForSchools } from '../../actions/actions_index'

class GMap extends Component {

    // state = { zoom: 7 };

    constructor(props){
        super(props);
        this.state = {
            zoom: 7,
            markers: []
        };
    }

    static propTypes() {
        initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
    }

    render() {
        return <div className="GMap">
            <div className='GMap-canvas' ref="mapCanvas"></div>
        </div>
    }

    componentDidMount() {
        const data = this.props.schools.all.data;
        this.clearMarkers();
        if(!data){
            return () => { return <p>Loading...</p>};
        } else {
            // create the map, marker and infoWindow after the component has
            // been rendered because we need to manipulate the DOM for Google =(
            this.map = this.createMap(data.data[1]);
            for (var i = 0; i < data.data.length; i++) {
                this.marker = this.createMarker(data.data[i]);
                this.infoWindow = this.createInfoWindow(this.marker, data.data[i]);
            }

            // have to define google maps event listeners here too
            // because we can't add listeners on the map until its created
            google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
        }
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'zoom_changed')
    }

    createMap(data) {
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.mapCenter(data)
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }

    mapCenter(data) {
        console.log('mapCenter: ', data);
        return new google.maps.LatLng(
            // this.props.initialCenter.lat,
            // this.props.initialCenter.lng
            data.LATITUDE,
            data.LONGITUDE
        )
    }

    createLatLng(pos){                      //added this function, would set the lat and lng, may
                                             //not be needed. could potentially do this all in create markers
        return new google.maps.LatLng(
            pos.LATITUDE,
            pos.LONGITUDE
        )
    }

    clearMarkers() {
        for (let m in this.state.markers) {
            this.state.markers[m].setMap(null)
        }
        this.setState ({
            markers : []
        });
    }

    colorForMarker(sizeOfSchool) {
        switch (true) {
            case (sizeOfSchool <= 10000):
                return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                break;
            case (sizeOfSchool <= 20000):
                return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                break;
            case (sizeOfSchool <= 30000):
                return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                break;
            case (sizeOfSchool <= 40000):
                return 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
                break;
            case (sizeOfSchool > 40000):
                return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                break;
            default:
                return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                break;
        }

    }

    createMarker(data) { //would add in (pos) as a parameter
        console.log("data", data.UGDS);
        debugger;
        const iconForSchool = this.colorForMarker(parseInt(data.UGDS));
        const newMarker = new google.maps.Marker({
            position: this.createLatLng(data),  //this would have to change to likely take in positions and
            //then create markers for specific positions. this.createLatLng(pos);
            map: this.map,
            icon: iconForSchool
        });
        let tempMarkers = this.state.markers;
        tempMarkers.push(newMarker);
        this.setState({
            markers : tempMarkers
        });
        return newMarker;
    }

    createInfoWindow(marker, data) {  //added in both params

        {/*const content = <div><h6>{data.INSTNM}</h6></div>*/}

        let content = '<div><h6>' + data.INSTNM + '</h6></div>'
            + '<div>' + data.CITY + ', ' + data.STABBR + '</div>'
            + '<div><a target="_blank" href=http://' + data.INSTURL + '>' + data.INSTURL + '</a></div>';
        let contentString = "<div class='InfoWindow'>" + content + "</div>"; //changed to display specific content
        let infoWindow =  new google.maps.InfoWindow({
                map: this.map,
                anchor: marker,
                content: contentString
            });
        infoWindow.close();
        this.marker.addListener('click', function() {
            infoWindow.open(this.map, marker);
        });
        this.map.addListener('click', function () {
            infoWindow.close();
        });
    }

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }
}

function mapStateToProps(state){
    return{
        schools: state.schools
    }
}
export default connect(mapStateToProps, {searchForSchools: searchForSchools})(GMap);
