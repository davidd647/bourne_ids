//Mini Address Book
//By: David Dales

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

//To do list
// - Use ES6!
// - Use bootstrap!

// - Add google maps API to it?
	// - When one user is selected, show their address in a map under the output

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////


var people = [];
var sortBy = 0;

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validateNumbers(str) {
	var isNumbers = true;
	if (str.match(/[a-z]/i)) {
	    // alphabet letters found
	    isNumbers = false;
	}
	return isNumbers;
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function updateMultiSection(){
	$('#people_output').empty();
	sortBy = $('#sorting_categories').find(':selected').data('id');
	for (i in people){
		switch(sortBy){
			case 0:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].last+', '+people[i].first+'</option>');
				break;
			case 1:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].first+' '+people[i].last+'</option>');
				break;
			case 2:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].last+', ' +people[i].first+'</option>');
				break;
			case 3:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].phone1+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 4:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].phone2+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 5:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].address+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 6:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].city+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 7:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].postalCode+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 8:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].email+' '+people[i].last+', '+people[i].first+'</option>');
				break;
			case 9:
				$('#people_output')
					.append('<option value="'+i+'">'
						+people[i].website+' '+people[i].last+', '+people[i].first+'</option>');
				break;
		}
	}
}
function clearInputFields(){
	$('#first_name').val('');
	$('#last_name').val('');
	$('#phone1').val('');
	$('#phone2').val('');
	$('#address').val('');
	$('#city').val('');
	$('#postal_code').val('');
	$('#email').val('');
	$('#website').val('');
}
function resetAllBorders(){
	$('#first_name').css('border','2px solid lavender');
	$('#last_name').css('border','2px solid lavender');
	$('#phone1').css('border','2px solid lavender');
	$('#address').css('border','2px solid lavender');
	$('#city').css('border','2px solid lavender');
	$('#postal_code').css('border','2px solid lavender');
	$('#email').css('border','2px solid lavender');
}

$('form').submit(function(e){
	e.preventDefault();

	//Take values from DOM
	var firstName = $('#first_name').val();
	var lastName = $('#last_name').val();
	var phone1 = $('#phone1').val();
	var phone2 = $('#phone2').val();
	var address = $('#address').val();
	var city = $('#city').val();
	var postalCode = $('#postal_code').val();
	var email = $('#email').val();
	var website = $('#website').val();

	//Assign values to our 'people' array
	if (
		firstName!="" &&
		lastName!="" &&
		phone1!="" && //remember - phone2 is optional!
		address!="" &&
		city!="" &&
		postalCode!="" &&
		email!="" &&//and the personal website is, too!
		validateEmail(email) && //validate email
		validateNumbers(phone1)
		){

		people.push({
			first: 		firstName,
			last: 		lastName,
			phone1: 	phone1,
			phone2: 	phone2,
			address: 	address,
			city: 		city,
			postalCode: postalCode,
			email: 		email,
			website:  	website
		});

		//Update the multiselect section
		updateMultiSection();

		//Clear the fields for new input
		clearInputFields();

		//Reset borders b/c this has been a successful submit
		resetAllBorders();

		$('#please_review').css('display','none');
	} else {
		
		if (!validateEmail(email)){
			$('#please_review').text('*Please enter a valid email address');
		} else if (!validateNumbers(phone1)){
			$('#please_review').text('*Please enter a valid phone number');
		} else {
			$('#please_review').text('*Please fill the boxes with red borders.');
		}

		//Highlight items that need to be filled out
		if (firstName === ""){
			$('#first_name').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#first_name').css('border','2px solid lavender');}
		if (lastName === ""){
			$('#last_name').css('border','2px solid red');
			$('#please_review').css('display','block');
		}  else {$('#last_name').css('border','2px solid lavender');}
		if (phone1 === "" || !validateNumbers(phone1)){
			$('#phone1').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#phone1').css('border','2px solid lavender');}
		if (address === ""){
			$('#address').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#address').css('border','2px solid lavender');}
		if (city === ""){
			$('#city').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#city').css('border','2px solid lavender');}
		if (postalCode === ""){
			$('#postal_code').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#postal_code').css('border','2px solid lavender');}
		if (email === "" || !validateEmail(email)){
			$('#email').css('border','2px solid red');
			$('#please_review').css('display','block');
		} else {$('#email').css('border','2px solid lavender');}

	}

});

$('#delete_selected').on('click',function(e){
	e.preventDefault();
	var toDelete = [];

	//Get which items were selected...
	for (i in people){
		//Add them to an array
		var isSelected = $('#people_output')[0][i].selected;
		if (isSelected){
			toDelete.push(i);
		}
	}
	
	//Delete the items (need to loop in reverse to avoid
	//getting the same array element twice)
	for (i=toDelete.length; i--; i>0){
		people.splice(toDelete[i],1);
	}

	//Refresh the multiselect display
	updateMultiSection();
});

$('#display_selected').on('click',function(e){
	e.preventDefault();
	var toDisplay = [];
	//Clear the display section
	$('#display_individual').empty();

	//Get which items were selected...
	for (i in people){
		//Add them to an array
		var isSelected = $('#people_output')[0][i].selected;
		if (isSelected){
			toDisplay.push(i);
		}
	}
	console.log('length of thingy is: '+toDisplay.length);
	//Do a loop to display all of the selected items
	for (i=0;  i<toDisplay.length; i++){
		console.log("This loop runs");
		var currentPerson = people[toDisplay[i]];
		$('#display_individual').append(
			'<h2>'+currentPerson.first+' '+currentPerson.last+'</h2>'+
			'<p>Primary phone: '+currentPerson.phone1+'</p>'+
			'<p>Secondary phone: '+currentPerson.phone1+'</p>'+
			'<p>Address: '+currentPerson.address+'</p>'+
			'<p>City: '+currentPerson.city+'</p>'+
			'<p>Postal code: '+currentPerson.postalCode+'</p>'+
			'<p>Email: '+currentPerson.email+'</p>'+
			'<p>Website: '+currentPerson.website+'</p>'
		);

		// people.push({
		// 	first: 		firstName,
		// 	last: 		lastName,
		// 	phone1: 	phone1,
		// 	phone2: 	phone2,
		// 	address: 	address,
		// 	city: 		city,
		// 	postalCode: postalCode,
		// 	email: 		email,
		// 	website:  	website
		// });
	}

});

$('#sorting_categories').change(function(){
	//Get requested sorting index
	sortBy = $('#sorting_categories').find(':selected').data('id');
	//Sort according to the index of requested element
	
	switch(sortBy){
		case 1:
			people.sort(dynamicSort("first"));
			break;
		case 2:
			people.sort(dynamicSort("last"));
			break;
		case 3:
			people.sort(dynamicSort("phone1"));
			break;
		case 4:
			people.sort(dynamicSort("phone2"));
			break;
		case 5:
			people.sort(dynamicSort("address"));
			break;
		case 6:
			people.sort(dynamicSort("city"));
			break;
		case 7:
			people.sort(dynamicSort("postalCode"));
			break;
		case 8:
			people.sort(dynamicSort("email"));
			break;
		case 9:
			people.sort(dynamicSort("website"));
			break;
	}


	updateMultiSection();
});

$(document).ready(function(){
	//Load some data from the Sheetsu API so we can play around with
	//some data immediately
	$.ajax({
		type: 'GET',
		url: 'https://sheetsu.com/apis/v1.0/87ac5c1d1ea2',
		dataType: 'json',
		success: function(data){
			console.log('We have data!', data);
			for (i in data){
				people.push({
					first: 		data[i].first,
					last: 		data[i].last,
					phone1: 	data[i].phone1,
					phone2: 	data[i].phone2,
					address: 	data[i].address,
					city: 		data[i].city,
					postalCode: data[i].postal,
					email: 		data[i].email,
					website:  	data[i].site
				});
			}
			updateMultiSection();
		}
	});
});


//Mini Address Book
//By: David Dales