/*
	Markedから以下の点を修正する
		ID属性が重複する
			同じ見出し文を見つけたら数字を追加する
		見出し文に半角英数が含まれていない場合はID属性の値が"-"になる
			HTML5では半角スペースを除く全ての文字が使えるため、それに合わせる
		いっそテキストもid属性値と統一してしまえばTOC生成が楽ちんだけどやらない
*/
import marked from 'marked';
const renderer = new marked.Renderer();
const id_cache = {}

renderer.heading = function heading_new(text, level, raw){
	let id = this.options.headerPrefix + raw.replace(/ /g, '_');
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
