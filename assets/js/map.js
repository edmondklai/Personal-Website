	var view = new ol.View({
         // the view's initial state
         center: ol.proj.transform([-87.6298,41.8781], 'EPSG:4326', 'EPSG:3857'),  //Center the map at Chicago at load
         zoom: 10
       }); 
      var map = new ol.Map({     //Create the base map layer!
        target: 'map1',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine()
        ]),
        view: view
		/*new ol.View({
          center: ol.proj.transform([-87.6298,41.8781], 'EPSG:4326', 'EPSG:3857'),  //Center the map at Chicago at load
          zoom: 10
        })*/
      });
     
	  var rotateLeft = document.getElementById('rotate-left');
	        rotateLeft.addEventListener('click', function() {
	          var rotateLeft = ol.animation.rotate({
	            duration: 2000,
	            rotation: -4 * Math.PI
	          });
	          map.beforeRender(rotateLeft);
	        }, false);
	  var rotateRight = document.getElementById('rotate-right');
	        rotateRight.addEventListener('click', function() {
	          var rotateRight = ol.animation.rotate({
	            duration: 2000,
	            rotation: 4 * Math.PI
	          });
	          map.beforeRender(rotateRight);
	        }, false);
			
			
			   
     var chicago = ol.proj.fromLonLat([-87.6298,41.8781]);
	  
     
	 var cenSource2012 = new ol.source.TileWMS({
	         preload: Infinity,
	         url: 'http://141.142.170.193:8080/geoserver/wms',
	         serverType:'geoserver',
	         params:{
	            'LAYERS':"elai4:Data_2012", 'TILED':true
	          }         
	        })
	 var cenSource2013 = new ol.source.TileWMS({
	   	         preload: Infinity,
	   	         url: 'http://141.142.170.193:8080/geoserver/wms',
	   	         serverType:'geoserver',
	   	         params:{
	   	            'LAYERS':"elai4:Data_2013", 'TILED':true
	   	          }

	   	        })
     


     var sourceSQ = new ol.source.TileWMS({
          	preload: Infinity,
          	url: 'http://141.142.170.193:8080/geoserver/wms',
          	serverType:'geoserver',
          	params:{
            	'LAYERS':"elai4:spatialQ", 'TILED':true, viewparams: 'genMin:10'
            	//viewparams: 'year:'+ year
            	//viewparams: 'genMin:' + genMin,
            	//viewparams: 'genMax:' + genMax
          	}  
        })   
     

     var wmslayer2012 = new ol.layer.Tile({
		 source: cenSource2012
	 });
	 	
      var wmslayer2013 = new ol.layer.Tile({
		  source: cenSource2013
      })
      
	  var wmslayerSpatialQ = new ol.layer.Tile({
          source: sourceSQ
      })

      var el = document.getElementById("submit")
   	  el.addEventListener("click",requestSpatial,false)	

   	  function requestSpatial(){
    	var submit = document.getElementById("submit")
     	if (genYear.value == "2012") {
     			year = 2012    			
     			if (genLevel.value == "high") {
     				genMin = 4
     				genMax = 20
     			}
     			else if (genLevel.value == "medium") {
     				genMin = 2
     				genMax = 3
     			}
     			else {
     				genMin = -1
     				genMax = 1
     			}
     		}
     		if (genYear.value == "2013") {
     			year = 2013
     			
     			if (genLevel.value == "high") {
     				genMin = 4
     				genMax = 20
     			}
     			else if (genLevel.value == "medium") {
     				genMin = 2
     				genMax = 3
     			}
     			else {
     				genMin = -1
     				genMax = 1
     			}
     		}
      map.removeLayer(wmslayer2013);
      map.removeLayer(wmslayer2012);
      map.removeLayer(wmslayerSpatialQ);
      map.addLayer(wmslayerSpatialQ);
      };
	 
     //map.addLayer(wmslayer2012);
     wmslayer2012.setOpacity(.7);
     wmslayer2013.setOpacity(.7);
     wmslayerSpatialQ.setOpacity(.7);
     
  	 var panToChicago = document.getElementById('pan-to-chicago');  //pan to Chicago
      panToChicago.addEventListener('click', function() {
        var pan = ol.animation.pan({
          duration: 2000,
		  source: /** @type {ol.Coordinate} */ (view.getCenter())
        });
        map.beforeRender(pan);
        view.setCenter(chicago);
        
      }, false)

  
	document.getElementById('show-2013').addEventListener('click', function() {
	  	map.removeLayer(wmslayer2013);
      	map.removeLayer(wmslayer2012);
      	map.removeLayer(wmslayerSpatialQ);
		map.addLayer(wmslayer2013);
	  });

    document.getElementById('show-2012').addEventListener('click', function() {
      map.removeLayer(wmslayer2013);
      map.removeLayer(wmslayer2012);
      map.removeLayer(wmslayerSpatialQ);
      map.addLayer(wmslayer2012);
    });
	  	
	
	  
	  
	  
	  
        
     var mousePositionControl = new ol.control.MousePosition({
         className:'ol-full-screen', 
         coordinateFormat:ol.coordinate.createStringXY(4), 
         projection:"EPSG:4326", 
         className:"custom-mouse-position",
         target:'mouseval', 
         undefinedHTML: '&nbsp;' 
     });
     map.addControl(mousePositionControl);
       