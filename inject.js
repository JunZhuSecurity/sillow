var gmaps_key="AIzaSyBmHQ3_5lgZ21VtQKwwe5VMa1rjQFmvSTI";
YUI.add('z-google-maps-api', function (Y) {

    var SCRIPT_ID = 'google-maps-api',
        EVT_READY = 'googlemapsapi:ready',
        GOOGLE_MAPS_API_URL = 'http://maps.googleapis.com/maps/api/js?sensor=false&key=' + gmaps_key + '&callback=googleMapsApiCallback';

    Y.publish(EVT_READY, {
        broadcast: 1,
        fireOnce: true,
        emitFacade: true
    });

    function googleMapsFireReady() {
        Y.log('firing ' + EVT_READY, 'debug', 'GoogleMapsApi');
        Y.fire(EVT_READY);
    }

    Y.config.win.googleMapsApiCallback = googleMapsFireReady;

    function loadSDK() {
        if (!Y.one('#' + SCRIPT_ID)) {
            // We're not using the onSuccess to fire the ready event,
            // but instead using window.fbAsyncInit, established previously
            Y.Z.Get.script(GOOGLE_MAPS_API_URL, {
                async: true, // 3.4.1 future-compat
                attributes: {
                    id: SCRIPT_ID, // currently broken, fix targeted for 3.5.0
                    async: true // 3.3.0 necessity
                }
            });
        } else {
            googleMapsFireReady();
        }
    }

    Y.on('domready', loadSDK);

}, '3.3.0', { requires: ['event-custom-complex', 'z-get', 'node-base'] });

// not sure why html5-attr-placeholder is necessary, otherwise the d.on('load') callback
// is not called
YUI().use("html5-attr-placeholder", function(d, c) {
    d.on("load", function(f) {
        d.use("zillow-async-loader", "z-tab-content-mgr", "z-hdp-google-street-view", function() {
            var i = new d.Z.AsyncLoader();
            // create a TabContentManager for the map/bird's eye/street view tabs
            // so that the custom tabContentMgr events can be handled in this YUI sandbox
            new d.Z.TabContentMgr({
                boundingBox: "#map-tabs"
            });
            // load the street view tab when the tabContentMgr:googlestreet event is fired.
            // if it loads before the tab is selected while the div is hidden, street view will
            // not render properly (it will appear as all grey until the window is resized)
            i.load({
                boundingBox: "#hdp-street-view",
                disableKeyboardInput: true,
                latitude: parseFloat(document.querySelector("[itemprop=latitude]").content),
                radius:50,
                pitch:0,
                jsModule: "z-hdp-google-street-view",
                phaseType: "custom",
                customEvent: "tabContentMgr:googlestreet",
                mapMarkerDimension: 25,
                longitude: parseFloat(document.querySelector("[itemprop=longitude]").content)
            });
        });
    });
});
