class Button
{
 set onclick(txt) {
        var _this = this;
        this.f = new Function(txt);
        this.htmlElement.onclick = function () {_this.f();};
    }
}
