console.log('marked-id-no-overlap: test');

require("babel-register")({
	presets: ['es2015', 'es2016', 'stage-0'],
	ignore: false
});

// Modules
const hasSameContents = require('has-same-contents').default;
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
	const answers = [
		'marked-id-no-overlap_test',
		'hoge',
		'fuga',
		'PIYO',
		'piyo',
		'piyo2',
		'S_p_A_c_E',
		'ほげほげ',
		'ほげ',
		'ほげ2',
		'ふが'
	]
	const results = Array.from(nodelist).map( (node, index)=>{
		console.log(index, answers[index], node.id, node.textContent)
		return node.id;
	});

	if( hasSameContents(answers, results) ){
		console.log('success');
	}else{
		throw new Error(`failed`);
	}
});
