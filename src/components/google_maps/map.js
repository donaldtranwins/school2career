import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForSchools, mapBoundsInput } from '../../actions/actions_index';

class GMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            zoom: 10,
            markers: []
        };
    }

    // static propTypes() {
    //     initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
    // }

    render() {
        return <div id="mapBox" className="GMap">
            <div className='GMap-canvas' ref="mapCanvas"></div>
        </div>
    }
    callback = (place) => {
        let holder = place[0].photos;
        let hoping = holder[0].getUrl({'maxWidth': 400, 'maxHeight': 400});
        // console.log(hoping);

    };
    initMap(){
        const data = this.props.schools.all.data;
        const userInput = this.props.userInput.value;
        this.clearMarkers();
        if(!userInput){
            return <p>Loading...</p>;
        } else {
            // create the map, marker and infoWindow after the component has
            // been rendered because we need to manipulate the DOM for Google =(
            this.map = this.createMap(userInput.latLng);
            google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
            google.maps.event.addListener(this.map, 'idle', () => this.getMapBounds(this.nextProps));
        }
    }
    createSchoolMarkers(){
        let request = {
            query: 'Harvard University'
        };
        const data = this.props.schools.all.data;
        var search = new google.maps.places.PlacesService(this.map);
        search.textSearch(request, this.callback);
        if(data){
            for (var i = 0; i < data.data.length; i++) {
                this.marker = this.createMarker(data.data[i]);
                this.infoWindow = this.createInfoWindow(this.marker, data.data[i]);
            }
        }
    }
    componentDidMount(){
        this.initMap();
    }
    nextProps = null;
    componentWillReceiveProps(nextProps){
        this.createSchoolMarkers();
        if(nextProps.center.lat !== this.props.center.lat){
            this.initMap();
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
    getMapBounds(nextProps) {
        const bounds = this.map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        let mapBounds = {
            ne: {
                lat: ne.lat(),
                lng: ne.lng()
            },
            sw: {
                lat: sw.lat(),
                lng: sw.lng()
            }
        };
        if (this.props.boundsInput.mapBoundsInput === null){
            const userInputMapBounds = this.props.userInput.value;  // TODO fix this
            userInputMapBounds.mapBounds = mapBounds;
            this.props.mapBoundsInput(userInputMapBounds);
            this.props.searchForSchools(userInputMapBounds);
        } else if (this.props.boundsInput.mapBoundsInput.mapBounds.ne.lat !== mapBounds.ne.lat) {
            const userInputMapBounds = this.props.userInput.value;  // TODO fix this
            userInputMapBounds.mapBounds = mapBounds;
            this.props.mapBoundsInput(userInputMapBounds);
            this.props.searchForSchools(userInputMapBounds);
        }
    }
    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }
}

function mapStateToProps(state){
    return{
        schools: state.schools,
        center: state.center.center,
        userInput: state.userInput,
        boundsInput: state.mapBoundsInput
    }
}
export default connect(mapStateToProps, { searchForSchools, mapBoundsInput })(GMap);
