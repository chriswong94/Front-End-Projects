// Project 2 - FSJS Techdegree
// Meng Wang
// Project theme: Pagination



const originalList   = $('ul.student-list > li').find().prevObject;  
const $h1            = $('<h1>No results have been found </h1>');

$('div.page').append('<div class="pagination"><ul></ul></div>'); //create pagination html container
appendPageLinks(originalList); // add bottom links to the page
appendSearchButton();          // add a search component on top of the page. 



// in this function you define how many bottom links should have and add them to the page
//	 trigger the showPage function when click page links
function appendPageLinks(studentList) {

    const studentNumber = studentList.length;
    const maxPageNumber = Math.ceil(studentNumber / 10);
    const $ul           = $('div.pagination > ul');
	
    // unobtrusive JavaScript design pattern. 
    //	 clear all the old html data and dynamiclly add page links based on student number
    $ul.empty();
    $h1.remove();
	
	for (i=1; i <= maxPageNumber; i++) {
		const $listLink = $('<li><a href="#">' + i + '</a></li>');
		$ul.append($listLink);
	}

	showPage(studentList, 1);
    
    // trigger the showPage function when click page links
	$('div.pagination > ul > li > a').on('click', function() {
		$("a.active").removeClass("active");
		let pageNumber = $('div.pagination > ul > li > a').index(this) + 1 ;
		showPage(studentList, pageNumber);
	});
}


// render the student data on the page after clicking page's bottom link
//	 hide all the data first, then show the student list for this specific page 
function showPage(studentList, pageNumber) {

	studentList.hide();
	let startNumber = (pageNumber - 1) * 10 + 1;
	let endNumber;

	if(studentList.length >= pageNumber * 10 ) {
		endNumber = pageNumber * 10;
	}
	else {
		endNumber = studentList.length;
	}

	for (i = startNumber; i <= endNumber; i++) {
		studentList[i-1].style.display = 'block';
	} 
	
	$('div.pagination > ul > li:nth-child(' + pageNumber + ') > a').addClass('active');
}


// this function could add a search component on the page
// 	trigger the showSearchResult function after typed input info and clicked the search button
function appendSearchButton() {

    // unobtrusive JavaScript design pattern. 
    // 	dynamiclly add search button
    const $div    = $('<div class="student-search"></div>');
    const $input  = $('<input placeholder="Search for students...">');
    const $button = $('<button>Search</button>');

    $('div.page-header').append($div);
    $div.append($input);
    $div.append($button);

	// trigger the showResult function after typed input info and clicked the search button
	$button.on('click', function() {
		let filterValue = $input.val();
		showSearchResult(filterValue);
	});

	$input.on('keyup', function() {
		let filterValue = $input.val();
		showSearchResult(filterValue);
	});
}


// based on the input info, show student lists which match the filter value on the page
function showSearchResult(filterValue) {

	// hide all lists first
	$('li.student-item').hide();

	if(filterValue === '') {
		appendPageLinks(originalList);
	}
	else {
		// find all lists that mactch the filter value, then make them visible
		let $h3      = $('h3').find().prevObject;
		let number   = $h3.length; 

		for(i = 0; i <= number - 1; i++) {
			if($h3[i].innerHTML.indexOf(filterValue) !== -1) {
				let y         = i + 1;
				let $listItem = $('li.student-item:nth-child('+ y + ')');
		        $listItem.show();
			}
		}

		// the visible data now is the new desired student list. paginate and show
		let $newlist = $('li.student-item:visible').find().prevObject;
		appendPageLinks($newlist);
		
		if($newlist.length === 0) {
			$h1.insertAfter($('div.page-header'));
		}
	}

}

