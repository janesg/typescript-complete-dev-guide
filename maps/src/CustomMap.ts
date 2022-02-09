export interface Mappable {
    location: google.maps.LatLngLiteral;
    colour?: string;
    content(): string;
}

export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(mapDivId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(mapDivId), {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }

    addMarker(mappable: Mappable): void {
        let url = 'http://maps.google.com/mapfiles/ms/icons/';
        url += (mappable.colour ? mappable.colour : 'red') + '-dot.png';    

        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: mappable.location,
            icon: url
        });

        marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.content()
            });

            infoWindow.open(this.googleMap, marker);
        });
    }
}