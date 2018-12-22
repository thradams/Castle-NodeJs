

class ToggleSwitch {

    set Value(s) {
        this.htmlElement.children[0].checked = (s == "true");
    }

    get Value() {
        return this.htmlElement.children[0].checked;
    }


    set onchange(f) {

        var func = eval("(function (b) {" + f + "})");
        var _this = this;
        this.htmlElement.children[0].onchange = function (ev) {
            func.call(_this, _this.Value);
        };
    }
}
