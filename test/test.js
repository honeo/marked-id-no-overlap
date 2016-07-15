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
	const memo = {}
	for(node of Array.from(nodelist)){
		const value = node.id;
		if( memo[value] ){
			throw new Error(`failed: ${value}`);
		}else{
			memo[value] = true;
		}
	}
	console.log('success');
});
