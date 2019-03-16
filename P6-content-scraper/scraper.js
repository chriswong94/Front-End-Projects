
/*=========================*/
/*  Meng Wang              */
/*  Treehouse Techdegree   */
/*  Project 6              */
/*  Content Scraper        */
/*=========================*/

const fs        = require('fs-extra');
const rp        = require('request-promise');
const cheerio   = require('cheerio');
const timestamp = require('time-stamp');
const Json2csvParser = require('json2csv').Parser;
const originUrl = 'http://shirts4mike.com';
const targetUrl = 'http://shirts4mike.com/shirts.php';
const dir       = 'data';
const date		= timestamp.utc();
const file      = 'data/' + date + '.csv';
const fields    = ['title', 'price', 'url', 'imgUrl', 'time'];



fs.emptyDirSync(dir, err => {
    if (err) return console.error(err);
});


rp(targetUrl)
    .then(function(html) {
    let urls = [];
	    const $ = cheerio.load(html);
	    for (let i = 0; i <= 7; i++) {
	        urls.push($('ul.products > li > a')[i].attribs.href);
	    }
	    return Promise.all(
		    urls.map(url => 
				parseWebsite('http://shirts4mike.com/' + url))
		    )
    })
	.then(function(data){
		const json2csvParser = new Json2csvParser({ fields });
		const csv            = json2csvParser.parse(data);
		return csv;
	})
	.then(function(csv){
		fs.outputFileSync(file, csv);
	})
    .catch(function(err) {
      //handle error
      	if(err){
      		writeErrorLog(err.message, err.statusCode);
      		// console.log('404 error. Cannot connect to http://shirts4mike.com');
      	}
    });



function parseWebsite(url) {

	return rp(url)
	    .then(function(html) {

	    	const $ = cheerio.load(html);

	        return	{
	        			title :  $('div.shirt-details > h1').clone().children().remove().end().text() ,
	        			price :  $('span.price').text() ,
	        			url   :  url,
	        			imgUrl:  originUrl + '/' + $('div.shirt-picture > span > img').attr('src'),
	        			time  :  timestamp.utc('HH:mm:ss')
	        		}

	    })
}
    

function writeErrorLog(friendlyError, code) {
    fs.appendFile('error log/scraper-error.log',`${date}\t${friendlyError}\tStatus code: ${code}\n`, function (err) {
        if (err) throw err;
    });
}
//final version