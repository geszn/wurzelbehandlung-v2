function load_wurzelbehandlung( t_el ) {
	//(e || window.event).preventDefault();
	//console.log( t_el );
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function (e) { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			var the_content = xhr.responseText;
			//console.log( the_content );
			if( NodeList.prototype.isPrototypeOf( t_el ) ) {
				//target_element ist eine NodeList mit mehreren Stages
				for( i=0; i<t_el.length; i++ ) {
					t_el[i].innerHTML = the_content;
					//console.log( t_el[i] );
				}
			}
			else {
				t_el.innerHtml = the_content;
			}

			wurzelbehandlung_init_events();
		}
	}
	xhr.open("GET", "https://dev.strawanzer.online/wurzelbehandlung/version-2/wurzelbehandlung-content.html", true);
	xhr.setRequestHeader('Content-type', 'text/html');
	xhr.send();
}

document.addEventListener( 'DOMContentLoaded', (e) => {
	console.log( 'ready for take off');
	load_wurzelbehandlung( document.querySelectorAll('.stage-wurzelbehandlung') );
} );