import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForSchools, mapBoundsInput } from '../../actions/actions_index';

class GMap extends Component {
    // state was created to keep track of zoom, hold markers for google maps and set up initial marker clusters.
    constructor(props){
        super(props);
        this.state = {
            zoom: 10,
            markers: [],
            markerCluster : null
        };
    }
    //returns back the actual map.
    render() {
        return (
            <div className="GMap">
                <div className='GMap-canvas' ref="mapCanvas"></div>
            </div>
        )
    }
    //when the page loads this initializes the map and if bounds exist it calls to place the markers on the page
    componentDidMount(){
        this.initMap();
        if(this.props.boundsInput.mapBoundsInput){
            this.createSchoolMarkers(this.props);
        }
    }
    //when props change, the map gets reinitialized and then markers get dropped. This specifically helps
    //with the drag and drop and magnification change
    componentWillReceiveProps(nextProps){
        if(this.props.userInput.value === null) {
            if(nextProps.center.lat !== this.props.center.lat) {
                this.initMap();
            }
        } else if(nextProps.center.lat !== this.props.center.lat){
            this.initMap();
            // this.createSchoolMarkers(nextProps);
        }
        this.createSchoolMarkers(nextProps);
    }
    //this initializes the map, places a loading statement until input has been received. Also
    //puts a listener on the map for when it goes idle for drag/drop and zoom change
    initMap(){
        const userInput = this.props.userInput.value;
        if(!userInput){
            return <p>Loading...</p>;
        } else {
            this.map = this.createMap(userInput.latLng);
            this.map.addListener('zoom_changed', () => this.handleZoomChange(), ()=>this.clearOutMarkers());
            this.map.addListener('idle', () => this.getMapBounds());
        }
        this.createLegend();
    }
    //clear out markers within the state. This is so markers are removed and not just continually piled on.
    clearOutMarkers() {
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
        }
        if (this.state.markerCluster !== null) {
            this.state.markerCluster.clearMarkers();
        }
    }
    //creates the markers from state this both calls clearing out markers, create actual markers
    //create clusters for groups of markers
    createSchoolMarkers(nextProps){
        const data = nextProps.schools.all;
        this.clearOutMarkers();
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
    //this set of functions creates the legend that gets set on top of the google map.
    createLegendElement() {
        let outsideDiv = document.createElement('div');
        outsideDiv.id = 'legend';
        let smallHeader = document.createElement('h6');
        smallHeader.innerText = '# Students';
        outsideDiv.appendChild(smallHeader);
        return outsideDiv;
    }
    createLegend() {
        const icons = {
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
        for (let key in icons) {
            const type = icons[key];
            const name = type.name;
            const icon = type.icon;
            const div = document.createElement('div');
            div.innerHTML = '<img src="' + icon + '">' + name;
            legend.appendChild(div);
        }
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
    }
    //creates the map with set options.
    createMap(data) {
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.createLatLng(data),
            componentRestrictions: {country: "us"},
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }
    //this takes the data and creates lat and lng as required by google maps.
    createLatLng(pos){
        return new google.maps.LatLng(
            pos.lat,
            pos.lng
        )
    }
    //sends out an icon based on size of school. each is a different color and size.
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
    //creates clusters from the markers with a minimum of 3 markers to form a group.
    createCluster() {
        let clusterOptions = {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            maxZoom: 15,
            minimumClusterSize: 3
        };
        if(this.map) {
            this.state.markerCluster = new MarkerClusterer(this.map, this.state.markers, clusterOptions);
        }
    }
    //creates actual marker and add in various listeners.
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
        const content = '<div><h6><a href=#sch' + data.uid + '>' + data.name + '</a></h6></div>'
            + '<div>' + data.city + ', ' + data.state + '</div>'
            + '<div><a target="_blank" href=http://' + data.url + '>' + data.url + '</a></div>';
        const infoWindow =  new google.maps.InfoWindow({
            map: this.map,
            anchor: newMarker,
            content: content,
            disableAutoPan: true,
        });
        newMarker.addListener('click', function() {
            if (infoWindow.getMap()) {
                infoWindow.close();
            }
            if (!newMarker.open) {
                infoWindow.open(this.map, newMarker);
                newMarker.open = true;
            } else {
                infoWindow.close();
                newMarker.open = false;
            }
        });
        this.map.addListener('click', function () {
            infoWindow.close();
            newMarker.open = false;
        });
        this.map.addListener('idle', function() {
            infoWindow.close();
            newMarker.open = false;
        });
        infoWindow.close();
    }
    //gets bounds for map based on ne and sw coordinates.
    getMapBounds() {
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
    //handles zoom change and sets state to current zoom
    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }
}

//passes in these states so that each of these can be used within the component
function mapStateToProps(state){
    return{
        schools: state.schools,
        center: state.center.center,
        userInput: state.userInput,
        boundsInput: state.mapBoundsInput
    }
}
//allows state to be connected as well as to other action creators.
export default connect(mapStateToProps, { searchForSchools, mapBoundsInput })(GMap);
