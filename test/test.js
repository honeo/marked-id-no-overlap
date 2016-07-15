console.log('marked-id-no-overlap: test');

require("babel-register")({
	presets: ['es2015', 'es2016', 'stage-0']
});

// marked
const marked = require('../').default;
const fs = require('fs');
marked.setOptions({
	breaks: true,
});

const md_string = fs.readFileSync('./test/test.md', 'utf8');

marked(md_string, (err, htmlstring)=>{
	if(err){
		throw err;
	}
	// jsdom + var
	const JSDOM = require('jsdom');
	global.document = JSDOM.jsdom(htmlstring);
	global.head = document.head;
	global.window = document.defaultView;

	const nodelist = document.querySelectorAll('*[id]');
	if( nodelist.length===7 ){
		console.log('success');
	}else{
		throw new Error(`failed: ${nodelist.length}`);
	}
});
