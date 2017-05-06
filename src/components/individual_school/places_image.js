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
        return <div id="mapBox" className="soloMap col-xs-12"  >
            <div className='solo-canvas' ref="mapCanvas"></div>
        </div>
    }
    callback = (place) => {
        let holder = place[0].photos;
        if(holder !== undefined){
            let imageURL = holder[0].getUrl({'maxWidth': 1200, 'maxHeight': 1200});
            this.props.schoolURL(imageURL);
        } else {
            let imageURL = '/images/students.png';
            this.props.schoolURL(imageURL);
        }
    };
    componentWillReceiveProps(nextProps) {
        console.log('NEW PROPS:', nextProps.school.schools);
        this.clearMarkers();
        const data = nextProps.school.schools;
        if (!data) {
            return () => {
                return <p>Loading...</p>
            };
        } else {
            this.map = this.createMap(data[0]);
            let request = {
                query: `${data[0].name} admin`
            };
            //get photo information, the textSearch() sends the data and when it gets returned we go to
            //a function to resolve the information.
            let search = new google.maps.places.PlacesService(this.map);
            search.textSearch(request, this.callback);
            this.marker = this.createMarker(data[0]);
            // have to define google maps event listeners here too
            // because we can't add listeners on the map until its created
        }
    }
    componentDidMount(){
        const data = this.props.school.schools;
        this.clearMarkers();
        if(!data){
            return () => { return <p>Loading...</p>};
        } else {
            this.map = this.createMap(data[0]);
            let request = {
                query: `${data[0].name} admin`
            };
            //get photo information, the textSearch() sends the data and when it gets returned we go to
            //a function to resolve the information.
            let search = new google.maps.places.PlacesService(this.map);
            search.textSearch(request, this.callback);
            this.marker = this.createMarker(data[0]);
            // have to define google maps event listeners here too
            // because we can't add listeners on the map until its created
        }
    }
    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'zoom_changed')
    }
    createMap(data) {
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.createLatLng(data),
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            streetview: true,
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
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
            case (sizeOfSchool < 10000):
                return '/images/md_school.png';
                break;
            case (sizeOfSchool < 25000):
                return '/images/sm_school.png';
                break;
            case (sizeOfSchool >= 25000):
                return '/images/lg_school.png';
                break;
            default:
                return '/images/sm_school.png';
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
}

function mapStateToProps(state){
    return{
        school: state.schools.single
    }
}
export default connect(mapStateToProps, {schoolURL})(Photo);
