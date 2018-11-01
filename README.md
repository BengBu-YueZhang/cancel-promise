## 参考文章

> [How to Cancel Your Promise](https://blog.bloomca.me/2017/12/04/how-to-cancel-your-promise.html)

## 复习generator函数

generator执行返回iterator对象, 需要执行iterator的next方法, 调用遍历器。next方法会返回一个对象, value值为紧跟在yield后面的那个表达式的值(或者return的值), done表示是否遍历完成。每一次遇到新的yield就会暂停函数的执行, 直到再次调用next方法遇到yield的关键字。

### generator与iterator接口

将generator函数的返回值赋予任意一个对象的Symbol.iterator的属性, 这个对象便具有了iterator接口。generator函数返回的iterator对象的Symbol.iterator属性的返回值等于自身。

### next的参数

next的参数, 将会作为上一个yield的返回值。所以在第一个调用next方法时, 传递参数是无效的。因为没有上一个yield。调用第二次的next(), 传入的参数将会是第一个yield的返回值

### for…of

generator函数返回的iterator对象可以直接通过for…of循环, 但是将不包含return的内容(...运算符同理)

### throw

遍历器对象可以调用throw方法, 抛出错误。iterator.throw()可以被函数体内的try...catch捕获。generator函数没有trycathc, 内部抛出的error会被外部的trycatch捕获。**如果需要内部捕获错误, 必须执行一次next方法**。执行throw()时, 会同时执行一次next方法。**generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即JavaScript引擎认为这个Generator已经运行结束了。**

### return

return, 会返回return后的内容, 并且将done设置为true。如果generator函数内部有try…finally语句。return方法会推迟到finally内的代码执行完成后执行, 即便她已经调用了return方法

### yield*

> yield*作用是在generator函数内部调用另一个geneartor函数。换句话说就是循环一个拥有iterator接口的对象。

如果yield*, yield*前面的变量会接受return的值，并且会return之后的yield执行之后暂停执行

```js

function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

```js

// 使用yield*扁平数组

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
```