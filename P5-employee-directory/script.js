/*=========================*/
/*  Meng Wang              */
/*  Treehouse Techdegree   */
/*  Project 5              */
/*  Employee Directory     */
/*=========================*/


// ==============================
// Global variables and constants
// ==============================

let array = []; // store fetched data later
let number;     // use this number to locate specific user info   
let targetUser; // mark specific user  
const searchComponent = 
					  '<form action="#" method="get">' +
						  '<input type="search" id="search-input" class="search-input" placeholder="Search...">' +
					  '</form>';


// ==========================================
// Actions & event listeners after page loads
// ==========================================

$(document).ready(function() {

	$('.search-container').append(searchComponent);

	// fetch info from random user website API then render on the page
	fetchData('https://randomuser.me/api/?nat=gb,us&results=12').then(data => {
		array = data.results;
		array.map(item =>{
			const fetchedData = item;
			renderUser(fetchedData);
		});

	});

	// search and filter feature
	$(document).on('keyup', '#search-input', function() {

		$('.card').hide();
		let filterValue = $('#search-input').val().toLowerCase();

		if(filterValue.length == 0) {
			$('.card').show();
		}
		else {
			filterSearch(filterValue);
		}

	});

	// click specific user, will pop up a new window to give more info
	$(document).on('click', '.card', function() {
		
		number = $('.card').index(this);
		targetUser = array[number];  
		fetchSpecificInfo(targetUser);
		
	});

	// click pointer arrow to render previous/next user's info
	$(document).on('click', '.previous', function() {

		if (number == 0) {
			number = 11;
		}
		else {
			number -= 1;	
		}

		targetUser = array[number];
		fetchSpecificInfo(targetUser);

	});	

	$(document).on('click', '.next', function() {

		if (number == 11) {
			number = 0;
		}
		else {
			number += 1;	
		}

		targetUser = array[number];
		fetchSpecificInfo(targetUser);
		
	});		

 	// close the pop up modal window
	$(document).click(function (e) {
	    if ($(e.target).hasClass('modal-container')) {
	        $('.modal-container').remove();
	    }
	});

	$(document).on('click', '#modal-close-btn', function() {
		$('.modal-container').remove();
	});

});


// ====================================
// Fetch Funtions
// ====================================

// fetch data utilizing API
function fetchData(url) {
  return fetch(url)
           .then(checkStatus)  
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}


function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}


// based on fetched data, render user info onto the page
function renderUser(data) {

	const user = 
			  '<div class="card">' +
	         	    '<div class="card-img-container">' +
				        '<img class="card-img" src=' + data.picture.large + ' alt="profile picture">' +
				    '</div>' +
				    '<div class="card-info-container">' +
				        '<h3 id="name" class="card-name cap">' + data.name.first +' ' +  data.name.last + '</h3>' +
				        '<p class="card-text">' +  data.email + '</p>' +
				        '<p class="card-text cap">' + data.location.city + ', ' + data.location.state + '</p>' +
				    '</div>' +
			  '</div>';
	
	$('#gallery').append(user);
}


// use search button to filter&find target user
function filterSearch(value) {

	let i;
	for( i=0; i<=11; i++) {
		let info = $('h3').get(i).textContent.toLowerCase();
		if( info.indexOf(value) != -1 ) {
			$('.card').get(i).style.display = "flex";
		}
	}
	
}


// render specifics user info on the pop up modal window 
function fetchSpecificInfo(data) {

	$('.modal-container').remove();

	const modalComponent  =
	     			      '<div class="modal-container">' +
	     			           '<div class="modal">' +
	     			               '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>' +
	     			               '<div class="modal-info-container">' +
	     			                   '<img class="modal-img" src=' + data.picture.large + ' alt="profile picture">' +
	     			                   '<a href="#" class="previous">&#8249;</a>' +
	     			                   '<a href="#" class="next">&#8250;</a>' +
	     			                   '<h3 id="name" class="modal-name cap">' + data.name.first +' ' + data.name.last +'</h3>' +
	     			                   '<p class="modal-text">' + data.email + '</p>' +
	     			                   '<p class="modal-text cap">' + data.location.city + '</p>' +
	     			                   '<hr>' +
	     			                   '<p class="modal-text">' + data.phone + '</p>' +
	     			                   '<p class="modal-text">' + data.location.street + ', ' + data.location.city + ', ' + data.nat + ' ' + data.location.postcode + '</p>' +
	     			                   '<p class="modal-text">Birthday: ' + data.dob.date.substring(0, 10) + '</p>' +
	     			               '</div>' +
	     			           '</div>';

	$('body').append(modalComponent);	     			     
}



