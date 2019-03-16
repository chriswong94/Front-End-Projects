// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Meng Wang



// ==============================
// Global variables and constants
// ==============================

const $jobDescription = $('#jobDescription');
const $designSelect   = $('#design');
const $colorDiv       = $('#colors-js-puns');
const $colorSelect    = $('#color');
const $punsShirt      = $('<option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option>');
const $heartShirt     = $('<option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option>');
const $inputArray     = $('.activities > label > input');
const $activities     = $('.activities');
let   $costLabel      = $('<label>Total:</label>');



// ==========================================
// Actions & event listeners after page loads
// ==========================================

$(document).ready(function() {

	//  First text field
	// 	 set focus on the first text field
	$('#name').focus();
	checkNameEmpty("#name");
	checkValidEmail("#mail");


	// ”Job Role” section
	//   include a text field when 'other' option is selected from job role drop down menu
	$jobDescription.hide();

	$('#title').on('change', function() {

		if(this.value === 'other') {
			$($jobDescription).show();
		}
		else {
			$jobDescription.hide();
		}
	});


	// ”T-Shirt Info” section
	//	 when a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
	$colorDiv.hide();

	$designSelect.on('change', function() {

		$colorDiv.show();
		$colorSelect.empty();

		if(this.value === 'js puns') {
			$colorSelect.append($punsShirt);
		}
		else if(this.value === 'heart js') {
			$colorSelect.append($heartShirt);
		}
		else {
			$colorDiv.hide();
		}
	});

	checkShirtSelection('#design'); // error appears if you didn't select one when you submit


	// ”Register for Activities” section
	//	 display a running total below the list of checkboxes. 
	$activities.append($costLabel);
	$costLabel.hide();

	$('input:checkbox').on('change', function() {
	 	
		let $checkedItem  = $('input:checked');
		let itemTotal = $checkedItem.length;
		let totalCost     = 0;    

		// calculate total cost
		for(i=0; i <= itemTotal-1; i++) {
			let indexNumber = $inputArray.index($checkedItem[i]);
			let checkNumber = indexNumber + 2;

			if(indexNumber === 0) {
				totalCost += 200;
			}
			else {
				totalCost += 100;
			}
		}

		$costLabel.text('Total: $' + totalCost);
		$costLabel.show(); 

		if(totalCost === 0) {
			$costLabel.hide(); 	
		} 	

		// don't allow selection of a workshop at the same day and time
		let index  = $inputArray.index(this);

		if(this.checked) {
			switch(index) {
				case 1:
					disable(5);
					break;
				case 2:
					disable(6);
					break;
				case 3:
					disable(3);
					break;
				case 4:
					disable(4);
					break;
			}
		}
		else {
			switch(index) {
				case 1:
					enable(5);
					break;
				case 2:
					enable(6);
					break;
				case 3:
					enable(3);
					break;
				case 4:
					enable(4);
					break;
		    }
		}

	});

	checkActivities();  // error appears if you dint check at least one activity when you submit form  


	// "Payment Info" section
	// 	The "Credit Card" payment option is selected by default, other payment sections are hidden.
	//	Disable the 'select payment method'. Chooses one option, the chosen payment section is revealed and others will be hidden.
	$('option[value="credit card"]').prop('selected', 'selected');
	$('#credit-card').nextAll(':lt(2)').hide();
	$('#payment > option:nth-child(1)').attr("disabled","disabled");

	$('#payment').on('change', function() {

		if($('option[value="credit card"]').prop('selected')) {
			$('#credit-card').show();
			$('#credit-card').nextAll(':lt(2)').hide();
		}
		else if($('option[value="paypal"]').prop('selected')) {
			$('#credit-card').hide();
			$('#credit-card').nextAll(':lt(2)').hide();
			$('#credit-card').next().show();
		}
		else {
			$('#credit-card').hide();
			$('#credit-card').next().hide();
			$('#credit-card').nextAll().slice(1, 2).show();
		}
	});

	checkCreditCard(); // error appears if you didn't type valid credit card info
	

	// event listener for the submit button
	$('button').on('click', function( event ) {
		
		let string = 'true';	

		if($("#name").val() == '') {

			if($("#name").prev().find('span').length == 0) {
			
				$("#name").prev().append('<span> (please provide your name)</span>');
				$("#name").prev().css('color', 'red');	
			}
			string = 'false';	
		}
			
		if($("#mail").val() == '') {

			if($("#mail").prev().find('span').length == 0) {
			
				$("#mail").prev().append('<span> (please provide a valid email address)</span>');
				$("#mail").prev().css('color', 'red');	
			}	
			string = 'false';
		}
			
		if($("#mail").val() != '') {

			var email = $("#mail").val();

			if (!validateEmail(email)) {
				string = 'false';	
			} 
		}

		if($("#design").val() == 'Select Theme') {

			if($('.shirt').find('p').length == 0) {

				$('.shirt > legend').append("<p> Don't forget to pick a T-shirt </p>");
				$('.shirt > legend > p').css({'color': 'red', 'margin': '0 auto'});
			}
			string = 'false';	
		}

		if($('input:checked').length == 0) {

			if($('.activities').find("p").length == 0) {
				
				$('.activities > legend').append("<p>Please select an Activity </p>");
				$('.activities > legend > p').css({'color': 'red', 'margin': '0 auto'});	
			}
			string = 'false';	
		}

		if($('option[value="credit card"]').prop('selected')) {

			let ccLength = $('#cc-num').val().length;

			if( ccLength < 13 || ccLength > 16 ) {
				$('#cc-num').prev().css('color', 'red');
				string = 'false';
			}

			if($('#zip').val().length !== 5) {
				$('#zip').prev().css('color', 'red');
				string = 'false';
			}

			if($('#cvv').val().length !== 3) {
				$('#cvv').prev().css('color', 'red');
				string = 'false';
			}
		}

		if(string === 'false') {
			event.preventDefault();
		}
		
		});
});



// ====================================
// Helper functions for form Validation
// ====================================


//	 code adapted from - https://www.wdb24.com/jquery-form-validation-example-without-plugin/
function checkNameEmpty(nameID) {

	$(nameID).blur(function() {
 
	 	let errorMassage = '<span> (please provide your name)</span>';
	 	
		if($(this).val() == '') {
			if($('#name').prev().find('span').length == 0) {
				$(this).prev().append(errorMassage);	
			    $(this).prev().css('color', 'red');	
			}
		}
		else {
			$(this).prev().css('color', '#184f68');
			$(this).prev().find("span").remove();
		}

	});

}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function checkValidEmail(emailID) {
	
	let errorMassage = '<span> (please provide a valid email address)</span>';

	$(emailID).blur(function(){

		var email = $(emailID).val();

		if (validateEmail(email)) {

			$(this).prev().find("span").remove();
			$(this).prev().css('color', '#184f68');
		} 
		else if($(this).prev().find('span').length == 0) {

			$(this).prev().append(errorMassage);
			$(this).prev().css('color', 'red');	
		}
	});

}

function checkShirtSelection(shirtID) {

	$(shirtID).change(function() {
 
 	let errorMassage = "<p> Don't forget to pick a T-shirt </p>";
 	
		if($(this).val() == 'Select Theme') {

			if($('.shirt').find('p').length == 0) {

				$('.shirt > legend').append(errorMassage);
				$('.shirt > legend > p').css({'color': 'red', 'margin': '0 auto'});
			}	
		}

		else {

			$('.shirt').find("p").remove();
		}
	});
}

function checkActivities() {

	$('input:checkbox').on('change', function() {
 
 	let errorMassage = "<p>Please select an Activity </p>";
 	
		if($('input:checked').length == 0) {

			$('.activities > legend').append(errorMassage);
			$('.activities > legend > p').css({'color': 'red', 'margin': '0 auto'});	
		}
		
		else {

			$('.activities').find("p").remove();
		}
	});
}

function disable(number) {
	$('.activities > label:nth-child('+ number + ') > input').not(this).attr('disabled', 'disabled'); 
	$('.activities > label:nth-child('+ number + ') > input').not(this).parent().css('color', 'grey');
}

function enable(number) {
	$('.activities > label:nth-child('+ number + ') > input').not(this).removeAttr("disabled"); 
	$('.activities > label:nth-child('+ number + ') > input').not(this).parent().css('color', '#000');
}

function checkCreditCard() {

	let determineStatus = $('option[value="credit card"]').prop('selected');
	console.log('1');
	if(determineStatus) {
		console.log('2');
		$('#cc-num').keyup(function() {
		
			$(this).prev().css('color', '#184f68');
			$(this).prev().find('span').remove();
			console.log('3');
			if( $(this).val().length == 0 ) {
				$(this).prev().append('<span> Please enter a number</span>');
				$(this).prev().css('color', 'red');
			}
			else if( $(this).val().length < 13 ) {
				$(this).prev().append('<span> Number is too short</span>');
				$(this).prev().css('color', 'red');
			}
			else if( $(this).val().length > 16 ) {
				$(this).prev().append('<span> Number is too long</span>');
				$(this).prev().css('color', 'red');
			}
		});

		$('#zip').keyup(function() {

			$(this).prev().css('color', '#184f68');
			$(this).prev().find('span').remove();

			if( $(this).val().length !== 5 ) {
				$(this).prev().append('<span> Invalid</span>');
				$(this).prev().css('color', 'red');
			}
		});

		$('#cvv').keyup(function() {

			$(this).prev().css('color', '#184f68');
			$(this).prev().find('span').remove();

			if( $(this).val().length !== 3 ) {
				$(this).prev().append('<span> Invalid</span>');
				$(this).prev().css('color', 'red');
			}
		});

	}
}
