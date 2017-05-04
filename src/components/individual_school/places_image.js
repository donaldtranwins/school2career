import React, { Component } from 'react';
import { connect } from 'react-redux';
import { schoolURL } from '../../actions/actions_index';


class Photo extends Component {

    constructor(props){
        super(props);
        this.state = {
            zoom: 16,
            markers: []
        };
    }

    render() {
        return <div id="mapBox" className="soloMap col-xs col-md-10"  >
            <div className='solo-canvas' ref="mapCanvas"></div>
        </div>
    }
    callback = (place) => {


        let holder = place[0].photos;
        if(holder !== undefined){
            let imageURL = holder[0].getUrl({'maxWidth': 1200, 'maxHeight': 1200});
            this.props.schoolURL(imageURL);
        };
    };
    componentDidMount(){
        const data = this.props.school.schools;
        this.clearMarkers();
        if(!data){
            return () => { return <p>Loading...</p>};
        } else {
            // create the map, marker and infoWindow after the component has
            // been rendered because we need to manipulate the DOM for Google =(
            this.map = this.createMap(data[0]);
            let request = {
                query: `${data[0].name} admin`
            };
            //get photo infomration, the textSearch() sends the data and when it gets returned we go to
            //a function to resolve the information.
            var search = new google.maps.places.PlacesService(this.map);
            search.textSearch(request, this.callback);
            this.marker = this.createMarker(data[0]);
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
            center: this.mapCenter(data),
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            streetview: true,
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }

    mapCenter(data) {
        return new google.maps.LatLng(
            // this.props.initialCenter.lat,
            // this.props.initialCenter.lng
            data.lat,
            data.lng
        )
    }

    createLatLng(pos){                      //added this function, would set the lat and lng, may
        //not be needed. could potentially do this all in create markers
        return new google.maps.LatLng(
            pos.lat,
            pos.lng
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
        const iconForSchool = this.colorForMarker(parseInt(data.size));
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

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }
}

function mapStateToProps(state){
    return{
        school: state.schools.single
    }
}
export default connect(mapStateToProps, {schoolURL})(Photo);
