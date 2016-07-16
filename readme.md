# marked-id-no-overlap
[honeo/marked-id-no-overlap](https://github.com/honeo/marked-id-no-overlap)  
[marked-id-no-overlap](https://www.npmjs.com/package/marked-id-no-overlap)

## なにこれ
[marked](https://github.com/chjj/marked)のRendererを弄ってid属性値を重複しないようにしたやつ。

## example
```md
# HOGE
## hoge
## hoge
## ほげ
# 1 2 3
```
```html
<h1 id="HOGE">HOGE</h1>
	<h2 id="hoge">hoge</h2>
	<h2 id="hoge2">hoge</h2>
	<h2 id="ほげ">ほげ</h2>
<h1 id="1_2_3">1 2 3</h1>
```

## 使い方
```sh
$ npm i -S marked-id-no-overlap
```
```js
import marked from 'marked-id-no-overlap';
```
