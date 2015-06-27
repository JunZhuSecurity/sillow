var photosLi = document.getElementById("photos-tab-li");
var mapLi = document.getElementById("map-tab-li");
var svLi = mapLi.cloneNode(true);
svLi.id = "googlestreet-tab-li";
svLi.children[0].children[0].text = "Street View";
var container = mapLi.parentNode;
container.insertBefore(svLi, photosLi);

var photosDiv = document.getElementById('photos');
var svDiv = document.createElement('div');
svDiv.id="googlestreet";
svChildDiv = document.createElement('div');
svChildDiv.id="hdp-street-view";
svDiv.appendChild(svChildDiv);
svDiv.className='yui3-tab-panel';
var tabContentDiv = document.querySelector("#map-tabs .yui3-tabview-panel");
tabContentDiv.insertBefore(svDiv, photosDiv);

var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
document.body.appendChild(s);
