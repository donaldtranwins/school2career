import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchForSchools, mapBoundsInput } from '../../actions/actions_index';

class GMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            zoom: 10,
            markers: [],
            markerCluster : null
        };
    }
    render() {
        return (
            <div className="GMap">
                <div className='GMap-canvas' ref="mapCanvas"></div>
            </div>
        )

    }
    initMap(){
        const userInput = this.props.userInput.value;
        if(!userInput){
            return <p>Loading...</p>;
        } else {
            // create the map, marker and infoWindow after the component has
            // been rendered because we need to manipulate the DOM for Google
            this.map = this.createMap(userInput.latLng);
            google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
            google.maps.event.addListener(this.map, 'idle', () => this.getMapBounds());
        }
        this.createLegend();
    }
    createSchoolMarkers(nextProps){
        const data = nextProps.schools.all;
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
        }
        if (this.state.markerCluster !== null) {
            this.state.markerCluster.clearMarkers()
        }
        if(data){
            this.setState({
                markers: []
            }, () => {
                for (let i = 0; i < data.length; i++) {
                    this.marker = this.createMarker(data[i]);
                }
                this.createCluster();
            });
        }
    }
    componentDidMount(){
        this.initMap();
        if(this.props.boundsInput.mapBoundsInput){
            this.createSchoolMarkers(this.props);
        }
    }
    componentWillReceiveProps(nextProps){
        // debugger;
        // if(nextProps.userInput.value.mapBounds === undefined){
        //     let userInputMapBounds = nextProps.userInput.value;  // TODO fix this
        //     userInputMapBounds.mapBounds = this.props.userInput.value.mapBounds;
        //     this.props.mapBoundsInput(userInputMapBounds);
        // }
        if(this.props.userInput.value === null) {
            if(nextProps.center.lat !== this.props.center.lat) {
                this.initMap();
            }
        } else if(nextProps.center.lat !== this.props.center.lat ||
            this.props.userInput.value.distanceSlider !== nextProps.userInput.value.distanceSlider){
            this.initMap();
            this.createSchoolMarkers(nextProps);
        }
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
            if (distance <= 100) {
                zoomLevel = 15;
            } else if (distance <= 200) {
                zoomLevel = 10;
            } else if (distance <= 300) {
                zoomLevel = 4;
            }
        } else {
            zoomLevel = 10;
        }
        this.setState({
            zoom : zoomLevel
        });
    }
    createLegendElement() {
        let outsideDiv = document.createElement('div');
        outsideDiv.id = 'legend';
        let smallHeader = document.createElement('h6');
        smallHeader.innerText = '# Students';
        outsideDiv.appendChild(smallHeader);
        return outsideDiv;
    }
    createLegend() {
        var icons = {
            sm_school: {
                name: '   < 10,000',
                icon: '/images/md_school.png'
            },
            md_school: {
                name: '   < 25,000',
                icon: '/images/sm_school.png'
            },
            lg_school: {
                name: ' > 25,000',
                icon: '/images/lg_school.png'
            }
        };
        const forLegend = document.getElementsByClassName('GMap');
        const legendDiv = this.createLegendElement();
        forLegend[0].appendChild(legendDiv);
        const legend = document.getElementById('legend');
        for (var key in icons) {
            var type = icons[key];
            var name = type.name;
            var icon = type.icon;
            var div = document.createElement('div');
            div.innerHTML = '<img src="' + icon + '">' + name;
            legend.appendChild(div);
        }
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
    }
    createMap(data) {
        this.setZoom();
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.createLatLng(data),
            componentRestrictions: {country: "us"},
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }
    createLatLng(pos){
        return new google.maps.LatLng(
            pos.lat,
            pos.lng
        )
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
    createCluster() {
        if(this.map) {
            this.state.markerCluster = new MarkerClusterer(this.map, this.state.markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }

    }
    createMarker(data) { //would add in (pos) as a parameter
        const iconForSchool = this.colorForMarker(parseInt(data.size));
        const newMarker = new google.maps.Marker({
            map: this.map,
            position: this.createLatLng(data),
            icon: iconForSchool
        });
        const { markers } = this.state;
        markers.push(newMarker);
        this.setState({
            markers : [ ...markers ]
        });
        let content = '<div><h6><a href=http://localhost:3000/school/' + data.uid + '>' + data.name + '</a></h6></div>'
            + '<div>' + data.city + ', ' + data.state + '</div>'
            + '<div><a target="_blank" href=http://' + data.url + '>' + data.url + '</a></div>';
        let infoWindow =  new google.maps.InfoWindow({
            map: this.map,
            anchor: newMarker,
            content: content
        });
        newMarker.addListener('click', function() {
            infoWindow.open(this.map, newMarker);
        });
        this.map.addListener('click', function () {
            infoWindow.close();
        });
        this.map.addListener('idle', function() {
            infoWindow.close();
        });
        infoWindow.close();
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
            console.log('map boundsInput', this.props.boundsInput)
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
