/*
	Markedから以下の点を修正する
		ID属性が重複する
		H1-6タグのテキストに半角英数が含まれていない場合はID属性の値が"-"になる
*/
import marked from 'marked';
const renderer = new marked.Renderer();
const id_cache = {}

renderer.heading = function heading_new(text, level, raw){
	let id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
	if(id_cache[id]){
		id_cache[id]++;
		id += id_cache[id];
	}else{
		id_cache[id] = 1
	}
	return `<h${level} id="${id}">${text}</h${level}>\n`;
}

marked.setOptions({renderer});

export default　marked;
