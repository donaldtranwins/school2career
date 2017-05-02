import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchForSchools, mapBoundsInput } from '../../actions/actions_index';
import { Link } from 'react-router';
import ReactDOMServer from 'react-dom/server';

class GMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            zoom: 10,
            markers: []
        };
    }

    render() {
        return <div id="mapBox" className="GMap">
            <div className='GMap-canvas' ref="mapCanvas"></div>
        </div>
    }

    initMap(){
        // const data = this.props.schools;
        const userInput = this.props.userInput.value;
        this.clearMarkers();
        if(!userInput){
            return <p>Loading...</p>;
        } else {
            // create the map, marker and infoWindow after the component has
            // been rendered because we need to manipulate the DOM for Google =(
            this.map = this.createMap(userInput.latLng);
            google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
            google.maps.event.addListener(this.map, 'idle', () => this.getMapBounds());
        }
    }
    createSchoolMarkers(nextProps){
        const data = nextProps.schools.all;
        if(data){
            //get photo infomration, the textSearch() sends the data and when it gets returned we go to
            //a function to resolve the information.
            for (var i = 0; i < data.length; i++) {
                this.marker = this.createMarker(data[i]);
                this.infoWindow = this.createInfoWindow(this.marker, data[i]);
            }
        }
    }
    componentDidMount(){
        this.initMap();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.center.lat !== this.props.center.lat ||
            this.props.userInput.value.distanceSlider !== nextProps.userInput.value.distanceSlider){
            this.initMap();
            // this.clearMarkers();
            // this.createSchoolMarkers(nextProps);
        }
        this.clearMarkers();   //TODO: drops markers quite often
        this.createSchoolMarkers(nextProps);
    }
    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'zoom_changed')
    }

    setZoom() {
        let zoomLevel = null;
        if(this.props.userInput.value.distanceSlider !== undefined) {
            const distance = this.props.userInput.value.distanceSlider;
            if (distance <= 50) {
                zoomLevel = 8;
            } else if (distance <= 100) {
                zoomLevel = 10;
            } else if (distance <= 150) {
                zoomLevel = 11;
            } else if (distance <= 200) {
                zoomLevel = 12;
            } else if (distance <= 250) {
                zoomLevel = 14;
            } else if (distance <= 300) {
                zoomLevel = 16;
            }
        } else {
            zoomLevel = 10;
        }
        this.setState({
            zoom : zoomLevel
        });

    }
    createMap(data) {
        this.setZoom();
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.mapCenter(data)
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }

    mapCenter(data) {
        return new google.maps.LatLng(
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
                return '/images/gradhat_red.png';
                break;
            case (sizeOfSchool <= 20000):
                return '/images/gradhat_green.png';
                break;
            case (sizeOfSchool <= 30000):
                return '/images/gradhat_blue.png';
                break;
            case (sizeOfSchool <= 40000):
                return '/images/gradhat_purple.png';
                break;
            case (sizeOfSchool > 40000):
                return '/images/gradhat_yellow.png';
                break;
            default:
                return '/images/gradhat_red.png';
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

    createInfoWindow(marker, data) {  //added in both params

        // let content = <div><div><h6><Link to={`/school/${data.OPEID}`}>{data.INSTNM}</Link></h6></div><div>{data.CITY}, {data.STABBR}</div><div><a target="_blank" href="http://{data.INSTURL}">data.INSTURL</a></div></div>;

        let content = '<div><h6 >' + data.name + '</h6></div>'
            + '<div>' + data.city + ', ' + data.state + '</div>'
            + '<div><a target="_blank" href=http://' + data.url + '>' + data.url + '</a></div>';
        // let contentString = ReactDOMServer.renderToString(<div className='InfoWindow'>{content} </div>);
        let infoWindow =  new google.maps.InfoWindow({
                map: this.map,
                anchor: marker,
                content: content
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
        if (this.props.boundsInput.mapBoundsInput === null ||
                this.props.boundsInput.mapBoundsInput.mapBounds.ne.lat !== mapBounds.ne.lat){
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
