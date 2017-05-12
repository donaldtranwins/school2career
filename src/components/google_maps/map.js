import React, { Component } from 'react';
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
    componentDidMount(){
        this.initMap();
        if(this.props.boundsInput.mapBoundsInput){
            this.createSchoolMarkers(this.props);
        }
    }
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

        //
        // if(this.props.userInput.value === null) {
        //         this.initMap();
        // } else if(nextProps.center.lat !== this.props.center.lat){
        //         this.initMap();
        //     // this.createSchoolMarkers(nextProps);
        // }
        // if (nextProps.schools.all !== undefined) {
        //     if ( nextProps.schools.all.length > this.props.schools.all.length) {
        //         this.createSchoolMarkers(nextProps)
        //     }
            // else if (nextProps.schools.all.length>0) {
            //     this.createSchoolMarkers(nextProps);
            // }
        // }
    }
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
    clearOutMarkers() {
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
        }
        if (this.state.markerCluster !== null) {
            this.state.markerCluster.clearMarkers();
        }
    }
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
    createMap(data) {
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
        let clusterOptions = {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            maxZoom: 15,
            minimumClusterSize: 3
        };
        if(this.map) {
            this.state.markerCluster = new MarkerClusterer(this.map, this.state.markers, clusterOptions);
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
    getMapBounds() {
        // this.clearOutMarkers();
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
